// NISM X-A — original caselets in the exam style (each case has 5 questions).
// Figures are computed; explanations show the working. Workbook sections are cited in `ref`.
export default [
  {
    id: 'xa-c1', title: 'The Kumar household budget', ch: [3], w: 1,
    text: 'Vikram Kumar (38) earns a gross monthly salary of ₹1,80,000. His employee PF contribution of ₹9,000 and income tax of ₹20,000 are deducted every month. His home-loan EMI is ₹45,000, essential living expenses ₹60,000 and discretionary expenses ₹25,000 a month. Assets: savings account ₹3 lakh, FD maturing in 2 months ₹2 lakh, liquid fund ₹4 lakh, equity mutual funds ₹12 lakh, PPF ₹6 lakh, house (self-occupied) ₹90 lakh and car ₹6 lakh. Home loan outstanding is ₹50 lakh.',
    qs: [
      { q: 'What is Vikram’s monthly surplus in hand?', o: ['₹30,000', '₹21,000', '₹50,000', '₹11,000'], a: 1, e: '1,80,000 − 9,000 (PF) − 20,000 (tax) − 1,30,000 (EMI + living + discretionary) = ₹21,000.', ref: '3.2' },
      { q: 'Counting his PF contribution as saving, his savings ratio is closest to:', o: ['11.7%', '16.7%', '25.0%', '27.8%'], a: 1, e: 'Savings = surplus 21,000 + PF 9,000 = 30,000; ÷ 1,80,000 = 16.7%.', ref: '3.2, 3.9.1' },
      { q: 'His debt-to-income ratio and its interpretation:', o: ['25% — within the acceptable range', '45% — excessive', '25% — excessive', '35% — at the limit'], a: 0, e: '45,000 ÷ 1,80,000 = 25%; above 35–40% would be excessive.', ref: '3.9.10' },
      { q: 'Taking monthly expenses including EMI, his liquidity ratio is about:', o: ['2.3 — inadequate', '6.9 — comfortable', '16.2 — excessive', '4.0 — borderline'], a: 1, e: 'Liquid assets = 3 + 2 + 4 = ₹9 lakh (equity MF and PPF excluded). Monthly expenses = 1,30,000. 9,00,000 ÷ 1,30,000 = 6.9.', ref: '3.9.8' },
      { q: 'His leverage ratio (total liabilities ÷ total assets) is closest to:', o: ['55.6%', '40.7%', '59.3%', '25.0%'], a: 1, e: 'Total assets = 3 + 2 + 4 + 12 + 6 + 90 + 6 = ₹123 lakh; liabilities ₹50 lakh → 40.7% (solvency 59.3%).', ref: '3.9.4' },
    ],
  },
  {
    id: 'xa-c2', title: 'Ramesh weighs his loans', ch: [2, 4], w: 2,
    text: 'Ramesh has just taken a home loan of ₹40 lakh at 9% p.a. for 20 years with monthly rests and EMIs at month-end. Another bank offers to refinance it at 8% for the same tenure with no charges. He also carries a revolving credit-card balance of ₹1.5 lakh charged at 3.5% per month, and a car loan at 10.5%.',
    qs: [
      { q: 'His current EMI is closest to:', o: ['₹30,000', '₹35,989', '₹33,458', '₹38,500'], a: 1, e: '=PMT(0.09/12, 240, −40,00,000) = ₹35,989.', t: 'calc', ref: '2.2.4' },
      { q: 'In the first EMI, the interest and principal components are about:', o: ['Interest ₹30,000; principal ₹5,989', 'Interest ₹5,989; principal ₹30,000', 'Interest ₹18,000; principal ₹17,989', 'Interest ₹35,989; principal nil'], a: 0, e: 'IPMT for period 1 = 40,00,000 × 0.75% = ₹30,000; PPMT = 35,989 − 30,000 = ₹5,989.', t: 'calc', ref: '4.11' },
      { q: 'If he refinances at 8% for 20 years, his EMI falls by about:', o: ['₹1,000', '₹2,531', '₹4,000', '₹6,000'], a: 1, e: 'New EMI =PMT(0.08/12, 240, −40,00,000) = ₹33,458; saving ≈ ₹2,531 a month.', t: 'calc', ref: '4.7.7' },
      { q: 'If after refinancing at 8% he keeps paying ₹35,989, the loan will be repaid in about:', o: ['240 months', '203 months', '180 months', '160 months'], a: 1, e: '=NPER(0.08/12, −35,989, 40,00,000) ≈ 203 months (~17 years).', t: 'calc', ref: '2.2.5, 4.13' },
      { q: 'The effective annual cost of his credit-card balance and the correct priority are:', o: ['42% — repay after the home loan', '51.1% — repay first (avalanche)', '35% — ignore', '51.1% — repay after the car loan'], a: 1, e: '(1.035)^12 − 1 = 51.1%. Avalanche: clear the costliest debt first.', t: 'calc', ref: '4.3.2, 4.15' },
    ],
  },
  {
    id: 'xa-c3', title: 'Funding Ananya’s education', ch: [2], w: 2,
    text: 'An engineering degree costs ₹15 lakh today. Ananya will join in 10 years. Education inflation is expected at 8% a year and the parents expect a 12% return on investments. Four years ago they invested ₹1.2 lakh for this goal; it is worth ₹2 lakh today.',
    qs: [
      { q: 'The expected cost of the degree after 10 years is closest to:', o: ['₹27.0 lakh', '₹32.4 lakh', '₹46.6 lakh', '₹21.0 lakh'], a: 1, e: '15,00,000 × 1.08^10 = ₹32.38 lakh.', t: 'calc', ref: '2.2.2' },
      { q: 'Ignoring the existing investment, the lump sum needed today is about:', o: ['₹10.4 lakh', ' ₹15.0 lakh', '₹12.8 lakh', '₹8.2 lakh'], a: 0, e: 'PV = 32.38 lakh ÷ 1.12^10 = ₹10.43 lakh.', t: 'calc', ref: '2.2.1' },
      { q: 'Ignoring the existing investment, the monthly SIP (at month-end, 1% per month for 120 months) needed is about:', o: ['₹10,500', '₹14,078', '₹18,900', '₹26,985'], a: 1, e: '=PMT(0.01, 120, 0, −32,38,387) = ₹14,078.', t: 'calc', ref: '2.2.4' },
      { q: 'The CAGR earned on the existing investment is closest to:', o: ['16.7%', '13.6%', '10.8%', '12.0%'], a: 1, e: '(2/1.2)^(1/4) − 1 = 13.6%.', t: 'calc', ref: '2.2.3' },
      { q: 'If the ₹2 lakh grows at 12% a year for 10 years, the remaining gap to the goal is about:', o: ['₹30.4 lakh', '₹26.2 lakh', '₹20.0 lakh', '₹6.2 lakh'], a: 1, e: '2,00,000 × 1.12^10 = ₹6.21 lakh; gap = 32.38 − 6.21 = ₹26.17 lakh.', t: 'calc', ref: '2.2.2' },
    ],
  },
  {
    id: 'xa-c4', title: 'Meera’s corporate bond', ch: [9], w: 2,
    text: 'Meera is evaluating a corporate bond with face value ₹100, an 8% annual coupon and exactly 5 years to maturity. Comparable bonds currently yield 7%.',
    qs: [
      { q: 'The fair price of the bond is closest to:', o: ['₹100.00', '₹104.10', '₹108.42', '₹96.01'], a: 1, e: 'PV of 8 for 5 years + 100 at 7% = ₹104.10.', t: 'calc', ref: '9.4.2' },
      { q: 'At that price, the current yield is about:', o: ['8.00%', '7.68%', '7.00%', '8.33%'], a: 1, e: '8 ÷ 104.10 = 7.68%.', t: 'calc', ref: '9.5.1' },
      { q: 'Which relationship holds for this bond?', o: ['CR = CY = YTM', 'CR > CY > YTM', 'CR < CY < YTM', 'CY > CR > YTM'], a: 1, e: 'It trades at a premium: 8% > 7.68% > 7%.', ref: '9.4.3' },
      { q: 'Its Macaulay duration is 4.33 years. The modified duration is closest to:', o: ['4.33', '4.04', '4.63', '3.60'], a: 1, e: '4.33 ÷ 1.07 = 4.04.', t: 'calc', ref: '9.7' },
      { q: 'If yields rise by 1 percentage point, the approximate % change in price is:', o: ['+4.0%', '−4.0%', '−1.0%', '−8.0%'], a: 1, e: 'ΔP ≈ −MD × Δy = −4.04 × 1% ≈ −4.0%. (Actual price at 8% is ₹100.)', t: 'calc', ref: '9.7' },
    ],
  },
  {
    id: 'xa-c5', title: 'Valuing Sunrise Ltd', ch: [8], w: 1,
    text: 'Sunrise Ltd trades at ₹800. Trailing EPS is ₹40 and analysts expect EPS to grow at 25% a year. It pays a dividend of ₹12 per share. Market cap is ₹8,000 crore, debt ₹2,000 crore, surplus cash ₹500 crore and EBITDA ₹1,250 crore. The industry P/E is 24.',
    qs: [
      { q: 'Sunrise’s P/E and the relative-valuation view:', o: ['20; undervalued vs industry', '20; overvalued vs industry', '32; overvalued', '0.05; undervalued'], a: 0, e: '800 ÷ 40 = 20, below the industry’s 24.', t: 'calc', ref: '8.5.5.1' },
      { q: 'Its PEG ratio and interpretation:', o: ['1.25 — overvalued', '0.8 — undervalued given growth', '0.8 — overvalued', '1.0 — fair'], a: 1, e: 'PEG = 20 ÷ 25 = 0.8 (< 1).', t: 'calc', ref: '8.5.5.4' },
      { q: 'The dividend yield is:', o: ['1.5%', '3.0%', '30%', '5%'], a: 0, e: '12 ÷ 800 = 1.5%. (Payout ratio is 12 ÷ 40 = 30%.)', t: 'calc', ref: '8.5.5.8' },
      { q: 'Its EV/EBITDA multiple is:', o: ['6.4x', '7.6x', '8.0x', '8.4x'], a: 1, e: 'EV = 8,000 + 2,000 − 500 = 9,500; ÷ 1,250 = 7.6x.', t: 'calc', ref: '8.5.5.6' },
      { q: 'If the price rises sharply with no change in dividend, the dividend yield will:', o: ['Rise', 'Fall', 'Stay the same', 'Become negative'], a: 1, e: 'Yield = DPS ÷ price; a higher denominator lowers the yield.', ref: '8.5.5.8' },
    ],
  },
  {
    id: 'xa-c6', title: 'Comparing two equity funds', ch: [16], w: 2,
    text: 'An adviser compares two diversified equity funds over the same period. Fund A: return 16%, standard deviation 18%, beta 1.2. Fund B: return 13%, standard deviation 10%, beta 0.8. Risk-free rate 6%; market (benchmark) return 12%.',
    qs: [
      { q: 'Sharpe ratios of A and B are:', o: ['0.56 and 0.70', '0.89 and 1.30', '8.33 and 8.75', '0.70 and 0.56'], a: 0, e: 'A: (16 − 6)/18 = 0.56; B: (13 − 6)/10 = 0.70.', t: 'calc', ref: '16.4.1' },
      { q: 'Treynor ratios (in % per unit beta) of A and B are:', o: ['8.33 and 8.75', '13.3 and 16.25', '10 and 7', '0.56 and 0.70'], a: 0, e: 'A: 10/1.2 = 8.33; B: 7/0.8 = 8.75.', t: 'calc', ref: '16.4.2' },
      { q: 'Jensen’s alpha of Fund A is:', o: ['4.0%', '2.8%', '1.6%', '−0.8%'], a: 1, e: 'Required = 6 + 1.2 × (12 − 6) = 13.2%; alpha = 16 − 13.2 = 2.8%.', t: 'calc', ref: '16.2.9' },
      { q: 'For a client whose overall wealth is NOT well diversified, which fund looks better on the appropriate measure?', o: ['Fund A, on Treynor', 'Fund B, on Sharpe', 'Fund A, on raw return', 'Both equal'], a: 1, e: 'Use Sharpe (total risk) for poorly diversified investors; B has the higher Sharpe.', ref: '16.4.3' },
      { q: 'Fund A beat its benchmark by 4% a year with a tracking error of 5%. Its information ratio is:', o: ['0.8', '1.25', '0.2', '4.0'], a: 0, e: 'IR = 4 ÷ 5 = 0.8.', t: 'calc', ref: '16.4.5' },
    ],
  },
  {
    id: 'xa-c7', title: 'Two-fund portfolio for Neha', ch: [14, 16], w: 2,
    text: 'Neha will put 70% in an equity fund (expected return 14%, standard deviation 20%) and 30% in a debt fund (expected return 7%, standard deviation 6%). The correlation between them is 0.2.',
    qs: [
      { q: 'The portfolio’s expected return is:', o: ['10.5%', '11.9%', '12.6%', '14.0%'], a: 1, e: '0.7 × 14 + 0.3 × 7 = 11.9%.', t: 'calc', ref: '14.4' },
      { q: 'The portfolio standard deviation is closest to:', o: ['15.8%', '14.5%', '12.2%', '16.5%'], a: 1, e: 'Var = (0.7×20)² + (0.3×6)² + 2×0.7×0.3×0.2×20×6 = 196 + 3.24 + 10.08 = 209.32 → SD 14.47%.', t: 'calc', d: 3, ref: '14.4' },
      { q: 'If the correlation were +1, the standard deviation would be:', o: ['14.5%', '15.8%', '13.0%', '20.0%'], a: 1, e: 'Weighted average: 0.7×20 + 0.3×6 = 15.8% — no diversification benefit.', t: 'calc', ref: '14.5' },
      { q: 'If the correlation were −1, the standard deviation would be:', o: ['12.2%', '15.8%', '0%', '8.6%'], a: 0, e: '|0.7×20 − 0.3×6| = 14 − 1.8 = 12.2%.', t: 'calc', ref: '14.4' },
      { q: 'What is the key lesson?', o: ['Portfolio risk equals weighted-average risk always', 'Lower correlation lowers portfolio risk for the same expected return', 'Correlation affects return, not risk', 'Diversification works only with negative correlation'], a: 1, e: 'Expected return is unchanged; risk falls as correlation falls.', ref: '14.5, 16.3.2' },
    ],
  },
  {
    id: 'xa-c8', title: 'Fund choices for Farhan', ch: [11], w: 1,
    text: 'Farhan (32) has a moderate risk appetite and files tax under the old regime. He needs (a) an emergency fund for 3 months’ expenses, (b) a tax-saving investment, (c) money for a car down-payment in 3 years, and (d) retirement savings for 25 years. He is also deciding between direct and regular plans.',
    qs: [
      { q: 'Which is most suitable for his emergency fund?', o: ['Liquid fund', 'Small cap fund', 'Credit risk fund', 'Sectoral fund'], a: 0, e: 'Low volatility, high liquidity; instant access facility up to ₹50,000 or 90% for resident individuals.', ref: '11.5.2, 11.8.3' },
      { q: 'Among tax-saving options eligible under the old regime, the equity scheme with the shortest lock-in is:', o: ['ELSS — 3 years', 'ELSS — 5 years', 'Tax-saver FD — 3 years', 'PPF — 3 years'], a: 0, e: 'ELSS has a 3-year lock-in; tax-saver FDs 5 years; PPF 15 years.', ref: '11.5.1' },
      { q: 'For the 3-year car down-payment, the most suitable choice is:', o: ['Small cap fund', 'Short duration debt fund', 'Sector fund', 'Long duration gilt fund'], a: 1, e: 'A short horizon needs low volatility; short duration funds match a 1–3 year Macaulay duration.', ref: '11.5.2, 15.8' },
      { q: 'For retirement 25 years away, a suitable core category is:', o: ['Arbitrage fund', 'Flexi cap / multi cap equity fund', 'Overnight fund', 'Capital protection fund'], a: 1, e: 'Long horizon and moderate risk suit diversified equity.', ref: '11.5.1' },
      { q: '₹10 lakh grows at 12% gross for 10 years. Direct plan expense 0.6%, regular 1.6%. The direct plan ends higher by about:', o: ['₹50,000', '₹2.5 lakh', '₹1 lakh', '₹5 lakh'], a: 1, e: '10 L × 1.114^10 = ₹29.43 L vs 10 L × 1.104^10 = ₹26.90 L → ~₹2.54 lakh.', t: 'calc', ref: '11.10.1' },
    ],
  },
  {
    id: 'xa-c9', title: 'Priya’s advisory practice', ch: [18, 17], w: 2,
    text: 'Priya is an individual SEBI-registered Investment Adviser. This financial year she has 280 clients and has collected fees of ₹3.2 crore. Her husband is an AMFI-registered mutual fund distributor. On 1 March she advised clients to buy stock X; she holds stock X herself. One client wants to pay two years’ fees in advance.',
    qs: [
      { q: 'Given her client count and fees, Priya must:', o: ['Do nothing until clients exceed 300', 'Apply for in-principle registration as a non-individual IA, since fees exceed ₹3 crore', 'Stop taking fees', 'Become a part-time IA'], a: 1, e: 'Trigger is > 300 clients OR fees > ₹3 crore in an FY, whichever is earlier.', ref: '18.6.5' },
      { q: 'Can her husband provide distribution services to her advisory clients?', o: ['Yes, with disclosure', 'No — the IA’s family cannot distribute to the IA’s advisory clients', 'Yes, for direct plans only', 'Yes, if fees are waived'], a: 1, e: 'Client-level segregation at family level is mandatory.', ref: '18.6.15' },
      { q: 'Priya wants to sell her own stock X on 10 March. She may do so only if:', o: ['She informs SEBI', 'She gives clients her revised assessment at least 24 hours before trading', 'She waits until 31 March', 'She pays a penalty'], a: 1, e: 'No contrary own-account trade for 15 days unless a revised view is given 24 hours in advance.', ref: '18.6.7' },
      { q: 'How much advance fee can she accept from the client?', o: ['Two years', 'One year at most', 'Six months at most', 'No advance allowed'], a: 1, e: 'Advance fees may not exceed one year.', ref: '18.6.8, 17.9' },
      { q: 'Which disclosure is required because she holds stock X?', o: ['None', 'Her holding/position in the security that is the subject of advice', 'Only her income', 'Only to SEBI'], a: 1, e: 'IAs must disclose their holding or position in advised securities.', ref: '18.6.11' },
    ],
  },
  {
    id: 'xa-c10', title: 'Arjun in Dubai', ch: [17], w: 1,
    text: 'Arjun, an Indian citizen working in Dubai, visited India for 100 days this financial year; he spent 400 days in India in the previous four years. He has investments made from his NRO account and wants to start buying listed Indian shares. Before moving abroad, he held shares in a resident demat account.',
    qs: [
      { q: 'For this year, Arjun’s residential status is:', o: ['Resident (60 days + 365 days)', 'Non-resident, since the 60-day test doesn’t apply to a citizen visiting India and he stayed under 182 days', 'Resident since he has Indian income', 'Resident but not ordinarily resident'], a: 1, e: 'The 60/365-day condition doesn’t apply to an Indian citizen/PIO coming on a visit.', ref: '17.5' },
      { q: 'Proceeds of investments made from his NRO account are repatriable up to:', o: ['No limit', 'US$ 1 million per financial year', 'US$ 2,50,000 per year', 'Nothing'], a: 1, e: 'NRO: up to USD 1 million per FY; NRE/FCNR: without limit.', ref: '17.5' },
      { q: 'To buy and sell listed shares on Indian exchanges, he must route transactions through:', o: ['Any savings account', 'A PINS account with a designated bank branch', 'A resident trading account', 'His employer'], a: 1, e: 'Portfolio Investment Scheme (PINS) is mandatory for NRIs.', ref: '17.5' },
      { q: 'The maximum he alone may hold in any Indian listed company is:', o: ['1%', '5% of paid-up capital', '10%', '24%'], a: 1, e: 'Individual NRI: 5%; all NRIs together: 10% (raisable to 24%).', ref: '17.5' },
      { q: 'Shares in his old resident demat account will be:', o: ['Sold compulsorily', 'Moved to an NRI demat account on a non-repatriable basis', 'Moved on a repatriable basis', 'Frozen permanently'], a: 1, e: 'Holdings acquired as resident are non-repatriable.', ref: '17.6.3, 17.7.4' },
    ],
  },
  {
    id: 'xa-c11', title: 'Settling Mr. Rao’s investments', ch: [17], w: 1,
    text: 'Mr. Rao died recently. He held a mutual fund folio jointly with his wife (either or survivor) and had nominated his son. He also held listed shares worth ₹25 lakh in a demat account in his sole name without a nominee; no heir disputes the claim. His daughter, now 17 years and 11 months old, has a folio with a running SIP.',
    qs: [
      { q: 'The jointly held mutual fund units will go to:', o: ['The son (nominee)', 'Mrs. Rao (surviving joint holder)', 'All legal heirs equally', 'The AMC till probate'], a: 1, e: 'Joint holders’ rights supersede the nominee’s.', ref: '17.6.5' },
      { q: 'For the ₹25 lakh demat holding, the heirs can claim:', o: ['Only with a succession certificate', 'With simplified documents (death certificate, notarised indemnity, affidavit-cum-NOC), since it is within ₹30 lakh', 'Only by court decree', 'Through Quick Transmission Processing'], a: 1, e: 'Uncontested demat claims up to ₹30 lakh per BO use simplified documentation; QTP is only up to ₹30,000.', ref: '17.6.5' },
      { q: 'When the daughter turns 18, her SIP:', o: ['Continues automatically', 'Stops/suspends and the folio is frozen until minor-to-major documents are submitted', 'Transfers to the mother', 'Converts to SWP'], a: 1, e: 'Standing instructions run only till majority; the guardian can no longer operate.', ref: '17.7.2' },
      { q: 'Mrs. Rao gives her son a Power of Attorney to manage her folio. The son CANNOT:', o: ['Redeem units', 'Purchase units', 'Change the nomination', 'Switch schemes'], a: 2, e: 'A PoA holder cannot make or change nominations.', ref: '17.4' },
      { q: 'From 1 September 2026, when Mrs. Rao opens a new single-holder demat account, she must:', o: ['Leave nomination blank if she wishes', 'Either nominate or formally opt out — the account won’t open otherwise', 'Nominate exactly one person', 'Get SEBI approval'], a: 1, e: 'Onboarding halts unless a nominee is named or an opt-out declaration is executed.', ref: '17.6.6' },
    ],
  },
  {
    id: 'xa-c12', title: 'Mr. Shah’s PMS and AIF', ch: [12, 13, 16], w: 2,
    text: 'Mr. Shah invests ₹1 crore in a discretionary PMS. Terms: profit share 20% of gains above an 8% hurdle. At the end of Year 1 the portfolio is worth ₹1.18 crore (before profit share). In Year 2 it falls to ₹1.10 crore and in Year 3 rises to ₹1.25 crore. He is also considering a hedge-fund style AIF.',
    qs: [
      { q: 'Under a NO catch-up structure, Year 1 profit share is:', o: ['₹3.6 lakh', '₹2.0 lakh', '₹1.6 lakh', 'Nil'], a: 1, e: 'Gain ₹18 lakh; hurdle ₹8 lakh; 20% × ₹10 lakh = ₹2 lakh.', t: 'calc', ref: '12.6' },
      { q: 'Under a FULL catch-up structure, Year 1 profit share is:', o: ['₹3.6 lakh', '₹2.0 lakh', '₹1.6 lakh', '₹1.0 lakh'], a: 0, e: 'Once the hurdle is crossed, fee applies on the whole ₹18 lakh gain: ₹3.6 lakh.', t: 'calc', ref: '12.6' },
      { q: 'Applying the high-watermark principle, profit share in Year 3 is computed only on value above:', o: ['₹1.00 crore', '₹1.10 crore', '₹1.18 crore', '₹1.25 crore'], a: 2, e: 'Fees resume only after crossing the previous high of ₹1.18 crore.', ref: '12.6' },
      { q: 'A hedge fund using leverage and derivatives would be registered as:', o: ['Category I AIF', 'Category II AIF', 'Category III AIF', 'A mutual fund'], a: 2, e: 'Complex trading strategies with leverage → Category III.', ref: '13.4' },
      { q: 'SEBI requires discretionary PMS performance to be reported using:', o: ['MWRR', 'TWRR', 'Simple absolute return', 'IRR on fees'], a: 1, e: 'Time-weighted rate of return.', ref: '16.2.2' },
    ],
  },
  {
    id: 'xa-c13', title: 'Measuring Kavya’s returns', ch: [16], w: 1,
    text: 'Kavya’s portfolio returned +25%, −10% and +15% in three successive years. She is in the 30% tax bracket. She also holds a US fund bought when US$1 = ₹82; the fund rose 8% in dollars and the rupee is now ₹86 per dollar.',
    qs: [
      { q: 'The arithmetic mean annual return is:', o: ['8.96%', '10.0%', '30.0%', '9.5%'], a: 1, e: '(25 − 10 + 15) ÷ 3 = 10%.', t: 'calc', ref: '16.2.3' },
      { q: 'The geometric (compound) annual return is closest to:', o: ['10.0%', '8.96%', '7.5%', '11.2%'], a: 1, e: '(1.25 × 0.90 × 1.15)^(1/3) − 1 = 8.96%.', t: 'calc', ref: '16.2.3' },
      { q: 'Which measure best describes her long-run growth of wealth?', o: ['Arithmetic mean', 'Geometric mean', 'Highest annual return', 'Median'], a: 1, e: 'Geometric return reflects actual compounding.', ref: '16.2.3' },
      { q: 'A taxable bond fund yields 9% pre-tax. Her post-tax return is:', o: ['9.0%', '6.3%', '2.7%', '12.9%'], a: 1, e: '9% × (1 − 0.30) = 6.3%.', t: 'calc', ref: '16.2.5' },
      { q: 'Her return on the US fund in rupee terms is about:', o: ['8.0%', '13.3%', '4.9%', '3.1%'], a: 1, e: '1.08 × (86/82) − 1 = 13.27%. Rupee depreciation added to returns.', t: 'calc', ref: '16.6.5' },
    ],
  },
  {
    id: 'xa-c14', title: 'Mrs. Iyer’s payout choice', ch: [2], w: 1,
    text: 'Mrs. Iyer’s policy matures. She can take ₹10 lakh now or ₹12,000 at the end of each month for 10 years. She discounts cash flows at 6% p.a. (0.5% a month). Separately, she wants a lifelong income of ₹15,000 a month for her parents from a corpus yielding 7.5% p.a.',
    qs: [
      { q: 'The present value of the monthly option is closest to:', o: ['₹14.4 lakh', '₹10.8 lakh', '₹9.0 lakh', '₹12.0 lakh'], a: 1, e: '=PV(0.005, 120, −12,000) = ₹10.81 lakh.', t: 'calc', ref: '2.2.6' },
      { q: 'On PV basis, which option is better for her?', o: ['Lump sum ₹10 lakh', 'Monthly payout', 'Both identical', 'Cannot compare'], a: 1, e: 'PV of payout (₹10.81 lakh) exceeds ₹10 lakh.', ref: '2.2.6' },
      { q: 'If the ₹12,000 were paid at the BEGINNING of each month, its PV would:', o: ['Fall', 'Rise (annuity due)', 'Remain the same', 'Become zero'], a: 1, e: 'Annuity due = ordinary annuity × (1 + r).', ref: '2.2.6' },
      { q: 'The corpus needed for ₹15,000 a month in perpetuity at 7.5% is:', o: ['₹18 lakh', '₹24 lakh', '₹20 lakh', '₹2.4 crore'], a: 1, e: 'Annual ₹1.8 lakh ÷ 0.075 = ₹24 lakh.', t: 'calc', ref: '2.2.7' },
      { q: 'If her investments earn 8% while inflation is 5%, her real return is closest to:', o: ['3.0%', '2.86%', '13.4%', '1.6%'], a: 1, e: '1.08 ÷ 1.05 − 1 = 2.86%.', t: 'calc', ref: '2.1' },
    ],
  },
  {
    id: 'xa-c15', title: 'A complaint against an adviser', ch: [20, 19], w: 1,
    text: 'Sanjay paid an IA for a financial plan. He believes he was steered into products unsuitable for his risk profile and that the IA never shared his assessed risk profile. He wants to complain and asks what his options are. Separately, SEBI has passed an order against another IA, who wants to challenge it.',
    qs: [
      { q: 'Sanjay’s first step should be to:', o: ['File on SCORES directly', 'Complain to the IA using its escalation matrix', 'Approach the Supreme Court', 'Approach RBI Ombudsman'], a: 1, e: 'Step 1 is the IA itself.', ref: '17.9, 20.5' },
      { q: 'If unhappy with the IA’s response, he should next:', o: ['Lodge the grievance on SEBI SCORES', 'Approach IRDAI', 'Go to NCLT', 'Approach SAT'], a: 0, e: 'Step 2: SCORES.', ref: '20.5' },
      { q: 'If still dissatisfied, he can:', o: ['Use the Smart ODR portal for online dispute resolution', 'Only go to court', 'Approach the stock exchange arbitrator only', 'Do nothing more'], a: 0, e: 'Step 3: Online Dispute Resolution.', ref: '20.5' },
      { q: 'Which IA obligation does Sanjay’s complaint suggest was breached?', o: ['Communicating the risk profile and ensuring suitability', 'Annual audit', 'Website maintenance', 'Name display'], a: 0, e: 'Risk profile must be communicated; advice must be suitable.', ref: '18.6.9–18.6.10' },
      { q: 'The other IA must appeal SEBI’s order before SAT within:', o: ['30 days', '45 days', '60 days', '90 days'], a: 1, e: 'Section 15T: 45 days; further appeal to the Supreme Court within 60 days.', ref: '20.9' },
    ],
  },
  {
    id: 'xa-c16', title: 'Mr. Menon’s retirement income', ch: [9, 16], w: 1,
    text: 'Mr. Menon (61) has just retired with ₹40 lakh. He is in the 30% tax bracket and wants regular income with low risk. He is considering the Senior Citizens’ Savings Scheme, a joint Post Office Monthly Income Scheme account with his wife, bank FDs and tax-free bonds yielding 6.5% in the secondary market.',
    qs: [
      { q: 'Is Mr. Menon eligible for SCSS?', o: ['No, he must be 65', 'Yes, he is 60 or above', 'Only if he retired under VRS', 'Only jointly with his son'], a: 1, e: 'SCSS: 60 years or above (55+ for retirees within 3 months of benefits).', ref: '9.11' },
      { q: 'The maximum he can invest in a joint POMIS account is:', o: ['₹4.5 lakh', '₹9 lakh', '₹15 lakh', 'No limit'], a: 2, e: '₹9 lakh single; ₹15 lakh joint.', ref: '9.11' },
      { q: 'To stay fully covered by deposit insurance, how much should he keep per bank (principal + interest)?', o: ['₹1 lakh', '₹5 lakh', '₹10 lakh', '₹15 lakh'], a: 1, e: 'DICGC covers ₹5 lakh per depositor per bank.', ref: '9.11' },
      { q: 'The pre-tax equivalent yield of the 6.5% tax-free bond for him is about:', o: ['6.5%', '9.29%', '8.45%', '4.55%'], a: 1, e: '6.5 ÷ (1 − 0.30) = 9.29%.', t: 'calc', ref: '16.2.5' },
      { q: 'As a senior citizen, the extra interest banks typically offer on FDs is:', o: ['0.25%–0.75%', '1%–2%', 'Nil', '2%–3%'], a: 0, e: 'Usually 0.25% to 0.75% over normal rates.', ref: '9.11' },
    ],
  },
];
