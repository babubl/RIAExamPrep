// Mind maps: chapter maps (sections → points) and paper overview maps (modules → chapters).
// Nodes are HTML (so text wraps naturally); connectors are an SVG drawn from measured positions.

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Split a note point into a short topic label and the detail that follows it.
export function splitPoint(text) {
  const t = String(text).trim();
  const colon = t.indexOf(': ');
  if (colon > 0 && colon <= 60) return { label: t.slice(0, colon).trim(), detail: t.slice(colon + 2).trim() };
  for (const sep of [' = ', ' — ', ' → ']) {
    const i = t.indexOf(sep);
    if (i > 0 && i <= 45) return { label: t.slice(0, i).trim(), detail: (sep.trim() === '=' ? '= ' : '') + t.slice(i + sep.length).trim() };
  }
  const words = t.split(/\s+/);
  if (words.length <= 8) return { label: t.replace(/[.;]$/, ''), detail: '' };
  // Break at a natural pause inside the first ~9 words if there is one.
  const head = words.slice(0, 9).join(' ');
  const m = head.match(/^(.{12,}?)[,;]\s/);
  if (m) return { label: m[1], detail: t.slice(m[0].length) };
  return { label: words.slice(0, 6).join(' ') + '…', detail: '…' + words.slice(6).join(' ') };
}

// Shorten a section heading for a branch node: drop the trailing "(9.1–9.2)" style reference but keep it as a tag.
export function splitHeading(h) {
  const m = String(h).match(/^(.*?)\s*\(([\d.–\-, A-Za-z]+)\)\s*(.*)$/);
  if (!m) return { title: h, ref: '' };
  return { title: (m[1] + (m[3] ? ` ${m[3]}` : '')).trim(), ref: m[2] };
}

// Greedy balance of groups across two sides by weight.
function balance(groups) {
  const L = []; const R = []; let lw = 0; let rw = 0;
  groups.forEach((g) => { if (rw <= lw) { R.push(g); rw += g.w; } else { L.push(g); lw += g.w; } });
  return { L, R };
}

/**
 * groups: [{ title, ref?, leaves:[{label, detail, href?}], tone? }]
 * root: { title, sub }
 */
export function renderMap(root, groups) {
  const gs = groups.map((g, i) => ({ ...g, i, w: Math.max(1, g.leaves.length) + 1 }));
  const { L, R } = balance(gs);
  const leaf = (l, gi, li) => {
    const inner = `<b>${esc(l.label)}</b>${l.detail ? `<span>${esc(l.detail)}</span>` : ''}`;
    return l.href
      ? `<a class="mm-leaf" href="${l.href}" data-g="${gi}" id="mm-l-${gi}-${li}">${inner}</a>`
      : `<button type="button" class="mm-leaf${l.detail ? '' : ' plain'}" data-g="${gi}" id="mm-l-${gi}-${li}" aria-expanded="false">${inner}</button>`;
  };
  const group = (g, side) => `<div class="mm-group ${side}" style="--c:var(--m${(g.i % 8) + 1})" data-g="${g.i}">
      <button type="button" class="mm-branch" id="mm-b-${g.i}" aria-expanded="true" title="Show or hide these points"><span>${esc(g.title)}</span>${g.ref ? `<small>${esc(g.ref)}</small>` : ''}</button>
      <div class="mm-leaves">${g.leaves.map((l, li) => leaf(l, g.i, li)).join('')}</div>
    </div>`;
  return `<div class="mm-tools row no-print"><button type="button" class="btn ghost sm" data-mm="expand">Show all points</button><button type="button" class="btn ghost sm" data-mm="collapse">Branches only</button><span class="tiny">Tap a branch to fold it · tap a point to read it in full</span></div>
  <div class="mm-scroll"><div class="mm" id="mm">
    <svg class="mm-wires" aria-hidden="true"></svg>
    <div class="mm-side left">${L.map((g) => group(g, 'left')).join('')}</div>
    <div class="mm-root" id="mm-root"><b>${esc(root.title)}</b>${root.sub ? `<span>${esc(root.sub)}</span>` : ''}</div>
    <div class="mm-side right">${R.map((g) => group(g, 'right')).join('')}</div>
  </div></div>`;
}

