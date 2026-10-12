// NISM X-B, Chapter 20 — Case Studies (Dec 2025, §20.1–20.4 + practice cases)
// Notes summarise the WORKING STYLE of the workbook cases; questions are original.
export default {
  id: 'xb20', exam: 'xb', ch: 20, module: 12,
  title: 'Case Studies — Comprehensive Advice',
  sections: [
    { h: 'How the exam cases work (20)', pts: [
      'Cases combine insurance, retirement, tax, estate and investment topics. Be comfortable with Excel: FV, PV, PMT, RATE, NPER (and annuity-due type = 1).',
      'Typical retirement chain: today’s expense → FV at inflation to retirement → real rate = (1 + return)/(1 + inflation) − 1 → corpus = PV(real rate, years in retirement, −first-year expense, , 1) when expenses are drawn at the start of each year.',
      'Book Case 1 (Mr. Z): ₹40,000 a month at 10% inflation for 8 years → ₹10.29 lakh a year; real return (11%/10%) 0.91%; 15-year corpus (annuity due) ≈ ₹1.45 crore. Retirement corpus built from growing contributions is the sum of FVs of each year’s contribution.',
      'Goal funding with a corpus (Case 2): inflate each goal; money set aside for later instalments = PV at the parking rate; roll the remaining corpus forward year by year, subtracting outflows.',
      'Returning NRIs (Case 3): once ROR, foreign rental income is taxable in India with credit for foreign tax (DTAA); Sec 89A retirement accounts in notified countries taxed on withdrawal; existing foreign life policies can be continued (premium from foreign income or remitted); keep global health cover but also start an Indian policy to build claim-free history.',
      'Retirees (Case 4): PV of the growing shortfall between expenses and a partly-indexed pension; compare with the corpus to find the return the corpus must earn. SCSS is the highest-yielding government fixed-income option (up to ₹30 lakh).',
    ]},
    { h: 'Practice-case techniques', pts: [
      'Needs-based life cover: PV of family expenses at real rate + loans + goal corpus − existing cover (book: Adil needs ≈ ₹58 lakh more).',
      'Return on the investment part of an insurance plan: =RATE(n, −(premium − term cost), , maturity) (book: ≈ 5.3%).',
      'Income replacement cover (HLV-style): PV of income at inflation-adjusted return − existing cover (book: Charu ≈ ₹56 lakh more).',
      'Top-up vs super top-up: top-up deductible applies per claim; super top-up on aggregate claims (book: Esther pays ₹6 lakh out of pocket with a top-up, Fahad nil with a super top-up).',
      'Deductible first, then co-pay on the remainder (book: claim ₹50,000, deductible ₹10,000, co-pay 5% → ₹38,000).',
      'A will operates only on death; a registered will is not proof of present ownership; for immediate needs the owner redeems and gifts (tax-free to a relative).',
      'Long-horizon goals funded by a senior (e.g. grandchild’s education) can still use equity — horizon of the goal matters, not the age of the investor.',
      'Leverage: return on own funds = (asset return × total investment − interest) ÷ own funds; leverage magnifies gains and losses.',
    ]},
  ],
  keys: [
    '=FV(rate, n, , −PV) · =PV(rate, n, −PMT, , 1) for annuity due',
    '=PMT(rate, n, 0, −FV) for SIP · =RATE(n, pmt, pv, fv)',
    'Real rate = (1+r)/(1+i) − 1',
    'Claim payout = (claim − deductible) × (1 − co-pay)',
  ],
  qs: [
    { q: 'EMI for a loan is computed in Excel using:', o: ['PV', 'NPV', 'EMI', 'PMT'], a: 3, e: '=PMT(rate, nper, pv).', ref: '20 module-end' },
    { q: 'Which allocation decision depends on market views?', o: ['Strategic', 'Tactical', 'Risk profile', 'None'], a: 1, e: 'Tactical calls are market-driven.', ref: '18.3, 20' },
    { q: 'Expenses ₹40,000 a month; inflation 10%; retirement in 8 years. First-year retirement expense is about:', o: ['₹8.57 lakh', '₹10.29 lakh', '₹9.60 lakh', '₹11.32 lakh'], a: 1, e: '=FV(10%, 8, , −4,80,000) ≈ ₹10,28,923.', t: 'calc', ref: '20.1' },
    { q: 'Post-retirement return 11% and inflation 10% give a real return of about:', o: ['1%', '0.91%', '1.1%', '0.5%'], a: 1, e: '1.11/1.10 − 1 = 0.909%.', t: 'calc', ref: '20.1' },
    { q: 'Using the two figures above, the corpus for 15 years with expenses at the START of each year is about:', o: ['₹1.39 crore', '₹1.45 crore', '₹1.52 crore', '₹1.54 crore'], a: 1, e: '=PV(0.91%, 15, −10,28,923, , 1) ≈ ₹1.45 crore.', t: 'calc', d: 3, ref: '20.1' },
    { q: 'A plan costs ₹6,000 a year for 20 years and pays ₹2 lakh at maturity; equivalent term cover costs ₹150 a year. The return on the investment portion is about:', o: ['1.7%', '3.6%', '5.3%', '6.1%'], a: 2, e: '=RATE(20, −5,850, 0, 2,00,000) ≈ 5.3%.', t: 'calc', ref: 'Practice Q2' },
    { q: 'Monthly income ₹50,000, 25 working years left, inflation 6%, return 10%, existing cover ₹40 lakh. Additional life cover needed is about:', o: ['₹47 lakh', '₹56 lakh', '₹64 lakh', '₹72 lakh'], a: 1, e: 'Real 3.77%; =PV(3.77%, 25, −6,00,000) ≈ ₹96 lakh − 40 = ₹56 lakh.', t: 'calc', d: 3, ref: 'Practice Q3' },
    { q: 'Base policy ₹3 lakh + top-up ₹10 lakh (deductible ₹5 lakh). A single bill of ₹4 lakh. Out-of-pocket:', o: ['Nil', '₹1 lakh', '₹2 lakh', '₹4 lakh'], a: 1, e: 'Base pays ₹3 lakh; top-up threshold not crossed.', t: 'calc', ref: 'Practice Q4' },
    { q: 'Property claim ₹50,000; deductible ₹10,000; co-pay 5%. Insurer pays:', o: ['₹37,500', '₹38,000', '₹40,000', '₹47,500'], a: 1, e: '(50,000 − 10,000) × 95% = ₹38,000.', t: 'calc', ref: 'Practice Q7' },
    { q: 'A son wants a bank loan on his mother’s house, citing her registered will in his favour. This is:', o: ['Valid — the will is registered', 'Valid — he is a Class I heir', 'Not valid — a will takes effect only on death and can be changed', 'Valid with sisters’ NOC'], a: 2, e: 'No present title passes under a will.', t: 'trap', ref: 'Practice Q10' },
    { q: 'A 68-year-old wants to build a corpus for a 5-year-old grandchild’s college. Most suitable:', o: ['Arbitrage fund', 'Short-term debt fund', 'Large & mid-cap equity fund', 'Target maturity debt fund'], a: 2, e: 'The goal is 12+ years away; horizon, not age, drives allocation.', ref: 'Practice Q10' },
    { q: 'Ms. T invests ₹10 lakh in an asset yielding 12%, using ₹4 lakh borrowed at 9%. Her return on own funds is:', o: ['12%', '14%', '10.2%', '21%'], a: 1, e: 'Income 1,20,000 − interest 36,000 = 84,000 ÷ own 6,00,000 = 14%.', t: 'calc', ref: '20 module-end' },
  ],
};
