# IA Exam Prep — NISM Series X-A & X-B

A free, static study site for the NISM **Investment Adviser** certifications:

- **X-A (Level 1)** and **X-B (Level 2)** — 40 chapter notes, ~960 original practice questions and 30 original case studies.
- Drills for what makes these papers hard: **statement (I/II) questions**, **one-word “tweak” questions** and **Excel-style numericals**.
- **Full mocks in the official pattern**: 90 MCQs drawn by module weight + caselets (X-A: 6 × 1-mark and 3 × 2-mark caselets; X-B: 6 × 2-mark cases) = 150 marks, 3-hour timer, question palette, mark-for-review, 25% negative marking, 60% pass mark, module-wise result and full answer review.
- **Mind maps** for every chapter (topics as branches, rules and limits as points) and a syllabus map per paper.
- Flashcards, a formula & facts sheet per paper, “my mistakes” drill, and an **Excel-compatible TVM calculator** (FV, PV, PMT, NPER, RATE with the same sign convention and `type`).
- Progress is stored only in the browser (with backup/restore).

## Sources and content policy

Notes are original summaries written against the official workbooks — X-A version September 2026 and X-B version December 2025 (tax per Finance Act 2025) — with section references for every question. Nothing is reproduced from the workbooks’ own question sets or from paid mock providers. Exam pattern, module weights and validity are from the NISM certification pages. This project is not affiliated with NISM or SEBI.

## Run locally

```sh
python3 -m http.server 8000   # then open http://localhost:8000
node --test tests/*.test.mjs  # bank integrity, exam pattern, scoring, TVM maths
```

## Structure

```
index.html          styles + shell (CBT-style design, self-hosted IBM Plex fonts)
js/engine.js        exam patterns, mock builder, scoring, option shuffling, TVM maths (pure, tested)
js/bank.js          loads chapters, drills and cases; assigns stable question ids
js/store.js         localStorage progress (guarded)
js/app.js           hash router and all views
js/mindmap.js       chapter and syllabus mind maps (HTML nodes + SVG connectors)
data/xa, data/xb    c01–c20 chapter notes + questions, drills.js, cases.js
tests/              node:test suites
```

Question schema: `{ q, o: [4 options], a: index, e: explanation, t?: 'multi'|'calc'|'trap', d?: 3, ref }`.

Deployment: GitHub Actions runs the tests and publishes the repository root to GitHub Pages on every push to `main`.