export function chapterGroups(chapter) {
  const groups = chapter.sections.map((s) => {
    const { title, ref } = splitHeading(s.h);
    return { title, ref, leaves: s.pts.map(splitPoint) };
  });
  if (chapter.keys && chapter.keys.length) groups.push({ title: 'Remember for the exam', ref: 'key facts', leaves: chapter.keys.map((k) => ({ label: k, detail: '' })) });
  return groups;
}

// Draw connectors. Wide layout: curves root→branch→leaf, two-sided. Narrow layout: elbow lines down the left.
export function wire(container) {
  const mm = container.querySelector('#mm'); if (!mm) return;
  const svg = mm.querySelector('.mm-wires');
  const box = mm.getBoundingClientRect();
  svg.setAttribute('width', mm.scrollWidth); svg.setAttribute('height', mm.scrollHeight);
  svg.setAttribute('viewBox', `0 0 ${mm.scrollWidth} ${mm.scrollHeight}`);
  const rel = (el) => { const r = el.getBoundingClientRect(); return { l: r.left - box.left, r: r.right - box.left, t: r.top - box.top, b: r.bottom - box.top, cy: r.top - box.top + r.height / 2, cx: r.left - box.left + r.width / 2 }; };
  const narrow = getComputedStyle(mm).getPropertyValue('--narrow').trim() === '1';
  const root = rel(mm.querySelector('#mm-root'));
  let d = '';
  const paths = [];
  mm.querySelectorAll('.mm-group').forEach((g) => {
    const color = getComputedStyle(g).getPropertyValue('--c').trim() || 'currentColor';
    const b = rel(g.querySelector('.mm-branch'));
    const left = g.classList.contains('left');
    let p;
    if (narrow) {
      const x = root.l + 14;
      p = `M${x} ${root.b} V${b.cy} H${b.l}`;
    } else if (left) {
      const x1 = root.l; const x2 = b.r; const mx = (x1 + x2) / 2;
      p = `M${x1} ${root.cy} C${mx} ${root.cy} ${mx} ${b.cy} ${x2} ${b.cy}`;
    } else {
      const x1 = root.r; const x2 = b.l; const mx = (x1 + x2) / 2;
      p = `M${x1} ${root.cy} C${mx} ${root.cy} ${mx} ${b.cy} ${x2} ${b.cy}`;
    }
    paths.push(`<path d="${p}" stroke="${color}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);
    if (g.classList.contains('folded')) return;
    g.querySelectorAll('.mm-leaf').forEach((lf) => {
      const l = rel(lf);
      let q;
      if (narrow) { const x = b.l + 14; q = `M${x} ${b.b} V${l.cy} H${l.l}`; }
      else if (left) { const x1 = b.l; const x2 = l.r; const mx = (x1 + x2) / 2; q = `M${x1} ${b.cy} C${mx} ${b.cy} ${mx} ${l.cy} ${x2} ${l.cy}`; }
      else { const x1 = b.r; const x2 = l.l; const mx = (x1 + x2) / 2; q = `M${x1} ${b.cy} C${mx} ${b.cy} ${mx} ${l.cy} ${x2} ${l.cy}`; }
      paths.push(`<path d="${q}" stroke="${color}" stroke-opacity=".55" stroke-width="1.5" fill="none"/>`);
    });
  });
  svg.innerHTML = d + paths.join('');
}

export function bindMap(container) {
  const redraw = () => requestAnimationFrame(() => wire(container));
  container.addEventListener('click', (e) => {
    const br = e.target.closest('.mm-branch');
    if (br) { const g = br.closest('.mm-group'); const f = g.classList.toggle('folded'); br.setAttribute('aria-expanded', String(!f)); redraw(); return; }
    const lf = e.target.closest('button.mm-leaf');
    if (lf && !lf.classList.contains('plain')) { const o = lf.classList.toggle('open'); lf.setAttribute('aria-expanded', String(o)); redraw(); return; }
    const t = e.target.closest('[data-mm]');
    if (t) {
      const fold = t.dataset.mm === 'collapse';
      container.querySelectorAll('.mm-group').forEach((g) => { g.classList.toggle('folded', fold); g.querySelector('.mm-branch').setAttribute('aria-expanded', String(!fold)); });
      redraw();
    }
  });
  const ro = new ResizeObserver(redraw);
  const mm = container.querySelector('#mm'); if (mm) ro.observe(mm);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
  redraw();
  return () => ro.disconnect();
}
