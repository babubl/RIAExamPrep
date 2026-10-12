// NISM X-B, Chapter 10 — Taxation of Debt Products (Dec 2025, §10.1–10.7)
export default {
  id: 'xb10', exam: 'xb', ch: 10, module: 9,
  title: 'Taxation of Debt Products',
  sections: [
    { h: 'Sources of income (10.1)', pts: [
      'Periodic income = interest (Other Sources unless business income); gains on transfer/redemption = capital gains if held as investment. Securities held by FPIs are always capital assets.',
    ]},
    { h: 'Coupon bonds (10.2.1)', pts: [
      'Interest taxed at slab rates; deduct expenses wholly for earning it and collection commission. Some interest to non-residents is at concessional rates with no deductions.',
      'Mercantile vs cash: e.g. 1,000 bonds of ₹100 at 7.5% bought 1-1-2024 with half-yearly interest — FY 2024-25 interest is ₹7,500 on either basis, but the split by year differs.',
      'Listed bonds/debentures: long-term after 12 months, LTCG 12.5% without indexation; STCG at slab. Unlisted bonds/debentures and MLDs: always short-term (slab).',
      'Book example: 400 listed bonds bought at ₹1,200 (2016), sold at ₹2,000 (July 2024) → LTCG ₹3,20,000 at 12.5%; if unlisted, the same ₹3,20,000 is STCG at slab rates.',
      'Sale price including accrued interest: split out the accrued interest (taxed as interest) before computing the gain. Book: ₹10,000 bond @ 9% quarterly, bought ₹10,500, sold for ₹13,000 incl. 1 month’s interest ₹75 → STCG ₹2,425.',
      'NRIs: Sec 115E — LTCG on G-secs/listed debentures bought in foreign currency 12.5%; Sec 112(1)(c)(iii) — unlisted securities (not bonds/debentures) 12.5%.',
    ]},
    { h: 'Government securities (10.2.2)', pts: [
      'Cash Management Bills (< 91 days) and T-Bills (91/182/364 days) issued at discount; no interest — gain on redemption/transfer is STCG at slab.',
      'Dated G-Secs (5–40 years, half-yearly coupon) and State Development Loans: taxed like listed bonds (12.5% LTCG after 12 months); unlisted dated G-secs gains are short term.',
      'No TDS u/s 193 on interest on Central/State government securities to residents except 8% Savings (Taxable) Bonds 2003 and 7.75% Savings (Taxable) Bonds 2018 (TDS when interest > ₹10,000).',
    ]},
    { h: 'Tax-free bonds (10.2.3)', pts: [
      'Interest exempt under Sec 10; capital gains on transfer/redemption taxable like coupon bonds. Book: NABARD tax-free bonds bought ₹120, redeemed ₹150 (listed, > 12 months) → LTCG ₹1,50,000 on 5,000 bonds at 12.5%.',
    ]},
    { h: 'Mutual funds (10.3)', pts: [
      'Four tax buckets: equity-oriented; SMF type 1 (≥ 65% debt/money market, bought on/after 1-4-2023) — always STCG; SMF type 2 (< 35% domestic equity, bought ≥ 1-4-2023 and sold before 1-4-2025) — always STCG; all other funds — LTCG 12.5% after 12 months (listed) / 24 months (unlisted).',
      'Dividends (IDCW) from MFs: residents at slab; interest expense deductible up to 20% of dividend; no other expenses. Non-residents: 20% (or DTAA rate), no deductions, no Chapter VI-A.',
      'Book example: dividend ₹5 lakh, interest on borrowing ₹1.5 lakh → deduction capped at ₹1 lakh; taxable ₹4 lakh. Non-resident: whole ₹5 lakh at 20%.',
      'Book example: debt fund units bought 1-1-2017 at ₹150, sold 15-3-2025 at ₹300 (acquired before 1-4-2023, unlisted 24-month rule) → LTCG ₹1,50,000 at 12.5%.',
    ]},
    { h: 'Non-residents (10.4)', pts: [
      'DTAA rate or Act rate, whichever is more beneficial; need Tax Residency Certificate (TRC) and Form 10F.',
      'Example: India–USA DTAA interest 15%; dividends Act 20% vs DTAA 25% → 20%; India–UK DTAA dividends 10%.',
      'Chapter XII-A (NRIs — citizens/PIOs; investments in convertible foreign exchange in Indian company shares, debentures/deposits of non-private companies, certain G-secs): investment income 20%, LTCG 12.5%, no indexation; reinvest net consideration within 6 months → proportionate LTCG exempt (Sec 115F), clawed back if new asset sold within 3 years; may continue 20% on debenture/deposit/G-sec income after becoming resident.',
      'Sec 89A: income of residents from specified overseas retirement accounts (USA, Canada, UK) taxed at withdrawal, not accrual.',
    ]},
    { h: 'Market Linked Debentures (10.5–10.6)', pts: [
      'Return linked to an index/security; principal-protected or not; issuers need ₹100 crore net worth; tenure typically 12–36 months; pay at maturity.',
      'Sec 50AA (transfers/redemptions on/after 1-4-2023): always STCG at slab; no cost of improvement for MLDs/SMFs.',
      'Sovereign Gold Bond: redemption by individual exempt; secondary-market sale of listed SGB — LTCG 12.5% after 12 months.',
    ]},
  ],
  keys: [
    'Listed bonds: LT > 12 m → 12.5% (no indexation)',
    'Unlisted bonds/MLDs/debt SMF: always STCG at slab',
    'MF dividend: interest deduction ≤ 20% of dividend',
    'NR dividend 20% (or DTAA); needs TRC + Form 10F',
  ],
  qs: [
    { q: 'Mr. A sells listed bonds bought at ₹1,200 for ₹2,000 after 8 years. On 400 bonds, the gain and tax rate are:', o: ['₹3,20,000 LTCG at 12.5%', '₹3,20,000 STCG at slab', '₹3,20,000 LTCG at 20% with indexation', '₹8,00,000 LTCG'], a: 0, e: '400 × (2,000 − 1,200) = ₹3,20,000; listed, > 12 months → 12.5%.', t: 'calc', ref: '10.2.1' },
    { q: 'Same facts, but the bonds are UNLISTED. The gain is taxed as:', o: ['LTCG at 12.5%', 'STCG at slab rates', 'Exempt', 'LTCG at 20%'], a: 1, e: 'Unlisted bonds/debentures are always short-term (Sec 50AA).', t: 'trap', ref: '10.2.1' },
    { q: 'A ₹10,000, 9% listed bond with quarterly interest is bought for ₹10,500 and sold one month after the last coupon for ₹13,000 including accrued interest. STCG is:', o: ['₹2,500', '₹2,425', '₹2,575', '₹3,000'], a: 1, e: 'Accrued interest 10,000 × 9% / 12 = ₹75 is interest income; 12,925 − 10,500 = ₹2,425 STCG.', t: 'calc', d: 3, ref: '10.2.1' },
    { q: 'Gain on redemption of a 364-day Treasury Bill is taxed as:', o: ['Interest at slab', 'STCG at slab rates', 'LTCG at 12.5%', 'Exempt'], a: 1, e: 'T-bills pay no interest; the discount is a short-term capital gain.', ref: '10.2.2' },
    { q: 'Interest on tax-free NABARD bonds is exempt. When these listed bonds bought at ₹120 are redeemed at ₹150 after 2 years:', o: ['The gain is also exempt', 'LTCG at 12.5% is payable on the gain', 'STCG at slab', 'Interest becomes taxable'], a: 1, e: 'Only the interest is tax-free; capital gains are taxable.', t: 'trap', ref: '10.2.3' },
    { q: 'TDS u/s 193 on interest paid to residents on Central Government securities applies to:', o: ['All G-secs', 'No G-secs', '8% Savings (Taxable) Bonds 2003 and 7.75% Savings (Taxable) Bonds 2018 when interest exceeds ₹10,000', 'Only T-Bills'], a: 2, e: 'Those two series are the exception.', ref: '10.2.2' },
    { q: 'A resident gets ₹5 lakh dividend from a debt fund and paid ₹1.5 lakh interest on money borrowed to invest. Taxable dividend:', o: ['₹3.5 lakh', '₹4 lakh', '₹5 lakh', '₹1 lakh'], a: 1, e: 'Interest deduction capped at 20% of dividend = ₹1 lakh; taxable ₹4 lakh.', t: 'calc', ref: '10.3.3' },
    { q: 'If the same investor were a non-resident (no DTAA benefit), the dividend would be taxed:', o: ['₹4 lakh at slab', '₹5 lakh at 20%', '₹4 lakh at 20%', 'Exempt'], a: 1, e: 'No deductions for non-residents; 20% on the gross.', ref: '10.3.3' },
    { q: 'Units of a debt fund (> 65% debt) bought in May 2023 and redeemed in 2026 after 3 years:', o: ['LTCG 12.5%', 'LTCG 20% with indexation', 'STCG at slab', 'Exempt'], a: 2, e: 'SMF type 1 bought after 1-4-2023 → always STCG.', ref: '10.3.4' },
    { q: 'Units of a debt fund bought on 1-1-2017 at ₹150 and sold on 15-3-2025 at ₹300 (1,000 units). Tax treatment:', o: ['STCG ₹1.5 lakh at slab', 'LTCG ₹1.5 lakh at 12.5%', 'LTCG with indexation at 20%', 'Exempt'], a: 1, e: 'Bought before 1-4-2023, held > 24 months → LTCG at 12.5% (sale after 23-7-2024).', t: 'calc', ref: '10.3.6' },
    { q: 'An international fund-of-funds (unlisted) bought in June 2023 and sold in September 2025 is taxed as:', o: ['Always STCG', 'LTCG 12.5% (held over 24 months, unlisted)', 'Exempt', 'Equity LTCG with ₹1.25 lakh exemption'], a: 1, e: 'SMF type 2 applies only if sold before 1-4-2025; sold after, normal rules: > 24 months unlisted → LTCG 12.5%.', t: 'trap', d: 3, ref: '10.3.5' },
    { q: 'To claim a DTAA rate, a non-resident must furnish:', o: ['PAN only', 'Tax Residency Certificate and Form 10F', 'Form 15G', 'Form 16'], a: 1, e: 'TRC plus Form 10F self-declaration.', ref: '10.4' },
    { q: 'A US resident NRI receives dividends from Indian shares. The Act rate is 20%; India–USA DTAA rate is 25%. Applicable rate:', o: ['25%', '20%', '15%', '45%'], a: 1, e: 'The more beneficial of the Act and the DTAA → 20%.', ref: '10.4' },
    { q: 'Under Chapter XII-A, an NRI’s LTCG on foreign-exchange assets is exempt proportionately if the net consideration is reinvested within:', o: ['3 months', '6 months', '1 year', '2 years'], a: 1, e: 'Six months; exemption reversed if the new asset is sold within 3 years.', ref: '10.4' },
    { q: 'Sec 89A addresses:', o: ['MLD taxation', 'Mismatch on overseas retirement accounts (USA, Canada, UK) — taxed on withdrawal', 'TDS on G-secs', 'Buy-back tax'], a: 1, e: 'Specified retirement accounts taxed at withdrawal for residents.', ref: '10.4' },
    { q: 'Statement I: Gains on Market Linked Debentures are always short-term. Statement II: Cost of improvement is allowed for MLDs.', o: ['Only I is true', 'Only II is true', 'Both are true', 'Both are false'], a: 0, e: 'Sec 50AA: always STCG; cost of improvement nil.', t: 'multi', ref: '10.6' },
    { q: 'MLDs can be issued by companies with a minimum net worth of:', o: ['₹10 crore', '₹50 crore', '₹100 crore', '₹500 crore'], a: 2, e: '₹100 crore per the book.', ref: '10.5' },
    { q: 'Gain on redemption of a Sovereign Gold Bond by an individual at maturity is:', o: ['LTCG at 12.5%', 'STCG', 'Not taxable', 'Taxable at 20%'], a: 2, e: 'Redemption by an individual is not a transfer.', ref: '10.7' },
  ],
};
