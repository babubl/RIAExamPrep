import test from 'node:test';
import assert from 'node:assert/strict';
import { BANK, lookup } from '../js/bank.js';
import { PATTERNS, mcqPlan, buildMock, scoreMock, optionOrder } from '../js/engine.js';

for (const ex of ['xa', 'xb']) {
  const p = PATTERNS[ex];
  test(`${ex}: 20 chapters, each mapped to a valid module with notes, keys and questions`, () => {
    assert.equal(BANK[ex].chapters.length, 20);
    const chs = BANK[ex].chapters.map((c) => c.ch);
    assert.deepEqual(chs, Array.from({ length: 20 }, (_, i) => i + 1));
    for (const c of BANK[ex].chapters) {
      const m = p.modules.find((mm) => mm.id === c.module);
      assert.ok(m, `${c.id} module ${c.module}`);
      assert.ok(m.ch.includes(c.ch), `${c.id} is listed under module ${m.id}`);
      assert.ok(c.sections.length >= 1 && c.sections.every((s) => s.h && s.pts.length), `${c.id} notes`);
      assert.ok((c.keys || []).length >= 2, `${c.id} keys`);
      assert.ok(c.qs.length >= 10, `${c.id} has ${c.qs.length} questions`);
    }
  });

  test(`${ex}: every question has 4 distinct options, a valid answer, an explanation and a ref`, () => {
    const ids = new Set();
    for (const c of BANK[ex].chapters) for (const q of c.qs) {
      assert.equal(q.o.length, 4, q.q);
      assert.equal(new Set(q.o).size, 4, `duplicate options: ${q.q}`);
      assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a < 4, q.q);
      assert.ok(q.e && q.e.length > 5, `explanation: ${q.q}`);
      assert.ok(q.ref, `ref: ${q.q}`);
      assert.ok(!q.t || ['multi', 'calc', 'trap'].includes(q.t), q.q);
      assert.ok(!ids.has(q.id)); ids.add(q.id);
      assert.ok(!ids.has(q.q + '|' + c.id)); ids.add(q.q + '|' + c.id);
    }
  });

  test(`${ex}: cases have 5 well-formed questions and enough of each mark type for a mock`, () => {
    const caseIds = new Set();
    for (const c of BANK[ex].cases) {
      assert.ok(!caseIds.has(c.id)); caseIds.add(c.id);
      assert.ok(c.text.length > 80, c.id);
      assert.equal(c.qs.length, 5, c.id);
      for (const q of c.qs) { assert.equal(q.o.length, 4, q.q); assert.ok(q.a >= 0 && q.a < 4); assert.ok(q.e); }
    }
    for (const set of p.caseSets) assert.ok(BANK[ex].cases.filter((c) => c.w === set.w).length >= set.count, `${ex} needs ${set.count} cases of ${set.w} marks`);
  });

  test(`${ex}: displayed answer positions are spread out (no positional giveaway)`, () => {
    const counts = [0, 0, 0, 0];
    const tally = (id, q) => { const ord = optionOrder(id, q); assert.deepEqual([...ord].sort(), [0, 1, 2, 3]); counts[ord.indexOf(q.a)]++; };
    for (const c of BANK[ex].chapters) for (const q of c.qs) tally(q.id, q);
    for (const c of BANK[ex].cases) c.qs.forEach((q, i) => tally(`${c.id}-${i}`, q));
    const total = counts.reduce((a, b) => a + b, 0);
    assert.ok(Math.max(...counts) / total < 0.36 && Math.min(...counts) / total > 0.14, `answer distribution ${counts}`);
  });

  test(`${ex}: mock follows the official pattern (90 MCQs + cases = 150 marks)`, () => {
    const plan = mcqPlan(p);
    assert.equal(Object.values(plan).reduce((a, b) => a + b, 0), p.mcq);
    assert.equal(p.modules.reduce((a, m) => a + m.weight, 0), p.totalMarks);
    const mock = buildMock(p, BANK[ex], { seed: 42 });
    const mcq = mock.items.filter((i) => i.kind === 'mcq');
    assert.equal(mcq.length, 90);
    assert.equal(new Set(mcq.map((i) => i.qid)).size, 90, 'no duplicate questions');
    const marks = mock.items.reduce((a, i) => a + i.marks, 0);
    assert.equal(marks, p.totalMarks);
    for (const m of p.modules) assert.equal(mcq.filter((i) => i.module === m.id).length, plan[m.id]);
    for (const it of mock.items) assert.ok(lookup(it.qid), `lookup ${it.qid}`);
    // deterministic by seed
    assert.deepEqual(buildMock(p, BANK[ex], { seed: 42 }).items.map((i) => i.qid), mock.items.map((i) => i.qid));
  });

  test(`${ex}: scoring applies 25% negative marking`, () => {
    const mock = buildMock(p, BANK[ex], { seed: 7 });
    const key = (it) => lookup(it.qid).q.a;
    const all = Object.fromEntries(mock.items.map((it, i) => [i, key(it)]));
    assert.equal(scoreMock(p, mock.items, all, key).score, 150);
    const none = scoreMock(p, mock.items, {}, key);
    assert.equal(none.score, 0); assert.equal(none.skipped, mock.items.length);
    const wrong = Object.fromEntries(mock.items.map((it, i) => [i, (key(it) + 1) % 4]));
    assert.equal(scoreMock(p, mock.items, wrong, key).score, -37.5);
    const r = scoreMock(p, mock.items, { 0: key(mock.items[0]), 1: (key(mock.items[1]) + 1) % 4 }, key);
    assert.equal(r.score, 1 - 0.25);
  });
}

test('X-A pattern: 6 one-mark caselets and 3 two-mark caselets; X-B: 6 two-mark cases', () => {
  assert.deepEqual(PATTERNS.xa.caseSets.map((c) => [c.count, c.w]), [[6, 1], [3, 2]]);
  assert.deepEqual(PATTERNS.xb.caseSets.map((c) => [c.count, c.w]), [[6, 2]]);
  assert.equal(PATTERNS.xa.passPct, 60); assert.equal(PATTERNS.xb.negative, 0.25);
});
