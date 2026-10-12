import { PATTERNS, mcqPlan, buildMock, scoreMock, shuffle, rng, optionOrder, FV, PV, PMT, NPER, RATE, realRate, effAnnual, cagr, fmtINR, paceSeconds } from './engine.js';
import { BANK, lookup, chapter, caseById, allQuestions } from './bank.js';
import { S, flush } from './store.js';

const $ = (s, el = document) => el.querySelector(s);
const main = $('#main');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const L = 'ABCD';
// Render options in display order; data-k always carries the ORIGINAL option index.
const shown = (qid, q) => optionOrder(qid, q);
const letterOf = (qid, q, k) => L[shown(qid, q).indexOf(k)];
const FRAMED = (() => { try { return window.self !== window.top; } catch { return true; } })();
const refTxt = (r) => (r == null || r === '' ? '' : /^Ch/.test(String(r)) ? String(r) : `§${r}`);
const TYPE = { multi: 'Statements', calc: 'Numerical', trap: 'Tweak / trap' };

// ---------------- theme & nav ----------------
function applyTheme(t) { if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; }
applyTheme(S.get().theme);
$('#themeBtn').addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const t = dark ? 'light' : 'dark'; applyTheme(t); S.theme(t);
});
$('#menuBtn').addEventListener('click', (e) => { const n = $('#nav'); const o = n.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); });
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 2200); }

// ---------------- stats helpers ----------------
function qStats(ids) {
  let seen = 0; let right = 0; let attempts = 0; let correct = 0;
  for (const id of ids) { const s = S.stat(id); if (!s) continue; seen++; attempts += s.n; correct += s.c; if (s.last) right++; }
  return { total: ids.length, seen, right, acc: attempts ? correct / attempts : null };
}
const chIds = (c) => c.qs.map((q) => q.id);
function moduleStats(ex, mid) { return qStats(BANK[ex].chapters.filter((c) => c.module === mid).flatMap(chIds)); }
function examStats(ex) { return qStats(allQuestions(ex).map((x) => x.q.id)); }
function readiness(ex) {
  // Weighted by module weight; unseen questions count as 0.
  const p = PATTERNS[ex]; let num = 0; let den = 0;
  for (const m of p.modules) { const s = moduleStats(ex, m.id); const cov = s.total ? s.right / s.total : 0; num += cov * m.weight; den += m.weight; }
  return den ? num / den : 0;
}
const pct = (x) => (x == null ? '—' : `${Math.round(x * 100)}%`);
const barCls = (x) => (x == null ? '' : x >= 0.7 ? 'ok' : x < 0.5 ? 'bad' : '');
const pbar = (x) => `<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(x * 100)}"><i style="width:${Math.round(x * 100)}%"></i></div>`;
const bar = (x) => `<div class="bar ${barCls(x)}" role="img" aria-label="${pct(x)}"><i style="width:${x == null ? 0 : Math.round(x * 100)}%"></i></div>`;

