// Pure logic: exam patterns, mock assembly, scoring and Excel-style TVM maths.
// No DOM access here, so everything can be unit-tested with `node --test`.

export const PATTERNS = {
  xa: {
    id: 'xa',
    code: 'NISM Series X-A',
    name: 'Investment Adviser (Level 1)',
    short: 'X-A · Level 1',
    minutes: 180,
    totalMarks: 150,
    passPct: 60,
    negative: 0.25,
    mcq: 90,
    caseSets: [
      { label: 'Caselets — 1 mark each', count: 6, w: 1 },
      { label: 'Caselets — 2 marks each', count: 3, w: 2 },
    ],
    modules: [
      { id: 1, name: 'Basics of Financial Planning', weight: 37, ch: [1, 2, 3, 4] },
      { id: 2, name: 'Basics of Investment Products', weight: 10, ch: [5, 6] },
      { id: 3, name: 'Investment Products — Equity, Debt, Alternatives', weight: 30, ch: [7, 8, 9, 10] },
      { id: 4, name: 'Portfolio Theory & Performance', weight: 23, ch: [11, 12, 13] },
      { id: 5, name: 'Financial Planning Areas & Products', weight: 20, ch: [14, 15, 16] },
      { id: 6, name: 'Regulation, Ethics & Grievances', weight: 30, ch: [17, 18, 19, 20] },
    ],
    workbook: 'NISM X-A workbook, version September 2026',
  },
  xb: {
    id: 'xb',
    code: 'NISM Series X-B',
    name: 'Investment Adviser (Level 2)',
    short: 'X-B · Level 2',
    minutes: 180,
    totalMarks: 150,
    passPct: 60,
    negative: 0.25,
    mcq: 90,
    caseSets: [{ label: 'Case studies — 2 marks each', count: 6, w: 2 }],
    modules: [
      { id: 7, name: 'Insurance Planning', weight: 25, ch: [1, 2, 3] },
      { id: 8, name: 'Retirement Planning', weight: 30, ch: [4, 5, 6] },
      { id: 9, name: 'Taxation', weight: 20, ch: [7, 8, 9, 10, 11, 12, 13] },
      { id: 10, name: 'Estate Planning', weight: 20, ch: [14, 15] },
      { id: 11, name: 'Behavioural Finance', weight: 10, ch: [16, 17] },
      { id: 12, name: 'Comprehensive Investment Advice', weight: 45, ch: [18, 19, 20] },
    ],
    workbook: 'NISM X-B workbook, version December 2025 (tax: Finance Act 2025)',
  },
};

// Split the MCQ count across modules in proportion to their weight (largest-remainder rounding).
export function mcqPlan(pattern) {
  const total = pattern.modules.reduce((s, m) => s + m.weight, 0);
  const raw = pattern.modules.map((m) => ({ id: m.id, exact: (pattern.mcq * m.weight) / total }));
  raw.forEach((r) => { r.n = Math.floor(r.exact); r.rem = r.exact - r.n; });
  let left = pattern.mcq - raw.reduce((s, r) => s + r.n, 0);
  [...raw].sort((a, b) => b.rem - a.rem).forEach((r) => { if (left > 0) { r.n++; left--; } });
  return Object.fromEntries(raw.map((r) => [r.id, r.n]));
}

// Small deterministic PRNG so a mock can be rebuilt from its seed.
export function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle(arr, rand) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Prefer items not seen before; then random.
function pick(pool, n, rand, seen) {
  const fresh = shuffle(pool.filter((x) => !seen.has(x.id)), rand);
  const old = shuffle(pool.filter((x) => seen.has(x.id)), rand);
  return [...fresh, ...old].slice(0, n);
}

/**
 * Build a mock exam.
 * bank: { chapters: [{ id, ch, module, title, qs:[{id,...}] }], cases: [{ id, w, qs }] }
 * returns { seed, exam, items: [{ kind:'mcq'|'case', qid, caseId?, marks, module, ch }] , cases: [caseIds] }
 */
export function buildMock(pattern, bank, { seed = Date.now(), seen = new Set() } = {}) {
  const rand = rng(seed);
  const plan = mcqPlan(pattern);
  const items = [];
  for (const m of pattern.modules) {
    const pool = bank.chapters.filter((c) => c.module === m.id).flatMap((c) => c.qs.map((q) => ({ ...q, ch: c.ch, module: c.module })));
    const chosen = pick(pool, plan[m.id], rand, seen);
    chosen.forEach((q) => items.push({ kind: 'mcq', qid: q.id, marks: 1, module: m.id, ch: q.ch }));
  }
  // Interleave modules like the real paper rather than grouping them.
  const mcqs = shuffle(items, rand);
  const caseIds = [];
  const caseItems = [];
  for (const set of pattern.caseSets) {
    const pool = bank.cases.filter((c) => c.w === set.w && !caseIds.includes(c.id));
    const chosen = pick(pool, set.count, rand, seen);
    for (const c of chosen) {
      caseIds.push(c.id);
      c.qs.forEach((q, i) => caseItems.push({ kind: 'case', caseId: c.id, qid: `${c.id}-${i}`, idx: i, marks: set.w, module: moduleForCase(pattern, c), ch: (c.ch || [])[0] }));
    }
  }
  return { seed, exam: pattern.id, items: [...mcqs, ...caseItems], cases: caseIds };
}

