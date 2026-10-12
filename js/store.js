// Progress kept in this browser only (localStorage). Every access is guarded:
// private windows or blocked storage must never break the app.
const KEY = 'iaprep.v1';
const blank = () => ({ q: {}, mocks: [], active: null, read: {}, cards: {}, theme: null });

let state = blank();
try {
  const raw = localStorage.getItem(KEY);
  if (raw) state = { ...blank(), ...JSON.parse(raw) };
} catch { /* storage unavailable: run in memory */ }

let timer = null;
function persist() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, 150);
}
export function flush() { clearTimeout(timer); try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ } }

export const S = {
  get: () => state,
  record(qid, ok) {
    const r = (state.q[qid] ||= { n: 0, c: 0, last: 0, t: 0 });
    r.n++; if (ok) r.c++; r.last = ok ? 1 : 0; r.t = Date.now();
    persist();
  },
  stat: (qid) => state.q[qid],
  markRead(chId) { state.read[chId] = Date.now(); persist(); },
  setActive(m) { state.active = m; persist(); },
  saveMock(m) { state.mocks.unshift(m); state.mocks = state.mocks.slice(0, 25); state.active = null; flush(); },
  card(id, box) { state.cards[id] = box; persist(); },
  theme(t) { state.theme = t; persist(); },
  reset() { state = blank(); flush(); },
  export: () => JSON.stringify(state),
  import(txt) { const o = JSON.parse(txt); state = { ...blank(), ...o }; flush(); },
};