// ---------------- router ----------------
let cleanup = null;
function route() {
  if (cleanup) { cleanup(); cleanup = null; }
  const h = (location.hash.replace(/^#/, '') || '/').split('#')[0];
  const parts = h.split('?')[0].split('/').filter(Boolean);
  $('#nav').classList.remove('open');
  document.querySelectorAll('#nav a').forEach((a) => {
    const href = a.getAttribute('href').slice(1);
    const on = href === '/' ? parts.length === 0 : h.startsWith(href);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  let html;
  try {
    if (parts.length === 0) html = viewHome();
    else if (parts[0] === 'about') html = viewAbout();
    else if (parts[0] === 'calc') html = viewCalc();
    else if (parts[0] === 'x' && PATTERNS[parts[1]]) {
      const ex = parts[1]; const sub = parts[2];
      if (!sub) html = viewHub(ex);
      else if (sub === 'ch') html = viewNotes(ex, parts[3]);
      else if (sub === 'practice') html = viewPractice(ex, parts[3] || 'random');
      else if (sub === 'cards') html = viewCards(ex, parts[3] || 'all');
      else if (sub === 'cases') html = viewCases(ex);
      else if (sub === 'case') html = viewCase(ex, parts[3]);
      else if (sub === 'formulas') html = viewFormulas(ex);
      else if (sub === 'mock' && parts[3] === 'run') html = viewMockRun(ex);
      else if (sub === 'mock' && parts[3] === 'result') html = viewResult(ex, Number(parts[4] || 0));
      else if (sub === 'mock') html = viewMockLobby(ex);
    }
  } catch (err) { console.error(err); html = `<section class="band"><div class="wrap"><h2>Something went wrong</h2><p class="muted">${esc(err.message)}</p><p><a class="btn" href="#/">Home</a></p></div></section>`; }
  if (html == null) html = `<section class="band"><div class="wrap"><h2>Page not found</h2><p><a class="btn" href="#/">Go home</a></p></div></section>`;
  main.innerHTML = `<div class="view">${html}</div>`;
  if (afterRender) { const f = afterRender; afterRender = null; f(); }
  if (!keepScroll) window.scrollTo(0, 0);
  keepScroll = false; fresh = false;
  const titleEl = main.querySelector('h1,h2');
  document.title = titleEl ? `${titleEl.textContent.trim()} · IA Exam Prep` : 'IA Exam Prep';
}
let afterRender = null; let keepScroll = false;
let fresh = true;
window.addEventListener('hashchange', () => { fresh = true; route(); });
window.addEventListener('beforeunload', flush);

// Global click delegation: elements with data-act
main.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const fn = ACTIONS[el.dataset.act];
  if (fn) { e.preventDefault(); fn(el, e); }
});
const ACTIONS = {};

// ---------------- Home ----------------
function viewHome() {
  const card = (ex) => {
    const p = PATTERNS[ex]; const s = examStats(ex); const r = readiness(ex);
    const last = S.get().mocks.find((m) => m.exam === ex);
    const active = S.get().active && S.get().active.exam === ex;
    return `<a class="card examcard" href="#/x/${ex}">
      <span class="spread"><span class="kicker">${esc(p.code)}</span>${active ? '<span class="pill ok">Mock in progress</span>' : ''}</span>
      <span class="code">${esc(p.name)}</span>
      <span class="small muted">${p.modules.length} modules · 20 chapters · ${s.total} questions · ${BANK[ex].cases.length} case studies</span>
      <span class="g3" style="gap:10px">
        <span class="stat"><span class="l">Attempted</span><span class="v">${s.seen}</span></span>
        <span class="stat"><span class="l">Accuracy</span><span class="v">${pct(s.acc)}</span></span>
        <span class="stat"><span class="l">Last mock</span><span class="v">${last ? `${Math.round(last.pct)}%` : '—'}</span></span>
      </span>
      <span>${bar(r)}<span class="tiny">Readiness ${pct(r)} · weighted by module marks</span></span>
      <span class="btn sm" style="align-self:flex-start">Open ${esc(p.short)}</span>
    </a>`;
  };
  const totalQ = allQuestions('xa').length + allQuestions('xb').length;
  const totalCases = BANK.xa.cases.length + BANK.xb.cases.length;
  const pat = (ex) => { const p = PATTERNS[ex]; return `<tr><th scope="row">${esc(p.short)}</th><td class="r">${p.mcq}</td><td>${p.caseSets.map((c) => `${c.count} × 5 Qs × ${c.w}`).join(' + ')}</td><td class="r">${p.totalMarks}</td><td class="r">${p.minutes}</td><td class="r">${p.passPct}%</td><td class="r">−${p.negative * 100}%</td></tr>`; };
  return `
  <section class="hero"><div class="wrap grid">
    <div>
      <span class="kicker">NISM Investment Adviser certification · Level 1 &amp; Level 2</span>
      <h1 style="margin-top:8px">Practise for X&#8209;A and X&#8209;B the way the exam is set.</h1>
      <p class="lead">Chapter notes, drills on the question types that cost the most marks, and full 150-mark mocks with a 3-hour timer and negative marking. Free, no sign-up.</p>
      <div class="row"><a class="btn" href="#/x/xa">Start X-A · Level 1</a><a class="btn ghost" href="#/x/xb">Start X-B · Level 2</a></div>
      <div class="facts"><div><b>${totalQ}</b><span>practice questions</span></div><div><b>${totalCases}</b><span>case studies</span></div><div><b>40</b><span>chapter notes</span></div><div><b>150</b><span>marks per mock</span></div></div>
    </div>
    <div class="card flat">
      <span class="kicker">Where candidates lose marks</span>
      <ul class="list" style="margin-top:6px">
        <li><b>Statement questions.</b> Judge Statement I and II separately before reading the options. <span class="row" style="gap:12px;margin-top:2px"><a href="#/x/xa/practice/multi">X-A drill</a><a href="#/x/xb/practice/multi">X-B drill</a></span></li>
        <li><b>Tweaked wording.</b> One word such as NOT, only or always changes the answer. <span class="row" style="gap:12px;margin-top:2px"><a href="#/x/xa/practice/trap">X-A drill</a><a href="#/x/xb/practice/trap">X-B drill</a></span></li>
        <li><b>Numericals.</b> Set them up as Excel functions; the test centre gives you a spreadsheet. <span class="row" style="gap:12px;margin-top:2px"><a href="#/x/xa/practice/calc">X-A drill</a><a href="#/x/xb/practice/calc">X-B drill</a><a href="#/calc">Calculator</a></span></li>
        <li><b>Guessing.</b> A wrong answer costs 25% of its marks. Skip unless you can rule out two options.</li>
      </ul>
    </div>
  </div></section>
  <section class="band tight"><div class="wrap">
    <div class="spread" style="margin-bottom:14px"><h2>Choose your paper</h2><a class="small" href="#/about">Full exam pattern</a></div>
    <div class="g2">${card('xa')}${card('xb')}</div>
    <div class="scroll" style="margin-top:16px"><table class="tbl"><thead><tr><th>Paper</th><th class="r">MCQs</th><th>Case studies</th><th class="r">Marks</th><th class="r">Minutes</th><th class="r">Pass</th><th class="r">Wrong answer</th></tr></thead><tbody>${pat('xa')}${pat('xb')}</tbody></table></div>
  </div></section>
  <section class="band tight" style="padding-bottom:48px"><div class="wrap">
    <h2 style="margin-bottom:14px">A study plan that works</h2>
    <ol class="steps4">
      <li><b>Read the chapter notes</b><p class="small muted">Short points with the numbers you must remember, each tied to a workbook section.</p></li>
      <li><b>Practise by chapter</b><p class="small muted">Instant feedback with the reasoning and the section to revisit.</p></li>
      <li><b>Fix weak spots</b><p class="small muted">Wrong answers collect in “My mistakes”. Module accuracy shows where marks leak.</p></li>
      <li><b>Sit full mocks</b><p class="small muted">Exact pattern, timer, question palette and negative marking. Aim for 70%+ before exam day.</p></li>
    </ol>
  </div></section>`;
}

// ---------------- Exam hub ----------------
function viewHub(ex) {
  const p = PATTERNS[ex]; const plan = mcqPlan(p);
  const all = allQuestions(ex);
  const count = (t) => all.filter((x) => x.q.t === t).length;
  const wrongN = all.filter((x) => { const s = S.stat(x.q.id); return s && !s.last; }).length;
  const mocks = S.get().mocks.filter((m) => m.exam === ex);
  const active = S.get().active && S.get().active.exam === ex ? S.get().active : null;
  const s = examStats(ex);
  const modules = p.modules.map((m) => {
    const ms = moduleStats(ex, m.id);
    const rows = BANK[ex].chapters.filter((c) => c.module === m.id).map((c) => {
      const cs = qStats(chIds(c));
      const read = S.get().read[c.id];
      return `<div class="chrow">
        <span class="no">${c.ch}</span>
        <span class="t"><a href="#/x/${ex}/ch/${c.ch}">${esc(c.title)}</a><br><span class="tiny">${c.qs.length} questions · ${cs.seen} attempted${read ? ' · notes read ✓' : ''}</span></span>
        <span class="meter">${bar(cs.acc)}<span class="tiny">${cs.acc == null ? 'not started' : `${pct(cs.acc)} accuracy`}</span></span>
        <span class="acts"><a class="btn ghost sm" href="#/x/${ex}/ch/${c.ch}">Notes</a><a class="btn sm" href="#/x/${ex}/practice/ch-${c.ch}">Practise</a></span>
      </div>`;
    }).join('');
    return `<div class="module"><header><h3>Module ${m.id} · ${esc(m.name)}</h3><span class="row small muted"><span>${m.weight} marks</span><span>~${plan[m.id]} MCQs in a mock</span><span>${pct(ms.acc)} accuracy</span><a href="#/x/${ex}/practice/m-${m.id}">Module drill →</a></span></header>${rows}</div>`;
  }).join('');
  return `
  <section class="band tight"><div class="wrap">
    <div class="crumbs"><a href="#/">Home</a> / ${esc(p.short)}</div>
    <div class="spread"><div><span class="kicker">${esc(p.code)}</span><h2>${esc(p.name)}</h2></div>
      <div class="row">${active ? `<a class="btn brass" href="#/x/${ex}/mock/run">Resume mock</a>` : ''}<a class="btn" href="#/x/${ex}/mock">Full mock exam</a></div></div>
    <div class="g4" style="margin-top:20px">
      <div class="tile stat"><span class="l">Pattern</span><span class="v">${p.totalMarks} marks</span><span class="tiny">${p.mcq} MCQs + ${p.caseSets.reduce((a, c) => a + c.count, 0)} cases · ${p.minutes} min</span></div>
      <div class="tile stat"><span class="l">Attempted</span><span class="v">${s.seen}/${s.total}</span><span class="tiny">${pct(s.acc)} accuracy</span></div>
      <div class="tile stat"><span class="l">Readiness</span><span class="v">${pct(readiness(ex))}</span><span class="tiny">questions right ÷ bank, weighted</span></div>
      <div class="tile stat"><span class="l">Mocks taken</span><span class="v">${mocks.length}</span><span class="tiny">${mocks[0] ? `last ${mocks[0].score}/${mocks[0].max}` : 'none yet'}</span></div>
    </div>
  </div></section>
  <section class="band tight alt"><div class="wrap">
    <h3 style="margin-bottom:12px">Targeted drills</h3>
    <div class="g4">
      <a class="drill" href="#/x/${ex}/practice/multi"><span class="n">${count('multi')}</span><b>Statement questions</b><span>Statement I / II and “which are true” items.</span></a>
      <a class="drill" href="#/x/${ex}/practice/calc"><span class="n">${count('calc')}</span><b>Numericals</b><span>Set up like Excel; check with the calculator.</span></a>
      <a class="drill" href="#/x/${ex}/practice/trap"><span class="n">${count('trap')}</span><b>Tweaks &amp; traps</b><span>One word changes the answer.</span></a>
      <a class="drill" href="#/x/${ex}/practice/wrong"><span class="n">${wrongN}</span><b>My mistakes</b><span>Questions you last got wrong.</span></a>
      <a class="drill" href="#/x/${ex}/cases"><span class="n">${BANK[ex].cases.length}</span><b>Case studies</b><span>Five linked questions per case.</span></a>
      <a class="drill" href="#/x/${ex}/practice/random"><span class="n">25</span><b>Quick mixed test</b><span>Random questions across the paper.</span></a>
      <a class="drill" href="#/x/${ex}/cards/all"><span class="n">40</span><b>Flashcards</b><span>Flip, self-grade, repeat the hard ones.</span></a>
      <a class="drill" href="#/x/${ex}/formulas"><span class="n">20</span><b>Formula &amp; facts sheet</b><span>Every key number on one page.</span></a>
    </div>
  </div></section>
  <section class="band tight"><div class="wrap">
    <div class="spread"><h3>Chapters by module</h3><span class="tiny">Module marks are from the NISM test objectives.</span></div>
    ${modules}
  </div></section>`;
}

// ---------------- Notes ----------------
function viewNotes(ex, n) {
  const c = chapter(ex, n); if (!c) return null;
  const p = PATTERNS[ex]; const chs = BANK[ex].chapters; const i = chs.indexOf(c);
  const prev = chs[i - 1]; const next = chs[i + 1];
  afterRender = () => S.markRead(c.id);
  const m = p.modules.find((mm) => mm.id === c.module);
  return `<section class="band tight"><div class="wrap">
    <div class="crumbs"><a href="#/">Home</a> / <a href="#/x/${ex}">${esc(p.short)}</a> / Chapter ${c.ch}</div>
    <span class="kicker">Module ${c.module} · ${esc(m.name)}</span>
    <h2>Chapter ${c.ch}: ${esc(c.title)}</h2>
    <div class="row" style="margin:14px 0 4px"><a class="btn" href="#/x/${ex}/practice/ch-${c.ch}">Practise ${c.qs.length} questions</a><a class="btn ghost" href="#/x/${ex}/cards/ch-${c.ch}">Flashcards</a></div>
    <div class="g2" style="grid-template-columns:minmax(0,1fr) 320px;align-items:start;margin-top:18px" id="notesGrid">
      <article class="notes">
        ${c.sections.map((s) => `<h3>${esc(s.h)}</h3><ul>${s.pts.map((pt) => `<li>${esc(pt)}</li>`).join('')}</ul>`).join('')}
        <p class="tiny" style="margin-top:28px">Original summary of the ${esc(p.workbook)}. Section numbers refer to that workbook.</p>
      </article>
      <aside style="position:sticky;top:90px" class="no-print">
        <div class="keys"><span class="kicker">Remember for the exam</span><ul>${(c.keys || []).map((k) => `<li>${esc(k)}</li>`).join('')}</ul></div>
        <div class="card flat" style="margin-top:14px">
          <span class="kicker">Question mix</span>
          <p class="small muted" style="margin:6px 0 0">${c.qs.length} questions · ${c.qs.filter((q) => q.t === 'multi').length} statement · ${c.qs.filter((q) => q.t === 'calc').length} numerical · ${c.qs.filter((q) => q.t === 'trap').length} trap</p>
        </div>
      </aside>
    </div>
    <div class="qnav no-print">${prev ? `<a class="btn ghost" href="#/x/${ex}/ch/${prev.ch}">← Ch ${prev.ch}: ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="btn ghost" href="#/x/${ex}/ch/${next.ch}">Ch ${next.ch}: ${esc(next.title)} →</a>` : ''}</div>
  </div></section>
  <style>@media (max-width:900px){#notesGrid{grid-template-columns:1fr!important}#notesGrid aside{position:static!important}}</style>`;
}

// ---------------- Practice ----------------
let P = null; // practice session
function practiceList(ex, scope) {
  const all = allQuestions(ex);
  let list; let title;
  if (scope.startsWith('ch-')) { const c = chapter(ex, scope.slice(3)); list = c ? c.qs.map((q) => q.id) : []; title = c ? `Chapter ${c.ch}: ${c.title}` : 'Chapter'; }
  else if (scope.startsWith('m-')) { const mid = Number(scope.slice(2)); const m = PATTERNS[ex].modules.find((x) => x.id === mid); list = all.filter((x) => x.chapter.module === mid).map((x) => x.q.id); title = m ? `Module ${m.id}: ${m.name}` : 'Module'; }
  else if (TYPE[scope]) { list = all.filter((x) => x.q.t === scope).map((x) => x.q.id); title = `${TYPE[scope]} drill`; }
  else if (scope === 'wrong') { list = all.filter((x) => { const s = S.stat(x.q.id); return s && !s.last; }).map((x) => x.q.id); title = 'My mistakes'; }
  else { list = shuffle(all.map((x) => x.q.id), rng(Date.now())).slice(0, 25); title = 'Quick mixed test (25)'; }
  return { list, title };
}
function viewPractice(ex, scope) {
  const p = PATTERNS[ex];
  const key = `${ex}/${scope}`;
  if (fresh && P && P.key === key && P.i >= P.list.length) P = null;
  if (!P || P.key !== key) {
    const { list, title } = practiceList(ex, scope);
    const order = scope.startsWith('ch-') ? list : shuffle(list, rng(Date.now()));
    P = { key, ex, scope, title, list: order, i: 0, picked: {}, right: 0, done: 0 };
  }
  if (!P.list.length) {
    return `<section class="band"><div class="wrap narrow"><div class="crumbs"><a href="#/x/${ex}">${esc(p.short)}</a> / ${esc(P.title)}</div><h2>${esc(P.title)}</h2><p class="muted">${scope === 'wrong' ? 'No mistakes to review — every question you have attempted was right the last time. 🎉' : 'No questions here yet.'}</p><a class="btn" href="#/x/${ex}">Back to ${esc(p.short)}</a></div></section>`;
  }
  if (P.i >= P.list.length) return practiceSummary();
  const id = P.list[P.i]; const { q, chapter: c } = lookup(id);
  const chosen = P.picked[id];
  const answered = chosen !== undefined;
  const opts = shown(id, q).map((k, pos) => {
    let cls = ''; if (answered) { if (k === q.a) cls = 'right'; else if (k === chosen) cls = 'wrong'; }
    return `<li><button class="opt ${cls}" data-act="pick" data-k="${k}" data-pos="${pos}" ${answered ? 'disabled' : ''} aria-pressed="${chosen === k}"><span class="k">${L[pos]}</span><span>${esc(q.o[k])}</span></button></li>`;
  }).join('');
  const ok = chosen === q.a;
  return `<section class="band tight"><div class="wrap narrow">
    <div class="crumbs"><a href="#/">Home</a> / <a href="#/x/${ex}">${esc(p.short)}</a> / ${esc(P.title)}</div>
    <div class="progress"><span>${P.i + 1} / ${P.list.length}</span>${pbar((P.i + (answered ? 1 : 0)) / P.list.length)}<span>${P.right} right</span></div>
    <div class="qcard">
      <div class="qmeta"><span class="pill info">Ch ${c.ch} · ${esc(c.title)}</span>${q.t ? `<span class="pill ${q.t === 'trap' ? 'act' : q.t === 'calc' ? 'ok' : 'mark'}">${TYPE[q.t]}</span>` : ''}${q.d === 3 ? '<span class="pill act">Tough</span>' : ''}</div>
      <p class="qtext">${esc(q.q)}</p>
      <ul class="opts">${opts}</ul>
      ${answered ? `<div class="explain"><p class="verdict ${ok ? 'ok' : 'no'}">${ok ? 'Correct.' : `Not quite — the answer is ${letterOf(id, q, q.a)}.`}</p><p>${esc(q.e)}</p><p class="ref">Workbook ref: ${esc(refTxt(q.ref || c.ch))}${q.t === 'calc' ? ' · <a href="#/calc">open the calculator</a>' : ''}</p></div>` : '<p class="tiny kbd-tip" style="margin-top:12px">Tip: press 1–4 or A–D to answer, → for next.</p>'}
      <div class="qnav"><button class="btn ghost sm" data-act="pprev" ${P.i === 0 ? 'disabled' : ''}>← Previous</button>
        <span class="row"><a class="btn ghost sm" href="#/x/${ex}/ch/${c.ch}">Read notes</a>${answered ? `<button class="btn sm" data-act="pnext">${P.i + 1 === P.list.length ? 'Finish' : 'Next →'}</button>` : '<button class="btn ghost sm" data-act="pskip">Skip</button>'}</span></div>
    </div>
  </div></section>`;
}
function practiceSummary() {
  const p = PATTERNS[P.ex];
  const wrong = P.list.filter((id) => P.picked[id] !== undefined && P.picked[id] !== lookup(id).q.a);
  return `<section class="band"><div class="wrap narrow">
    <div class="crumbs"><a href="#/x/${P.ex}">${esc(p.short)}</a> / ${esc(P.title)}</div>
    <h2>Done: ${P.right} / ${P.done} right</h2>
    <p class="muted">${P.done ? `${Math.round((P.right / P.done) * 100)}% accuracy.` : ''} ${wrong.length ? `${wrong.length} to revisit — they are now in “My mistakes”.` : 'Clean sheet!'}</p>
    ${wrong.length ? `<div class="card" style="margin:16px 0">${wrong.map((id) => { const { q } = lookup(id); return `<div class="revitem"><b>${esc(q.q)}</b><div class="ans">✓ ${esc(q.o[q.a])}</div><div class="tiny">${esc(q.e)}</div></div>`; }).join('')}</div>` : ''}
    <div class="row"><button class="btn" data-act="prestart">Go again</button><a class="btn ghost" href="#/x/${P.ex}/practice/wrong">Drill my mistakes</a><a class="btn ghost" href="#/x/${P.ex}">Back to ${esc(p.short)}</a></div>
  </div></section>`;
}
ACTIONS.pick = (el) => {
  const id = P.list[P.i]; if (P.picked[id] !== undefined) return;
  const k = Number(el.dataset.k); const { q } = lookup(id);
  P.picked[id] = k; P.done++; if (k === q.a) P.right++;
  S.record(id, k === q.a); keepScroll = true; route();
};
ACTIONS.pnext = () => { P.i++; route(); };
ACTIONS.pskip = () => { P.i++; route(); };
ACTIONS.pprev = () => { if (P.i > 0) { P.i--; keepScroll = false; route(); } };
ACTIONS.prestart = () => { const { ex, scope } = P; P = null; location.hash = `#/x/${ex}/practice/${scope}`; route(); };

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { const m = $('#mmodal'); const d = $('#mdrawer'); if (m && m.innerHTML) m.innerHTML = ''; else if (d && d.innerHTML) d.innerHTML = ''; return; }
  if (e.target.matches('input,select,textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
  if ($('#mmodal') && $('#mmodal').innerHTML) return;
  const h = location.hash;
  const k = e.key.toLowerCase();
  const idx = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 }[k];
  if (h.includes('/practice/') && P) {
    if (idx !== undefined) { const b = main.querySelectorAll('.opt:not([disabled])')[idx]; if (b) b.click(); }
    else if (k === 'arrowright' || k === 'enter') { const b = main.querySelector('[data-act="pnext"],[data-act="pskip"]'); if (b) b.click(); }
    else if (k === 'arrowleft') { const b = main.querySelector('[data-act="pprev"]'); if (b && !b.disabled) b.click(); }
  } else if (h.endsWith('/mock/run') && M) {
    if (idx !== undefined) { const b = main.querySelectorAll('.opt')[idx]; if (b) b.click(); }
    else if (k === 'arrowright') mockGo(M.idx + 1);
    else if (k === 'arrowleft') mockGo(M.idx - 1);
  } else if (h.includes('/cards/') && C) {
    if (k === ' ' || k === 'enter') { e.preventDefault(); ACTIONS.flip(); }
  }
});

// ---------------- Case studies (practice) ----------------
function viewCases(ex) {
  const p = PATTERNS[ex];
  const rows = BANK[ex].cases.map((c) => {
    const ids = c.qs.map((_, i) => `${c.id}-${i}`); const s = qStats(ids);
    return `<a class="drill" href="#/x/${ex}/case/${c.id}"><span class="row"><span class="pill ${c.w === 2 ? 'ok' : 'info'}">${c.w} mark${c.w > 1 ? 's' : ''} each</span><span class="tiny">Ch ${(c.ch || []).join(', ')}</span></span><b>${esc(c.title)}</b><span>${s.seen ? `${s.right}/5 right last time` : '5 questions'}</span></a>`;
  }).join('');
  return `<section class="band tight"><div class="wrap">
    <div class="crumbs"><a href="#/">Home</a> / <a href="#/x/${ex}">${esc(p.short)}</a> / Case studies</div>
    <h2>Case studies</h2>
    <p class="muted" style="max-width:720px">${ex === 'xa' ? 'X-A has 6 caselets worth 1 mark per question and 3 worth 2 marks per question.' : 'X-B has 6 case studies, each with 5 questions worth 2 marks — 60 of the 150 marks.'} Read the facts once, carefully; most questions re-use the same numbers, so a mistake early on costs you several marks.</p>
    <div class="g3" style="margin-top:18px">${rows}</div>
  </div></section>`;
}
let CS = null;
function viewCase(ex, id) {
  const c = caseById(ex, id); if (!c) return null;
  const p = PATTERNS[ex];
  if (!CS || CS.id !== id) CS = { id, picked: {} };
  const qs = c.qs.map((q, i) => {
    const qid = `${c.id}-${i}`; const chosen = CS.picked[i]; const answered = chosen !== undefined;
    return `<div class="qcard" style="margin-top:14px"><div class="qmeta"><span class="pill info">Q${i + 1}</span>${q.t ? `<span class="pill ${q.t === 'trap' ? 'act' : q.t === 'calc' ? 'ok' : 'mark'}">${TYPE[q.t]}</span>` : ''}<span class="tiny">${c.w} mark${c.w > 1 ? 's' : ''}</span></div>
      <p class="qtext">${esc(q.q)}</p>
      <ul class="opts">${shown(qid, q).map((k, pos) => { let cls = ''; if (answered) { if (k === q.a) cls = 'right'; else if (k === chosen) cls = 'wrong'; } return `<li><button class="opt ${cls}" data-act="cpick" data-i="${i}" data-k="${k}" data-qid="${qid}" ${answered ? 'disabled' : ''}><span class="k">${L[pos]}</span><span>${esc(q.o[k])}</span></button></li>`; }).join('')}</ul>
      ${answered ? `<div class="explain"><p class="verdict ${chosen === q.a ? 'ok' : 'no'}">${chosen === q.a ? 'Correct.' : `Answer: ${letterOf(qid, q, q.a)}.`}</p><p>${esc(q.e)}</p><p class="ref">Workbook ref: ${esc(refTxt(q.ref))}</p></div>` : ''}
    </div>`;
  }).join('');
  const idx = BANK[ex].cases.indexOf(c); const next = BANK[ex].cases[idx + 1];
  return `<section class="band tight"><div class="wrap narrow">
    <div class="crumbs"><a href="#/x/${ex}">${esc(p.short)}</a> / <a href="#/x/${ex}/cases">Case studies</a> / ${esc(c.title)}</div>
    <h2>${esc(c.title)}</h2>
    <div class="casebox" style="margin-top:14px"><h4>The facts</h4><p>${esc(c.text)}</p></div>
    ${qs}
    <div class="qnav"><a class="btn ghost" href="#/x/${ex}/cases">All cases</a>${next ? `<a class="btn" href="#/x/${ex}/case/${next.id}">Next case →</a>` : ''}</div>
  </div></section>`;
}
ACTIONS.cpick = (el) => {
  const i = Number(el.dataset.i); if (CS.picked[i] !== undefined) return;
  const k = Number(el.dataset.k); const { q } = lookup(el.dataset.qid);
  CS.picked[i] = k; S.record(el.dataset.qid, k === q.a); keepScroll = true; route();
};

// ---------------- Flashcards ----------------
let C = null;
function viewCards(ex, scope) {
  const p = PATTERNS[ex];
  const key = `${ex}/${scope}`;
  if (!C || C.key !== key) {
    let qs = scope.startsWith('ch-') ? (chapter(ex, scope.slice(3))?.qs || []) : allQuestions(ex).map((x) => x.q);
    // Hardest first: cards marked "again", then never-seen, then the rest.
    const box = (q) => S.get().cards[q.id] ?? 0.5;
    qs = shuffle(qs, rng(Date.now())).sort((a, b) => box(a) - box(b)).slice(0, 40);
    C = { key, ex, scope, ids: qs.map((q) => q.id), i: 0, flipped: false, known: 0 };
  }
  if (C.i >= C.ids.length) {
    return `<section class="band"><div class="wrap narrow"><h2>Deck done</h2><p class="muted">You knew ${C.known} of ${C.ids.length}. Cards you marked “again” come first next time.</p><div class="row"><button class="btn" data-act="cagain">New deck</button><a class="btn ghost" href="#/x/${ex}">Back</a></div></div></section>`;
  }
  const { q, chapter: c } = lookup(C.ids[C.i]);
  return `<section class="band tight"><div class="wrap">
    <div class="crumbs"><a href="#/x/${ex}">${esc(p.short)}</a> / Flashcards${scope.startsWith('ch-') ? ` · Chapter ${scope.slice(3)}` : ''}</div>
    <div class="progress narrow" style="margin:0 auto 14px"><span>${C.i + 1} / ${C.ids.length}</span>${pbar(C.i / C.ids.length)}</div>
    <div class="flash ${C.flipped ? 'flipped' : ''}" id="flash">
      <div class="inner" data-act="flip" role="button" tabindex="0" aria-label="Flip card">
        <div class="face front"><span class="kicker">Ch ${c.ch} · ${esc(c.title)}</span><p class="qtext" style="margin-top:10px">${esc(q.q)}</p><p class="tiny">Answer in your head, then tap to flip (or press Space).</p></div>
        <div class="face back"><span class="kicker">Answer</span><p class="qtext" style="margin:10px 0 8px">${esc(q.o[q.a])}</p><p class="small">${esc(q.e)}</p><p class="tiny">${esc(refTxt(q.ref))}</p></div>
      </div>
    </div>
    <div class="row" id="cardBtns" style="justify-content:center;margin-top:18px">${C.flipped ? '<button class="btn ghost" data-act="cno">Again</button><button class="btn" data-act="cyes">Knew it</button>' : '<button class="btn" data-act="flip">Show answer</button>'}</div>
  </div></section>`;
}
ACTIONS.flip = () => {
  if (!C) return; C.flipped = !C.flipped;
  const f = $('#flash'); if (f) f.classList.toggle('flipped', C.flipped);
  const r = $('#cardBtns'); if (r) r.innerHTML = C.flipped ? '<button class="btn ghost" data-act="cno">Again</button><button class="btn" data-act="cyes">Knew it</button>' : '<button class="btn" data-act="flip">Show answer</button>';
};
ACTIONS.cyes = () => { S.card(C.ids[C.i], 2); C.known++; C.i++; C.flipped = false; route(); };
ACTIONS.cno = () => { S.card(C.ids[C.i], 0); C.i++; C.flipped = false; route(); };
ACTIONS.cagain = () => { const { ex, scope } = C; C = null; location.hash = `#/x/${ex}/cards/${scope}`; route(); };

// ---------------- Formula / facts sheet ----------------
function viewFormulas(ex) {
  const p = PATTERNS[ex];
  const mods = p.modules.map((m) => {
    const chs = BANK[ex].chapters.filter((c) => c.module === m.id);
    return `<div class="card flat" style="break-inside:avoid"><span class="kicker">Module ${m.id} · ${m.weight} marks</span><h3 style="margin:4px 0 8px">${esc(m.name)}</h3>${chs.map((c) => `<p style="margin:10px 0 4px"><b><a href="#/x/${ex}/ch/${c.ch}">Ch ${c.ch} · ${esc(c.title)}</a></b></p><ul style="margin:0;padding-left:20px">${(c.keys || []).map((k) => `<li class="small">${esc(k)}</li>`).join('')}</ul>`).join('')}</div>`;
  }).join('');
  return `<section class="band tight"><div class="wrap">
    <div class="crumbs"><a href="#/x/${ex}">${esc(p.short)}</a> / Formula &amp; facts sheet</div>
    <div class="spread"><h2>${esc(p.short)} — formulas &amp; must-know facts</h2>${FRAMED ? '' : '<button class="btn ghost sm no-print" data-act="print">Print / save as PDF</button>'}</div>
    <p class="muted">The last-day revision sheet: every chapter’s key numbers in one place.</p>
    <div class="g2" style="margin-top:16px">${mods}</div>
  </div></section>`;
}
ACTIONS.print = () => window.print();

// ---------------- Mock exam ----------------
let M = null; let tick = null;
function viewMockLobby(ex) {
  const p = PATTERNS[ex]; const plan = mcqPlan(p);
  const active = S.get().active && S.get().active.exam === ex ? S.get().active : null;
  const mocks = S.get().mocks.map((m, i) => ({ ...m, i })).filter((m) => m.exam === ex);
  return `<section class="band tight"><div class="wrap">
    <div class="crumbs"><a href="#/">Home</a> / <a href="#/x/${ex}">${esc(p.short)}</a> / Mock exam</div>
    <h2>Full mock — ${esc(p.code)}</h2>
    <div class="g2" style="margin-top:18px;align-items:start">
      <div class="card">
        <span class="kicker">Exactly like the real paper</span>
        <table class="tbl" style="margin-top:8px"><tbody>
          <tr><td>Multiple-choice questions</td><td class="r">${p.mcq} × 1 mark</td><td class="r">${p.mcq}</td></tr>
          ${p.caseSets.map((c) => `<tr><td>${esc(c.label)}</td><td class="r">${c.count} × 5 × ${c.w}</td><td class="r">${c.count * 5 * c.w}</td></tr>`).join('')}
          <tr><th>Total</th><th class="r">${p.minutes} minutes</th><th class="r">${p.totalMarks}</th></tr>
        </tbody></table>
        <ul class="list small" style="margin-top:12px">
          <li>Pass mark ${p.passPct}% (${(p.totalMarks * p.passPct) / 100} marks). Each wrong answer costs ${p.negative * 100}% of that question’s marks; skipped questions cost nothing.</li>
          <li>MCQs are drawn by module weight: ${p.modules.map((m) => `M${m.id} ${plan[m.id]}`).join(' · ')}. Questions you have not met before are picked first.</li>
          <li>Budget about ${paceSeconds(p)} seconds per mark (${Math.round(paceSeconds(p) * 5 * 2 / 60)} minutes for a 2-mark case). The test centre gives you a spreadsheet; use <a href="#/calc">the calculator</a> here (also inside the mock).</li>
          <li>Your answers are saved as you go — you can close the tab and resume.</li>
        </ul>
        <div class="row" style="margin-top:14px">${active ? `<a class="btn brass" href="#/x/${ex}/mock/run">Resume (${fmtLeft(active.endsAt - Date.now())} left)</a><button class="btn ghost" data-act="mstart" data-ex="${ex}">Discard &amp; start new</button>` : `<button class="btn" data-act="mstart" data-ex="${ex}">Start the 3-hour mock</button>`}</div>
      </div>
      <div class="card">
        <span class="kicker">Your mock history</span>
        ${mocks.length ? `<table class="tbl" style="margin-top:8px"><thead><tr><th>Date</th><th class="r">Score</th><th class="r">%</th><th></th></tr></thead><tbody>${mocks.map((m) => `<tr><td>${new Date(m.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td><td class="r">${m.score}/${m.max}</td><td class="r"><span class="pill ${m.pass ? 'good' : 'act'}">${Math.round(m.pct)}%</span></td><td class="r"><a href="#/x/${ex}/mock/result/${m.i}">Review</a></td></tr>`).join('')}</tbody></table>` : '<p class="muted">No mocks yet. Take one after you have practised a few chapters, then again in the last week.</p>'}
      </div>
    </div>
  </div></section>`;
}
const fmtLeft = (ms) => { const s = Math.max(0, Math.floor(ms / 1000)); const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const ss = s % 60; return `${h}:${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`; };
ACTIONS.mstart = (el) => {
  const ex = el.dataset.ex; const p = PATTERNS[ex];
  const qKeys = Object.keys(S.get().q);
  const seen = new Set([...qKeys, ...qKeys.map((k) => k.replace(/-\d+$/, '')), ...S.get().mocks.flatMap((m) => m.cases || [])]);
  const mock = buildMock(p, BANK[ex], { seed: Date.now() % 2147483647, seen });
  const now = Date.now();
  S.setActive({ ...mock, answers: {}, marked: {}, visited: {}, start: now, endsAt: now + p.minutes * 60000, idx: 0 }); flush();
  M = null; location.hash = `#/x/${ex}/mock/run`;
};
const itemKey = (it) => lookup(it.qid).q.a;
function viewMockRun(ex) {
  const a = S.get().active;
  if (!a || a.exam !== ex) { location.hash = `#/x/${ex}/mock`; return ''; }
  M = a; const p = PATTERNS[ex];
  M.visited ||= {}; M.visited[M.idx] = true;
  const it = M.items[M.idx]; const { q } = lookup(it.qid);
  const nMcq = M.items.filter((x) => x.kind === 'mcq').length;
  const caseRanges = []; let start = nMcq;
  while (start < M.items.length) { const cid = M.items[start].caseId; let end = start; while (end < M.items.length && M.items[end].caseId === cid) end++; caseRanges.push([start, end, M.items[start].marks]); start = end; }
  const cr = caseRanges.find((r) => M.idx >= r[0] && M.idx < r[1]);
  const caseNo = cr ? caseRanges.indexOf(cr) + 1 : 0;
  const sec = it.kind === 'mcq' ? 'Section A · Multiple choice' : `Case study ${caseNo} of ${caseRanges.length}`;
  const cs = it.kind === 'case' ? caseById(ex, it.caseId) : null;
  const st = mockCounts();
  const cls = (i) => [M.answers[i] !== undefined ? 'ans' : (M.visited[i] ? 'vis' : ''), M.marked[i] ? 'mk' : '', i === M.idx ? 'cur' : ''].join(' ').trim();
  const palette = (from, to, label) => `<p class="tiny" style="margin:10px 0 0"><b>${label}</b></p><div class="pal">${M.items.slice(from, to).map((x, j) => { const i = from + j; return `<button data-act="mgo" data-i="${i}" class="${cls(i)}" aria-label="Question ${i + 1}${M.answers[i] !== undefined ? ', answered' : ''}${M.marked[i] ? ', marked for review' : ''}">${i + 1}</button>`; }).join('')}</div>`;
  const palOpen = M.palOpen ?? matchMedia('(min-width: 981px)').matches;
  afterRender = startTimer;
  cleanup = () => { clearInterval(tick); };
  return `<div class="exambar"><div class="wrap spread">
      <span class="row" style="gap:4px 14px"><b>${esc(p.code)} · Mock</b><span class="tiny">${st.ans}/${M.items.length} answered · ${st.mk} marked</span></span>
      <span class="row"><button class="btn ghost sm" data-act="mcalc">Calculator</button><span class="timer" id="timer" role="timer" aria-label="Time left">${fmtLeft(M.endsAt - Date.now())}</span><button class="btn brass sm" data-act="msubmit">Submit</button></span>
    </div></div>
    <div class="wrap exam">
      <div style="min-width:0">
        ${cs ? `<div class="casebox"><h4>${esc(cs.title)} <span class="tiny">· questions ${cr[0] + 1}–${cr[1]}</span></h4><p>${esc(cs.text)}</p></div>` : ''}
        <div class="qcard">
          <div class="qhead"><b>Question ${M.idx + 1}</b><span class="row" style="gap:6px"><span class="pill info">${sec}</span><span class="pill blue">+${it.marks} / −${it.marks * p.negative}</span>${M.marked[M.idx] ? '<span class="pill mark">Marked</span>' : ''}</span></div>
          <p class="qtext">${esc(q.q)}</p>
          <ul class="opts">${shown(it.qid, q).map((k, pos) => `<li><button class="opt" data-act="manswer" data-k="${k}" data-pos="${pos}" aria-pressed="${M.answers[M.idx] === k}"><span class="k">${L[pos]}</span><span>${esc(q.o[k])}</span></button></li>`).join('')}</ul>
          <div class="qnav">
            <span class="row"><button class="btn ghost sm" data-act="mprev" ${M.idx === 0 ? 'disabled' : ''}>← Previous</button><button class="btn ghost sm" data-act="mclear" ${M.answers[M.idx] === undefined ? 'disabled' : ''}>Clear response</button></span>
            <span class="row"><button class="btn ghost sm" data-act="mmark">${M.marked[M.idx] ? 'Unmark' : 'Mark for review &amp; next'}</button><button class="btn sm" data-act="mnext" ${M.idx + 1 === M.items.length ? 'disabled' : ''}>Next →</button></span>
          </div>
        </div>
        <p class="tiny kbd-tip" style="margin-top:10px">Keys: 1–4 or A–D to answer · ← → to move.</p>
      </div>
      <aside class="palette card flat">
        <details ${palOpen ? 'open' : ''} id="palDetails"><summary>Question palette <span class="tiny">${st.ans} answered · ${st.notAns} not answered · ${st.notVis} not visited</span></summary>
        <div class="legend" style="margin-top:10px"><span><i class="a"></i>Answered</span><span><i class="v"></i>Not answered</span><span><i class="m"></i>Marked</span><span><i class="am"></i>Answered &amp; marked</span><span><i></i>Not visited</span></div>
        ${palette(0, nMcq, `Section A · MCQs 1–${nMcq} · 1 mark`)}
        ${caseRanges.map((r, j) => palette(r[0], r[1], `Case ${j + 1} · Q${r[0] + 1}–${r[1]} · ${r[2]} mark${r[2] > 1 ? 's' : ''} each`)).join('')}
        </details>
        <button class="btn brass sm" style="width:100%;margin-top:8px" data-act="msubmit">Submit exam</button>
      </aside>
    </div>
    <div id="mmodal"></div><div id="mdrawer"></div>`;
}
function mockCounts() {
  const n = M.items.length; let ans = 0; let mk = 0; let vis = 0;
  for (let i = 0; i < n; i++) { if (M.answers[i] !== undefined) ans++; if (M.marked[i]) mk++; if (M.visited && M.visited[i]) vis++; }
  return { ans, mk, notAns: Math.max(0, vis - ans), notVis: n - Math.max(vis, ans) };
}
function startTimer() {
  clearInterval(tick);
  const upd = () => {
    const el = $('#timer'); if (!el || !M) return;
    const left = M.endsAt - Date.now();
    el.textContent = fmtLeft(left); el.classList.toggle('low', left < 10 * 60000);
    if (left <= 0) { clearInterval(tick); finishMock(true); }
  };
  upd(); tick = setInterval(upd, 1000);
}
function mockGo(i) { if (!M) return; if (i < 0 || i >= M.items.length) return; M.idx = i; S.setActive(M); route(); }
ACTIONS.mgo = (el) => mockGo(Number(el.dataset.i));
ACTIONS.mnext = () => mockGo(Math.min(M.idx + 1, M.items.length - 1));
ACTIONS.mprev = () => mockGo(M.idx - 1);
ACTIONS.manswer = (el) => { const k = Number(el.dataset.k); M.answers[M.idx] = k; S.setActive(M); keepScroll = true; route(); };
ACTIONS.mclear = () => { delete M.answers[M.idx]; S.setActive(M); keepScroll = true; route(); };
ACTIONS.mmark = () => { M.marked[M.idx] = !M.marked[M.idx]; if (M.marked[M.idx] && M.idx + 1 < M.items.length) M.idx++; S.setActive(M); route(); };
main.addEventListener('toggle', (e) => { if (e.target.id === 'palDetails' && M) { M.palOpen = e.target.open; } }, true);
ACTIONS.msubmit = () => {
  const st = mockCounts(); const left = M.endsAt - Date.now();
  $('#mmodal').innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="mt"><div class="card"><h3 id="mt">Submit the exam?</h3>
    <table class="tbl" style="margin:12px 0"><tbody><tr><td>Answered</td><td class="r">${st.ans}</td></tr><tr><td>Not answered (visited)</td><td class="r">${st.notAns}</td></tr><tr><td>Not visited</td><td class="r">${st.notVis}</td></tr><tr><td>Marked for review</td><td class="r">${st.mk}</td></tr><tr><td>Time left</td><td class="r">${fmtLeft(left)}</td></tr></tbody></table>
    <p class="small muted">You cannot change answers after submitting. Unanswered questions score zero; wrong answers lose ${PATTERNS[M.exam].negative * 100}% of their marks.</p>
    <div class="row" style="justify-content:flex-end"><button class="btn ghost" data-act="mcancel">Back to exam</button><button class="btn brass" data-act="mfinish">Submit now</button></div></div></div>`;
  $('#mmodal button[data-act="mcancel"]').focus();
};
ACTIONS.mcancel = () => { $('#mmodal').innerHTML = ''; };
ACTIONS.mfinish = () => finishMock(false);
ACTIONS.mcalc = () => {
  const d = $('#mdrawer');
  if (d.innerHTML) { d.innerHTML = ''; return; }
  d.innerHTML = `<div class="drawer" role="dialog" aria-label="Calculator"><div class="spread"><h3>TVM calculator</h3><button class="iconbtn" data-act="mcalc" aria-label="Close">✕</button></div>${calcWidget('mini')}</div>`;
  bindCalc(d);
};
function finishMock(auto) {
  clearInterval(tick);
  const p = PATTERNS[M.exam];
  const r = scoreMock(p, M.items, M.answers, itemKey);
  M.items.forEach((it, i) => { if (M.answers[i] !== undefined) S.record(it.qid, M.answers[i] === itemKey(it)); });
  const used = Math.min(Date.now(), M.endsAt) - M.start;
  S.saveMock({ exam: M.exam, seed: M.seed, date: Date.now(), items: M.items, answers: M.answers, marked: M.marked, cases: M.cases, used, ...r });
  const ex = M.exam; M = null;
  if (auto) toast('Time is up — your mock was submitted.');
  location.hash = `#/x/${ex}/mock/result/0`;
}
function viewResult(ex, i) {
  const m = S.get().mocks[i]; const p = PATTERNS[ex];
  if (fresh) R.filter = 'all';
  if (!m || m.exam !== ex) return `<section class="band"><div class="wrap"><h2>No result found</h2><a class="btn" href="#/x/${ex}/mock">Back</a></div></section>`;
  const lostRaw = m.items.reduce((s, it, k) => s + (m.answers[k] !== undefined && m.answers[k] !== itemKey(it) ? it.marks * p.negative : 0), 0);
  const lost = Math.round(lostRaw * 100) / 100;
  const modRows = p.modules.map((mod) => {
    const b = m.byModule[mod.id] || { marks: 0, max: 0, attempted: 0, correct: 0, n: 0 };
    const acc = b.attempted ? b.correct / b.attempted : null;
    return `<tr><td>M${mod.id} · ${esc(mod.name)}</td><td class="r">${b.n}</td><td class="r">${Math.round(b.marks * 100) / 100} / ${b.max}</td><td style="min-width:120px">${bar(acc)}<span class="tiny">${pct(acc)}</span></td><td class="r"><a href="#/x/${ex}/practice/m-${mod.id}">Drill</a></td></tr>`;
  }).join('');
  const weakest = p.modules.map((mod) => ({ mod, b: m.byModule[mod.id] })).filter((x) => x.b && x.b.max && x.b.marks / x.b.max < 0.7).sort((a, b) => a.b.marks / a.b.max - b.b.marks / b.b.max).slice(0, 2);
  const f = R.filter;
  const list = m.items.map((it, k) => ({ it, k })).filter(({ it, k }) => {
    const a = m.answers[k]; const ok = a === itemKey(it);
    if (f === 'wrong') return a !== undefined && !ok; if (f === 'skipped') return a === undefined; if (f === 'marked') return m.marked && m.marked[k]; return true;
  });
  let lastCase = null;
  const review = list.map(({ it, k }) => {
    const { q } = lookup(it.qid); const a = m.answers[k]; const ok = a === q.a;
    let caseHead = '';
    if (it.kind === 'case' && it.caseId !== lastCase) { const c = caseById(ex, it.caseId); caseHead = `<div class="casebox" style="margin-top:16px"><h4>${esc(c.title)}</h4><p class="small">${esc(c.text)}</p></div>`; }
    lastCase = it.kind === 'case' ? it.caseId : null;
    return `${caseHead}<div class="revitem"><div class="qmeta"><span class="pill ${a === undefined ? 'info' : ok ? 'good' : 'act'}">Q${k + 1} · ${a === undefined ? 'skipped' : ok ? `+${it.marks}` : `−${it.marks * p.negative}`}</span>${m.marked && m.marked[k] ? '<span class="pill mark">marked</span>' : ''}<span class="tiny">M${it.module}${it.ch ? ` · Ch ${it.ch}` : ''}</span></div><b>${esc(q.q)}</b>
      <div class="ans">${a !== undefined && !ok ? `<span style="color:var(--bad)">✗ Your answer: ${letterOf(it.qid, q, a)}. ${esc(q.o[a])}</span><br>` : ''}<span style="color:var(--ok)">✓ ${letterOf(it.qid, q, q.a)}. ${esc(q.o[q.a])}</span></div><p class="small muted" style="margin:6px 0 0">${esc(q.e)} <span class="tiny">${esc(refTxt(q.ref))}</span></p></div>`;
  }).join('');
  return `<section class="band tight"><div class="wrap">
    <div class="crumbs"><a href="#/x/${ex}">${esc(p.short)}</a> / <a href="#/x/${ex}/mock">Mock exam</a> / Result</div>
    <div class="card" style="display:flex;gap:26px;align-items:center;flex-wrap:wrap">
      <div class="scorering" style="--p:${Math.max(0, m.pct)};--ring:${m.pass ? 'var(--ok)' : 'var(--bad)'}"><div><span><b>${m.score}</b><br><span class="tiny">of ${m.max}</span></span></div></div>
      <div style="flex:1;min-width:240px">
        <span class="pill ${m.pass ? 'good' : 'act'}">${m.pass ? 'PASS' : 'NOT YET'} · ${Math.round(m.pct * 10) / 10}% (pass ${p.passPct}%)</span>
        <h2 style="margin:8px 0 6px">${m.pass ? 'You cleared the bar.' : `${Math.max(0, Math.ceil((p.passPct / 100) * m.max - m.score))} more marks needed.`}</h2>
        <p class="muted" style="margin:0">${m.correct} right · ${m.wrong} wrong${lost ? ` (−${lost} marks lost to negative marking)` : ''} · ${m.skipped} skipped · time used ${fmtLeft(m.used)}</p>
        ${weakest.length ? `<p class="small" style="margin-top:8px">Focus next on: ${weakest.map((w) => `<a href="#/x/${ex}/practice/m-${w.mod.id}">Module ${w.mod.id} (${esc(w.mod.name)})</a>`).join(' and ')}.</p>` : ''}
        ${m.wrong > m.correct / 3 ? '<p class="small note red">Many wrong answers: with −25% marking, skip a question if you cannot eliminate at least two options.</p>' : ''}
      </div>
    </div>
    <h3 style="margin:26px 0 10px">Marks by module</h3>
    <div class="scroll"><table class="tbl"><thead><tr><th>Module</th><th class="r">Qs</th><th class="r">Marks</th><th>Accuracy</th><th></th></tr></thead><tbody>${modRows}</tbody></table></div>
    <div class="spread" style="margin-top:26px"><h3>Review answers</h3><div class="tabs" role="group" aria-label="Filter">${['all', 'wrong', 'skipped', 'marked'].map((x) => `<button data-act="rfilter" data-f="${x}" aria-pressed="${f === x}">${x[0].toUpperCase() + x.slice(1)}</button>`).join('')}</div></div>
    <div class="card">${review || '<p class="muted">Nothing in this filter.</p>'}</div>
    <div class="row" style="margin-top:18px"><a class="btn" href="#/x/${ex}/mock">Take another mock</a><a class="btn ghost" href="#/x/${ex}/practice/wrong">Drill my mistakes</a></div>
  </div></section>`;
}
const R = { filter: 'all' };
ACTIONS.rfilter = (el) => { R.filter = el.dataset.f; keepScroll = true; route(); };

// ---------------- Calculator ----------------
const CALC = { solve: 'PMT', rate: 9, per: 12, nper: 240, pmt: 0, pv: 4000000, fv: 0, type: 0 };
function calcWidget(mode = 'full') {
  const c = CALC;
  const field = (id, label, hint) => `<div class="field"><label for="c_${id}">${label}</label><input id="c_${id}" data-c="${id}" inputmode="decimal" value="${c.solve.toLowerCase() === id ? '' : c[id]}" ${c.solve.toLowerCase() === id ? 'disabled placeholder="solving…"' : ''}>${hint ? `<span class="hint">${hint}</span>` : ''}</div>`;
  return `<div class="seg" role="group" aria-label="Solve for">${['FV', 'PV', 'PMT', 'NPER', 'RATE'].map((s) => `<button type="button" data-c-solve="${s}" aria-pressed="${c.solve === s}">${s}</button>`).join('')}</div>
    <div class="fields" style="margin-top:14px;${mode === 'mini' ? 'grid-template-columns:1fr 1fr' : ''}">
      ${field('rate', 'Annual rate %', 'e.g. 9 for 9%')}
      <div class="field"><label for="c_per">Periods per year</label><select id="c_per" data-c="per">${[[1, 'Yearly'], [2, 'Half-yearly'], [4, 'Quarterly'], [12, 'Monthly']].map(([v, t]) => `<option value="${v}" ${Number(c.per) === v ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
      ${field('nper', 'Number of periods (nper)', 'total periods, e.g. 240 months')}
      ${field('pmt', 'Payment each period (pmt)', 'paid out = negative')}
      ${field('pv', 'Present value (pv)', 'received = positive')}
      ${field('fv', 'Future value (fv)', '')}
      <div class="field"><label for="c_type">Payments at</label><select id="c_type" data-c="type"><option value="0" ${!Number(c.type) ? 'selected' : ''}>End of period (0)</option><option value="1" ${Number(c.type) ? 'selected' : ''}>Beginning (1)</option></select></div>
    </div>
    <div class="result" id="calcOut" aria-live="polite"></div>`;
}
function calcCompute() {
  const c = CALC; const n = (x) => Number(String(x).replace(/,/g, '')) || 0;
  const r = n(c.rate) / 100 / n(c.per || 1); const per = n(c.nper); const pmt = n(c.pmt); const pv = n(c.pv); const fv = n(c.fv); const t = Number(c.type) || 0;
  const rs = `${(r * 100).toFixed(4).replace(/\.?0+$/, '')}%`;
  let v; let f; let show;
  switch (c.solve) {
    case 'FV': v = FV(r, per, pmt, pv, t); f = `=FV(${rs}, ${per}, ${pmt}, ${pv}, ${t})`; show = fmtINR(v, 2); break;
    case 'PV': v = PV(r, per, pmt, fv, t); f = `=PV(${rs}, ${per}, ${pmt}, ${fv}, ${t})`; show = fmtINR(v, 2); break;
    case 'PMT': v = PMT(r, per, pv, fv, t); f = `=PMT(${rs}, ${per}, ${pv}, ${fv}, ${t})`; show = fmtINR(v, 2); break;
    case 'NPER': v = NPER(r, pmt, pv, fv, t); f = `=NPER(${rs}, ${pmt}, ${pv}, ${fv}, ${t})`; show = isFinite(v) ? `${v.toFixed(2)} periods (${(v / n(c.per || 1)).toFixed(2)} years)` : '—'; break;
    default: v = RATE(per, pmt, pv, fv, t); f = `=RATE(${per}, ${pmt}, ${pv}, ${fv}, ${t})`; show = isFinite(v) ? `${(v * 100).toFixed(4)}% per period · ${(v * n(c.per || 1) * 100).toFixed(3)}% p.a. nominal · ${((1 + v) ** n(c.per || 1) * 100 - 100).toFixed(3)}% effective` : 'No solution — check signs (one of pmt/pv/fv must be negative)';
  }
  return { show, f, v };
}
function bindCalc(root) {
  const out = () => { const { show, f } = calcCompute(); const o = $('#calcOut', root); if (o) o.innerHTML = `<span class="tiny">${CALC.solve}</span><div class="big">${esc(show)}</div><code>${esc(f)}</code>`; };
  root.addEventListener('input', (e) => { const k = e.target.dataset.c; if (k) { CALC[k] = e.target.value; out(); } });
  root.addEventListener('change', (e) => { const k = e.target.dataset.c; if (k) { CALC[k] = e.target.value; out(); } });
  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-c-solve]'); if (!b) return;
    const prev = CALC.solve.toLowerCase(); const { v } = calcCompute(); // carry the last solved value into its box
    if (isFinite(v)) CALC[prev] = prev === 'rate' ? Math.round(v * Number(CALC.per || 1) * 1e6) / 1e4 : Math.round(v * 100) / 100;
    CALC.solve = b.dataset.cSolve;
    const host = b.closest('.drawer') || $('#calcHost'); if (host) { const keepHead = host.classList.contains('drawer') ? host.firstElementChild.outerHTML : ''; host.innerHTML = keepHead + calcWidget(host.classList.contains('drawer') ? 'mini' : 'full'); }
    out();
  });
  out();
}
function viewCalc() {
  afterRender = () => { bindCalc($('#calcHost')); bindHelpers(); };
  return `<section class="band tight"><div class="wrap">
    <div class="crumbs"><a href="#/">Home</a> / Calculator</div>
    <h2>Excel-style TVM calculator</h2>
    <p class="muted" style="max-width:740px">The exam lets you use a spreadsheet, so learn the functions, not shortcuts. This mirrors Excel’s <code>FV</code>, <code>PV</code>, <code>PMT</code>, <code>NPER</code> and <code>RATE</code> — including the sign convention (money you pay is negative, money you receive is positive) and <code>type</code> 1 for payments at the beginning of a period (annuity due, e.g. retirement withdrawals at the start of each year).</p>
    <div class="g2" style="grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);align-items:start;margin-top:16px" id="calcGrid">
      <div class="card" id="calcHost">${calcWidget('full')}</div>
      <div class="card">
        <span class="kicker">Quick helpers</span>
        <div class="fields" style="grid-template-columns:1fr 1fr;margin-top:10px">
          <div class="field"><label for="h_ret">Return %</label><input id="h_ret" value="8" inputmode="decimal"></div>
          <div class="field"><label for="h_inf">Inflation %</label><input id="h_inf" value="6" inputmode="decimal"></div>
        </div>
        <p class="small" id="h_real"></p>
        <hr style="border:0;border-top:1px solid var(--line);margin:14px 0">
        <div class="fields" style="grid-template-columns:1fr 1fr 1fr">
          <div class="field"><label for="h_b">Begin value</label><input id="h_b" value="100000" inputmode="decimal"></div>
          <div class="field"><label for="h_e">End value</label><input id="h_e" value="200000" inputmode="decimal"></div>
          <div class="field"><label for="h_y">Years</label><input id="h_y" value="6" inputmode="decimal"></div>
        </div>
        <p class="small" id="h_cagr"></p>
        <hr style="border:0;border-top:1px solid var(--line);margin:14px 0">
        <div class="fields" style="grid-template-columns:1fr 1fr">
          <div class="field"><label for="h_nom">Nominal rate %</label><input id="h_nom" value="12" inputmode="decimal"></div>
          <div class="field"><label for="h_m">Compounding / year</label><input id="h_m" value="4" inputmode="decimal"></div>
        </div>
        <p class="small" id="h_eff"></p>
      </div>
    </div>
    <div class="card flat" style="margin-top:18px">
      <span class="kicker">Patterns that come up again and again</span>
      <div class="scroll" style="margin-top:8px;border:0"><table class="tbl"><thead><tr><th>Question</th><th>Excel</th></tr></thead><tbody>
        <tr><td>EMI on ₹40 lakh, 9%, 20 years</td><td><code>=PMT(9%/12, 240, 4000000)</code> → −35,989</td></tr>
        <tr><td>Today’s ₹50,000 expense in 20 years at 6% inflation</td><td><code>=FV(6%, 20, , -50000)</code> → 1,60,357</td></tr>
        <tr><td>Monthly SIP for ₹1 crore in 15 years at 12%</td><td><code>=PMT(1%, 180, 0, -10000000)</code> → 20,017</td></tr>
        <tr><td>Retirement corpus: ₹10 lakh a year, rising 6%, 25 years, return 8% (start of year)</td><td><code>=PV((1.08/1.06)-1, 25, -1000000, , 1)</code> → ₹2.01 crore</td></tr>
        <tr><td>Return on a plan: pay ₹5,850 a year for 20 years, get ₹2 lakh</td><td><code>=RATE(20, -5850, 0, 200000)</code> → 5.3%</td></tr>
        <tr><td>Years to double at 9%</td><td><code>=NPER(9%, 0, -1, 2)</code> → 8.04 (rule of 72 → 8)</td></tr>
      </tbody></table></div>
    </div>
  </div></section><style>@media (max-width:900px){#calcGrid{grid-template-columns:1fr!important}}</style>`;
}
function bindHelpers() {
  const n = (id) => Number($(`#${id}`).value) || 0;
  const upd = () => {
    const rr = realRate(n('h_ret') / 100, n('h_inf') / 100);
    $('#h_real').innerHTML = `Real (inflation-adjusted) rate: <b>${(rr * 100).toFixed(4)}%</b> <code>=(1+${n('h_ret')}%)/(1+${n('h_inf')}%)-1</code>`;
    const g = cagr(n('h_b'), n('h_e'), n('h_y'));
    $('#h_cagr').innerHTML = `CAGR: <b>${isFinite(g) ? (g * 100).toFixed(3) : '—'}%</b> <code>=(${n('h_e')}/${n('h_b')})^(1/${n('h_y')})-1</code>`;
    const e = effAnnual(n('h_nom') / 100, n('h_m') || 1);
    $('#h_eff').innerHTML = `Effective annual rate: <b>${(e * 100).toFixed(4)}%</b> <code>=(1+${n('h_nom')}%/${n('h_m')})^${n('h_m')}-1</code>`;
  };
  ['h_ret', 'h_inf', 'h_b', 'h_e', 'h_y', 'h_nom', 'h_m'].forEach((id) => $(`#${id}`).addEventListener('input', upd));
  upd();
}

// ---------------- About / pattern ----------------
function viewAbout() {
  const t = (ex) => { const p = PATTERNS[ex]; const plan = mcqPlan(p); return `<div class="card"><span class="kicker">${esc(p.code)}</span><h3 style="margin:4px 0 10px">${esc(p.name)}</h3>
    <table class="tbl"><tbody><tr><td>Duration</td><td class="r">${p.minutes} minutes</td></tr><tr><td>MCQs</td><td class="r">${p.mcq} × 1 mark</td></tr>${p.caseSets.map((c) => `<tr><td>${esc(c.label)}</td><td class="r">${c.count} cases × 5 Qs</td></tr>`).join('')}<tr><td>Total</td><td class="r">${p.totalMarks} marks</td></tr><tr><td>Pass mark</td><td class="r">${p.passPct}%</td></tr><tr><td>Negative marking</td><td class="r">${p.negative * 100}% of the question’s marks</td></tr></tbody></table>
    <p class="small" style="margin-top:12px"><b>Module weights (marks):</b> ${p.modules.map((m) => `M${m.id} ${esc(m.name)} — ${m.weight}`).join('; ')}.</p>
    <p class="tiny">In our mocks the 90 MCQs split as ${p.modules.map((m) => `${plan[m.id]}`).join(' / ')}.</p></div>`; };
  afterRender = () => {
    $('#dExport')?.addEventListener('click', () => { const blob = new Blob([S.export()], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ia-exam-prep-progress.json'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); });
    $('#dImport')?.addEventListener('change', async (e) => { const f = e.target.files[0]; if (!f) return; try { S.import(await f.text()); toast('Progress restored.'); } catch { toast('That file could not be read.'); } });
    $('#dReset')?.addEventListener('click', (e) => { if (e.currentTarget.dataset.armed) { S.reset(); toast('Progress cleared.'); route(); } else { e.currentTarget.dataset.armed = '1'; e.currentTarget.textContent = 'Click again to confirm'; } });
    if (location.hash.endsWith('#data')) setTimeout(() => $('#data')?.scrollIntoView(), 0);
  };
  return `<section class="band tight"><div class="wrap">
    <div class="crumbs"><a href="#/">Home</a> / Exam pattern</div>
    <h2>Exam pattern &amp; how this site works</h2>
    <p class="muted" style="max-width:760px">Both papers are computer-based, 3 hours, 150 marks, with negative marking and a 60% pass mark; the certificate is valid for 3 years. The test centre provides a spreadsheet for calculations. Check the current pattern on the NISM website before you book.</p>
    <div class="g2" style="margin-top:18px">${t('xa')}${t('xb')}</div>
    <div class="g2" style="margin-top:18px">
      <div class="card"><span class="kicker">How the content was made</span>
        <ul class="list small"><li>Notes are original summaries of each workbook chapter; they cite section numbers so you can go back to the book.</li><li>All ${allQuestions('xa').length + allQuestions('xb').length} chapter questions and ${BANK.xa.cases.length + BANK.xb.cases.length} case studies are original and written to the workbook — nothing is copied from the workbook’s own question sets or from paid mock providers.</li><li>Every numerical answer was computed, and explanations show the working (usually as an Excel formula).</li><li>Where the workbooks disagree with each other, questions stick to the paper being tested (e.g. X-B figures for X-B).</li></ul></div>
      <div class="card" id="data"><span class="kicker">Your data</span>
        <p class="small">Progress, mistakes, flashcard grades and mock results stay in this browser only (nothing is sent anywhere). Back up to move to another device.</p>
        <div class="row">${FRAMED ? '' : '<button class="btn ghost sm" id="dExport">Download backup</button>'}<label class="btn ghost sm" style="cursor:pointer">Restore backup<input type="file" id="dImport" accept="application/json" class="sr"></label><button class="btn danger sm" id="dReset">Reset all progress</button></div></div>
    </div>
    <p class="tiny" style="margin-top:20px">Sources: NISM certification pages for Series X-A and X-B (pattern, weights, validity); NISM workbooks X-A (version September 2026) and X-B (version December 2025). Independent study aid; not affiliated with NISM or SEBI.</p>
  </div></section>`;
}

route();
