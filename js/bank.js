// Question bank: imports every chapter and case file and assigns stable ids.
import xa01 from '../data/xa/c01.js';
import xa02 from '../data/xa/c02.js';
import xa03 from '../data/xa/c03.js';
import xa04 from '../data/xa/c04.js';
import xa05 from '../data/xa/c05.js';
import xa06 from '../data/xa/c06.js';
import xa07 from '../data/xa/c07.js';
import xa08 from '../data/xa/c08.js';
import xa09 from '../data/xa/c09.js';
import xa10 from '../data/xa/c10.js';
import xa11 from '../data/xa/c11.js';
import xa12 from '../data/xa/c12.js';
import xa13 from '../data/xa/c13.js';
import xa14 from '../data/xa/c14.js';
import xa15 from '../data/xa/c15.js';
import xa16 from '../data/xa/c16.js';
import xa17 from '../data/xa/c17.js';
import xa18 from '../data/xa/c18.js';
import xa19 from '../data/xa/c19.js';
import xa20 from '../data/xa/c20.js';
import xaCases from '../data/xa/cases.js';
import xaDrills from '../data/xa/drills.js';
import xb01 from '../data/xb/c01.js';
import xb02 from '../data/xb/c02.js';
import xb03 from '../data/xb/c03.js';
import xb04 from '../data/xb/c04.js';
import xb05 from '../data/xb/c05.js';
import xb06 from '../data/xb/c06.js';
import xb07 from '../data/xb/c07.js';
import xb08 from '../data/xb/c08.js';
import xb09 from '../data/xb/c09.js';
import xb10 from '../data/xb/c10.js';
import xb11 from '../data/xb/c11.js';
import xb12 from '../data/xb/c12.js';
import xb13 from '../data/xb/c13.js';
import xb14 from '../data/xb/c14.js';
import xb15 from '../data/xb/c15.js';
import xb16 from '../data/xb/c16.js';
import xb17 from '../data/xb/c17.js';
import xb18 from '../data/xb/c18.js';
import xb19 from '../data/xb/c19.js';
import xb20 from '../data/xb/c20.js';
import xbCases from '../data/xb/cases.js';
import xbDrills from '../data/xb/drills.js';

// Questions that hinge on a negative word are "tweak" questions even if not tagged.
const NEG = /\b(NOT|EXCEPT|CANNOT|incorrect|false|FALSE|LESS)\b/;
function prep(list, cases, drills) {
  const chapters = list.map((c) => {
    const extra = drills.filter((d) => d.ch === c.ch).map(({ ch, ...q }) => q);
    const qs = [...c.qs, ...extra].map((q, i) => ({ ...q, t: q.t || (NEG.test(q.q) ? 'trap' : undefined), id: `${c.id}-${i + 1}` }));
    return { ...c, qs };
  });
  return { chapters, cases };
}

export const BANK = {
  xa: prep([xa01, xa02, xa03, xa04, xa05, xa06, xa07, xa08, xa09, xa10, xa11, xa12, xa13, xa14, xa15, xa16, xa17, xa18, xa19, xa20], xaCases, xaDrills),
  xb: prep([xb01, xb02, xb03, xb04, xb05, xb06, xb07, xb08, xb09, xb10, xb11, xb12, xb13, xb14, xb15, xb16, xb17, xb18, xb19, xb20], xbCases, xbDrills),
};

const QINDEX = new Map();
for (const ex of Object.keys(BANK)) {
  for (const c of BANK[ex].chapters) for (const q of c.qs) QINDEX.set(q.id, { q, chapter: c, exam: ex });
  for (const cs of BANK[ex].cases) cs.qs.forEach((q, i) => QINDEX.set(`${cs.id}-${i}`, { q, case: cs, exam: ex }));
}
export const lookup = (id) => QINDEX.get(id);
export const chapter = (ex, ch) => BANK[ex].chapters.find((c) => c.ch === Number(ch));
export const caseById = (ex, id) => BANK[ex].cases.find((c) => c.id === id);
export const allQuestions = (ex) => BANK[ex].chapters.flatMap((c) => c.qs.map((q) => ({ q, chapter: c })));
