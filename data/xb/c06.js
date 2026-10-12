// NISM X-B, Chapter 6 — Miscellaneous Aspects of Retirement Planning (Dec 2025, §6.1–6.4)
export default {
  id: 'xb6', exam: 'xb', ch: 6, module: 8,
  title: 'Miscellaneous Aspects of Retirement Planning',
  sections: [
    { h: 'Adviser’s role (6.1)', pts: [
      'Pull together assets, pensions, part-time work, home equity into reliable monthly income; needs knowledge of taxes, employer benefits and plan rules.',
      'Advise on: timing of employer benefits; pension distribution choices; suitability of annuities; expected retirement income; safe withdrawal rate; how much in guaranteed investments; taxable income from investments and restructuring to reduce tax; paying off the mortgage; reverse mortgage; keeping or dropping life insurance.',
      'No recommendation before understanding time horizon, experience, goals, risk tolerance, need for guaranteed income and all resources.',
    ]},
    { h: 'Calculations (6.2)', pts: [
      'Inflation: ₹10,000 a month today at 7% → about ₹54,274 a month in 25 years.',
      'Retirement expenses are often 50–60% of current expenses if there are no liabilities, but medical costs rise. Plan for longevity beyond 80.',
      'Book corpus example (age 35 → 60, life to 85, inflation 7% pre-retirement, 6% post, return 8%): retirement expense of 60% of current, inflated 25 years (e.g. ₹9,000 → ₹48,847); corpus = PV at real rate 1.89%/12 for 300 months → ₹1.17 crore; ₹15,000 → ₹1.95 crore; ₹24,000 → ₹3.11 crore.',
      'Cost of delay (corpus ₹1.18 crore, 12% return): start at 30 → ₹3,376 a month; at 35 → ₹6,280; at 40 → ₹11,928.',
      'Step-up: increase contributions yearly (EPF max, VPF at 50+, NPS any amount, step-up SIPs). Mr. A needs ₹20,217 a month flat for ₹2 crore in 20 years at 12%; with a 7% annual step-up he can start much lower (about ₹12,760).',
      'Rule of thumb in the book: if income rises 10%, step up SIP by at least 5–7%.',
      'Pre-retirement withdrawals hurt: ₹75,000 withdrawn from EPF 30 years before retirement at 8.5% = ~₹8.66 lakh lost.',
      'Transfer, don’t withdraw, on job change: EPF via UAN (12-digit, lifelong) keeps service continuity, avoids tax on withdrawals before 5 years and preserves compounding; old EPF earns interest till 58. NPS: one PRAN moves with you or continues under All Citizen model.',
    ]},
    { h: 'Evaluating products by stage (6.3)', pts: [
      'Pre-retirement (15–20 years away): accumulate; higher risk appetite; evaluate on cost, return (beat inflation), risk, tax efficiency. EPF, NPS, PPF, suitable MFs. Income products not viable.',
      'Retirement: two baskets — income (must beat inflation and protect capital) and growth (10–15 year horizon; PPF, certain MFs; EPF/NPS no longer available).',
      'Post-retirement (75+): income with capital protection, low risk; liquidity and legacy for heirs.',
    ]},
    { h: 'Philanthropy (6.4)', pts: [
      'Giving is spreading beyond the wealthy; advisers can strengthen relationships by discussing values.',
      'Steps: start the conversation naturally; time it right (liquidity event such as sale of business or inheritance, drafting/revisiting a will, life events like retirement/marriage/births, annual review); follow up with resources and next steps.',
    ]},
  ],
  keys: [
    'Corpus = PV(real rate, years in retirement, expense at retirement)',
    'Delay multiplies required savings',
    'Transfer EPF on job change (UAN)',
  ],
  qs: [
    { q: 'Growth-oriented investments are most suitable for which stage of retirement savings?', o: ['Accumulation', 'Distribution', 'Income', 'Post-retirement (75+)'], a: 0, e: 'Long horizon allows riding out volatility.', ref: '6.3' },
    { q: 'Inflation does which of the following to retirement planning?', o: ['Reduces periodic savings needed', 'Reduces nominal return', 'Increases the retirement corpus required', 'Increases value of the corpus created'], a: 2, e: 'Higher future expenses → larger corpus.', ref: '6.2' },
    { q: 'Which is a solution when the retirement corpus is inadequate close to retirement?', o: ['Invest in riskier assets', 'Postpone retirement', 'Reduce periodic savings', 'Increase corpus target'], a: 1, e: 'Working longer (or cutting lifestyle) is the practical fix close to retirement.', ref: '6.2' },
    { q: 'Life expectancy directly affects:', o: ['Period in retirement', 'Monthly expenses in retirement', 'Remaining working years', 'Returns on corpus'], a: 0, e: 'Longevity determines how long the corpus must last.', ref: '4.3, 6.2' },
    { q: 'A person needs a ₹1.18 crore corpus at 60 and expects 12% returns. Starting a monthly SIP at 40 instead of 30 raises the required SIP from about ₹3,376 to:', o: ['₹6,280', '₹8,500', '₹11,928', '₹15,000'], a: 2, e: '=PMT(1%, 240, 0, −1.18 crore) ≈ ₹11,928 vs ₹3,376 over 360 months.', t: 'calc', ref: '6.2' },
    { q: 'To accumulate ₹2 crore in 20 years at 12% (1% a month), the flat monthly saving needed is about:', o: ['₹12,760', '₹16,500', '₹20,217', '₹27,000'], a: 2, e: '=PMT(0.01, 240, 0, −2,00,00,000) = ₹20,217.', t: 'calc', ref: '6.2' },
    { q: 'For the same ₹2 crore goal, stepping up contributions by 7% every year allows a starting monthly amount of roughly:', o: ['₹20,217', '₹12,760', '₹7,000', '₹25,000'], a: 1, e: 'Starting around ₹12,760 and increasing 7% yearly reaches ₹2 crore — lower start, rising with income.', t: 'calc', d: 3, ref: '6.2' },
    { q: 'Mr. E withdraws ₹75,000 from EPF with 30 years left to retirement. At 8.5% a year, the corpus he gives up is about:', o: ['₹2.25 lakh', '₹5.4 lakh', '₹8.66 lakh', '₹12 lakh'], a: 2, e: '75,000 × 1.085^30 ≈ ₹8.67 lakh.', t: 'calc', ref: '6.2' },
    { q: 'Monthly expenses of ₹50,000 today, retirement in 20 years, inflation 6%. Expense at retirement and the corpus needed for 25 years at a real rate of 1.89% p.a. (monthly, end of period) are closest to:', o: ['₹1.60 lakh; ₹3.83 crore', '₹1.07 lakh; ₹2.5 crore', '₹1.60 lakh; ₹4.8 crore', '₹2.14 lakh; ₹5 crore'], a: 0, e: '50,000 × 1.06^20 ≈ ₹1,60,357; PV(1.89%/12, 300, −1,60,357) ≈ ₹3.83 crore.', t: 'calc', d: 3, ref: '6.2' },
    { q: 'The Universal Account Number (UAN) for EPF is:', o: ['A 10-digit number changing with each employer', 'A 12-digit number that stays the same for life', 'The PRAN', 'The PAN'], a: 1, e: 'UAN is 12 digits and constant across employers.', ref: '6.2' },
    { q: 'Why should an employee transfer, rather than withdraw, EPF on changing jobs within 5 years?', o: ['Withdrawal is not allowed', 'Withdrawal before 5 years of service is taxable; transfer keeps service continuity and compounding', 'Transfer earns higher interest', 'Transfer is mandatory'], a: 1, e: 'Transfer counts the old service and avoids tax.', ref: '6.2' },
    { q: 'For the INCOME basket in the retirement phase, the two key evaluation criteria are:', o: ['Cost and return', 'Beating inflation and capital protection', 'Liquidity and tax only', 'Highest return and leverage'], a: 1, e: 'Income must beat inflation; capital must be protected.', ref: '6.3' },
    { q: 'In the post-retirement phase (beyond 75), the primary objective is:', o: ['Aggressive growth', 'Income with capital protection and liquidity for heirs', 'Leverage', 'Tax harvesting'], a: 1, e: 'Low risk income and legacy/liquidity.', ref: '6.3' },
    { q: 'Statement I: Pre-retirement product choice should weigh cost, return, risk and tax efficiency. Statement II: Income-generating products are ideal in the pre-retirement accumulation phase.', o: ['Only I is true', 'Only II is true', 'Both are true', 'Both are false'], a: 0, e: 'Income products are not viable for accumulation.', t: 'multi', ref: '6.3' },
    { q: 'Which is NOT listed as a natural moment to raise philanthropy with a client?', o: ['Sale of a business', 'Drafting a will', 'Birth of a grandchild', 'A market crash'], a: 3, e: 'Liquidity events, will drafting, life events and annual reviews are suggested.', ref: '6.4' },
  ],
};