export function moduleForCase(pattern, c) {
  const ch = (c.ch || [])[0];
  const m = pattern.modules.find((mm) => mm.ch.includes(ch));
  return m ? m.id : pattern.modules[pattern.modules.length - 1].id;
}

/**
 * Score a mock.
 * answers: { [index]: optionIndex }
 * key: (item) => correct option index
 */
export function scoreMock(pattern, items, answers, key) {
  let score = 0; let correct = 0; let wrong = 0; let skipped = 0; let max = 0;
  const byModule = {};
  items.forEach((it, i) => {
    max += it.marks;
    const m = (byModule[it.module] ||= { attempted: 0, correct: 0, wrong: 0, marks: 0, max: 0, n: 0 });
    m.max += it.marks; m.n++;
    const a = answers[i];
    if (a === undefined || a === null) { skipped++; return; }
    m.attempted++;
    if (a === key(it)) { score += it.marks; correct++; m.correct++; m.marks += it.marks; }
    else { const pen = it.marks * pattern.negative; score -= pen; wrong++; m.wrong++; m.marks -= pen; }
  });
  score = Math.round(score * 100) / 100;
  const pct = max ? (score / max) * 100 : 0;
  return { score, max, pct, pass: pct >= pattern.passPct, correct, wrong, skipped, byModule };
}

// ---------- Excel-compatible TVM (same sign convention: cash paid out is negative) ----------
export function FV(rate, nper, pmt = 0, pv = 0, type = 0) {
  if (rate === 0) return -(pv + pmt * nper);
  const f = (1 + rate) ** nper;
  return -(pv * f + pmt * (1 + rate * type) * ((f - 1) / rate));
}
export function PV(rate, nper, pmt = 0, fv = 0, type = 0) {
  if (rate === 0) return -(fv + pmt * nper);
  const f = (1 + rate) ** nper;
  return -(fv + pmt * (1 + rate * type) * ((f - 1) / rate)) / f;
}
export function PMT(rate, nper, pv = 0, fv = 0, type = 0) {
  if (rate === 0) return -(pv + fv) / nper;
  const f = (1 + rate) ** nper;
  return -(rate * (pv * f + fv)) / ((1 + rate * type) * (f - 1));
}
export function NPER(rate, pmt, pv = 0, fv = 0, type = 0) {
  if (rate === 0) return -(pv + fv) / pmt;
  const a = pmt * (1 + rate * type) - fv * rate;
  const b = pv * rate + pmt * (1 + rate * type);
  return Math.log(a / b) / Math.log(1 + rate);
}
export function RATE(nper, pmt, pv = 0, fv = 0, type = 0, guess = 0.1) {
  // Newton–Raphson with a bisection fallback.
  const f = (r) => (Math.abs(r) < 1e-12 ? pv + pmt * nper + fv : pv * (1 + r) ** nper + pmt * (1 + r * type) * (((1 + r) ** nper - 1) / r) + fv);
  let r = guess;
  for (let i = 0; i < 100; i++) {
    const y = f(r);
    const d = (f(r + 1e-7) - y) / 1e-7;
    if (!isFinite(d) || d === 0) break;
    const nr = r - y / d;
    if (!isFinite(nr)) break;
    if (Math.abs(nr - r) < 1e-12) return nr;
    r = nr;
  }
  let lo = -0.999; let hi = 10;
  if (Math.sign(f(lo)) === Math.sign(f(hi))) return NaN;
  for (let i = 0; i < 300; i++) {
    const mid = (lo + hi) / 2;
    if (Math.sign(f(mid)) === Math.sign(f(lo))) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}
export const realRate = (ret, infl) => (1 + ret) / (1 + infl) - 1;
export const effAnnual = (nominal, m) => (1 + nominal / m) ** m - 1;
export const cagr = (begin, end, years) => (end / begin) ** (1 / years) - 1;

export function fmtINR(n, dp = 0) {
  if (!isFinite(n)) return '—';
  const neg = n < 0; const v = Math.abs(n);
  const s = v.toLocaleString('en-IN', { minimumFractionDigits: dp, maximumFractionDigits: dp });
  return (neg ? '−' : '') + '₹' + s;
}

// Exam-day time budget: seconds per mark so candidates can pace themselves.
export const paceSeconds = (pattern) => Math.round((pattern.minutes * 60) / pattern.totalMarks);

// Display order for options. Authoring tends to put the right answer in the same slot,
// so options are shuffled per question (stable for a given id). Options whose meaning
// depends on position or on other options ("all of the above", statement combos) stay put.
const FIXED = /\b(all|none) of (the )?(above|these)\b|\bboth\b|\bneither\b|\bonly (i|ii|iii|iv)\b|^\s*(i|ii|iii|iv)\b|\b(a|b|c) and (b|c|d)\b|\bany of the above\b|statement/i;
export function optionOrder(qid, q) {
  const n = q.o.length;
  const base = Array.from({ length: n }, (_, i) => i);
  if (q.t === 'multi' || q.fixed || q.o.some((o) => FIXED.test(o))) return base;
  let h = 2166136261;
  for (const ch of String(qid)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return shuffle(base, rng(h >>> 0));
}
