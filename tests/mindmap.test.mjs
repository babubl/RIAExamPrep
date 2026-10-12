import test from 'node:test';
import assert from 'node:assert/strict';
import { splitPoint, splitHeading, chapterGroups } from '../js/mindmap.js';
import { BANK } from '../js/bank.js';

test('splitPoint uses the text before a colon as the label', () => {
  assert.deepEqual(splitPoint('Sec 54EC: LT land or building → bonds within 6 months.'), { label: 'Sec 54EC', detail: 'LT land or building → bonds within 6 months.' });
});
test('splitHeading separates the workbook reference', () => {
  assert.deepEqual(splitHeading('Exemptions (8.5.3)'), { title: 'Exemptions', ref: '8.5.3' });
});
test('every chapter of both papers yields a map with labelled points', () => {
  for (const ex of ['xa', 'xb']) for (const c of BANK[ex].chapters) {
    const g = chapterGroups(c);
    assert.ok(g.length >= 2, c.id);
    for (const grp of g) for (const l of grp.leaves) assert.ok(l.label && l.label.length <= 90, `${c.id}: ${l.label}`);
  }
});
