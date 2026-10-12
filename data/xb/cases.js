// NISM X-B — original case studies in the exam style (6 cases × 5 questions × 2 marks per mock).
// Figures are computed (see working in each explanation). Workbook sections are cited in `ref`.
export default [
  {
    id: 'xb-c1', title: 'Kiran’s life cover gap', ch: [2], w: 2,
    text: 'Kiran (35) is the sole earner. If he dies, his wife will need ₹40,000 a month (today’s value) for 25 years. Assume inflation of 6% and investment return of 8%, with withdrawals at the end of each year. He also wants to provide ₹15 lakh for his child’s education and to clear a home loan of ₹25 lakh. He has a term policy of ₹60 lakh and liquid investments of ₹20 lakh that the family could use. His annual income is ₹12 lakh, of which ₹3 lakh is spent on himself and ₹1.5 lakh goes in taxes and premiums.',
    qs: [
      { q: 'The inflation-adjusted (real) rate to use is closest to:', o: ['2.00%', '1.89%', '14.48%', '1.85%'], a: 1, e: '1.08 ÷ 1.06 − 1 = 1.887%.', ref: '2.3.2' },
      { q: 'The corpus required for household expenses is closest to:', o: ['₹75 lakh', '₹95 lakh', '₹1.2 crore', '₹1.08 crore'], a: 1, e: '=PV(1.887%, 25, −4,80,000) ≈ ₹94.97 lakh.', t: 'calc', ref: '2.3.2' },
      { q: 'Total insurance need under the needs-based approach is closest to:', o: ['₹95 lakh', '₹1.10 crore', '₹1.35 crore', '₹1.55 crore'], a: 2, e: '94.97 + 25 (loan) + 15 (education) = ₹134.97 lakh.', t: 'calc', ref: '2.3.2' },
      { q: 'Additional cover Kiran should buy is closest to:', o: ['₹35 lakh', '₹55 lakh', '₹75 lakh', '₹95 lakh'], a: 1, e: '134.97 − 60 (existing cover) − 20 (liquid investments) ≈ ₹55 lakh.', t: 'calc', ref: '2.3.2' },
      { q: 'Using the Human Life Value method (25 years, discount rate 7%, income net of self-spend, taxes and premiums), his HLV is closest to:', o: ['₹87 lakh', '₹1.40 crore', '₹1.05 crore', '₹62 lakh'], a: 0, e: 'Family contribution = 12 − 3 − 1.5 = ₹7.5 lakh; =PV(7%, 25, −7,50,000) ≈ ₹87.4 lakh.', t: 'calc', ref: '2.3.1' },
    ],
  },
  {
    id: 'xb-c2', title: 'The Nairs’ hospital year', ch: [3], w: 2,
    text: 'Anita Nair has a family floater base health policy of ₹5 lakh. She is choosing between (A) a top-up of ₹10 lakh with a ₹5 lakh deductible and (B) a super top-up of ₹10 lakh with a ₹5 lakh deductible. During the year the family has three hospitalisations, in this order: ₹4 lakh, ₹3 lakh and ₹6 lakh. Separately, her father’s standalone policy has a deductible of ₹20,000 and 10% co-payment.',
    qs: [
      { q: 'With option A (top-up), Anita’s total out-of-pocket cost for the year is:', o: ['Nil', '₹2 lakh', '₹5 lakh', '₹7 lakh'], a: 3, e: 'Base pays 4 + 1 = ₹5 lakh. Claim 2: ₹2 lakh unpaid (below per-claim ₹5 lakh threshold). Claim 3: top-up pays 6 − 5 = ₹1 lakh; ₹5 lakh unpaid. Out of pocket 2 + 5 = ₹7 lakh.', t: 'calc', d: 3, ref: '3.2' },
      { q: 'With option B (super top-up), her out-of-pocket cost is:', o: ['Nil', '₹1 lakh', '₹2 lakh', '₹5 lakh'], a: 0, e: 'Aggregate deductible ₹5 lakh is met by the base policy during claim 2; the super top-up pays the remaining ₹2 lakh and the full ₹6 lakh (₹8 lakh in all, within ₹10 lakh).', t: 'calc', d: 3, ref: '3.2' },
      { q: 'Her father’s bill is ₹2,00,000. The insurer pays:', o: ['₹1,80,000', '₹1,62,000', '₹1,60,000', '₹1,98,000'], a: 1, e: '(2,00,000 − 20,000) × 90% = ₹1,62,000.', t: 'calc', ref: '3.1.1' },
      { q: 'Anita should tell the super top-up insurer about small claims below the deductible because:', o: ['It is a legal formality only', 'The insurer tracks how much of the aggregate deductible is used up', 'It increases the no-claim bonus', 'The claim is then paid twice'], a: 1, e: 'The aggregate threshold is tracked across all claims.', ref: '3.2' },
      { q: 'Anita’s employer also gives her ₹3 lakh group cover. Which is TRUE?', o: ['Both insurers must share every claim', 'She can choose which policy to claim first; contribution applies only above that policy’s sum insured', 'Group cover must be exhausted first by law', 'She cannot hold two indemnity policies'], a: 1, e: 'Choice of policy; contribution only when a claim exceeds the chosen policy’s sum insured.', ref: '3.2' },
    ],
  },
  {
    id: 'xb-c3', title: 'Meera plans to retire at 60', ch: [4, 5, 6], w: 2,
    text: 'Meera (40) spends ₹60,000 a month and wants the same lifestyle in retirement from 60 for 25 years. Assume 6% inflation before and after retirement, and a post-retirement return of 8%; withdrawals are at the beginning of each year. Her EPF balance of ₹20 lakh will continue to earn 8.5% (ignore further EPF contributions). She can invest the shortfall through a monthly SIP earning 12% a year (1% a month).',
    qs: [
      { q: 'Her annual expense in the first year of retirement is closest to:', o: ['₹14.4 lakh', '₹19.2 lakh', '₹23.1 lakh', '₹27.6 lakh'], a: 2, e: '=FV(6%, 20, , −7,20,000) ≈ ₹23,09,138.', t: 'calc', ref: '4.3.1' },
      { q: 'The retirement corpus required is closest to:', o: ['₹3.4 crore', '₹4.65 crore', '₹5.77 crore', '₹4.12 crore'], a: 1, e: 'Real rate 1.887%; =PV(1.887%, 25, −23,09,138, , 1) ≈ ₹4.65 crore.', t: 'calc', d: 3, ref: '6.2' },
      { q: 'Her EPF will grow by 60 to about:', o: ['₹62 lakh', '₹82 lakh', '₹1.02 crore', '₹1.25 crore'], a: 2, e: '20,00,000 × 1.085^20 ≈ ₹1.02 crore.', t: 'calc', ref: '5.1' },
      { q: 'The monthly SIP needed for the shortfall is closest to:', o: ['₹26,000', '₹36,700', '₹48,000', '₹55,000'], a: 1, e: 'Gap ≈ 4.65 − 1.02 = ₹3.63 crore; =PMT(1%, 240, 0, −3.63 crore) ≈ ₹36,720.', t: 'calc', d: 3, ref: '6.2' },
      { q: 'If Meera starts the SIP 5 years later (15 years of saving), the monthly SIP becomes about:', o: ['₹45,900', '₹55,000', '₹72,700', '₹1,10,000'], a: 2, e: '=PMT(1%, 180, 0, −3.63 crore) ≈ ₹72,711 — nearly double: the cost of delay.', t: 'calc', ref: '6.2' },
    ],
  },
  {
    id: 'xb-c4', title: 'Dev funds two family goals', ch: [20], w: 2,
    text: 'Dev has set aside a corpus of ₹70 lakh earning 9% a year for two goals. (1) His son’s post-graduation: ₹10 lakh a year in today’s cost, payable at the end of year 4 and year 5; education inflation 10%. (2) His daughter’s wedding at the end of year 6: ₹40 lakh in today’s cost; inflation 7%. Ignore taxes.',
    qs: [
      { q: 'The education cost payable at the end of year 4 is:', o: ['₹13.31 lakh', '₹14.64 lakh', '₹16.11 lakh', '₹11.00 lakh'], a: 1, e: '=FV(10%, 4, , −10,00,000) = ₹14,64,100.', t: 'calc', ref: '20.2' },
      { q: 'At the end of year 4 Dev wants to set aside one amount, earning 7%, to fund both years of education. The amount is closest to:', o: ['₹29.69 lakh', '₹30.75 lakh', '₹28.10 lakh', '₹31.20 lakh'], a: 0, e: 'Year-5 cost 16,10,510 discounted one year at 7% = 15,05,150; + 14,64,100 = ₹29,69,250.', t: 'calc', d: 3, ref: '20.2' },
      { q: 'The wedding outlay at the end of year 6 is closest to:', o: ['₹52.4 lakh', '₹56.1 lakh', '₹60.0 lakh', '₹70.9 lakh'], a: 2, e: '=FV(7%, 6, , −40,00,000) ≈ ₹60,02,921.', t: 'calc', ref: '20.2' },
      { q: 'If the whole corpus stays at 9% and the education costs are paid from it as they fall due, the balance after the wedding is closest to:', o: ['₹12.6 lakh', '₹22.4 lakh', '₹30.8 lakh', 'Shortfall of ₹5 lakh'], a: 1, e: 'Y4: 70 × 1.09⁴ − 14.64 = 84.17; Y5: × 1.09 − 16.11 = 75.64; Y6: × 1.09 − 60.03 ≈ ₹22.4 lakh.', t: 'calc', d: 3, ref: '20.2' },
      { q: 'Which Excel function gives the inflated future cost of each goal?', o: ['PV', 'FV', 'PMT', 'NPER'], a: 1, e: 'FV(inflation, years, , −today’s cost).', ref: '20' },
    ],
  },
  {
    id: 'xb-c5', title: 'Mr. Arora sells his flat', ch: [8], w: 2,
    text: 'Mr. Arora (resident) bought a flat in June 2010 for ₹60 lakh (CII 2010-11 = 167) and sold it in December 2024 for ₹2.40 crore (CII 2024-25 = 363), paying brokerage of 1% of the sale price. He has no other capital gains. Ignore surcharge and cess.',
    qs: [
      { q: 'The indexed cost of acquisition is closest to:', o: ['₹60 lakh', '₹1.10 crore', '₹1.30 crore', '₹1.45 crore'], a: 2, e: '60,00,000 × 363/167 ≈ ₹1,30,41,916.', t: 'calc', ref: '8.5' },
      { q: 'Tax under the 12.5%-without-indexation route is closest to:', o: ['₹22.2 lakh', '₹21.4 lakh', '₹30.0 lakh', '₹35.5 lakh'], a: 0, e: 'Gain = 2,40,00,000 − 2,40,000 − 60,00,000 = ₹1,77,60,000 × 12.5% = ₹22.2 lakh.', t: 'calc', ref: '8.5.2' },
      { q: 'His final tax liability (no reinvestment) is closest to:', o: ['₹22.2 lakh', '₹21.4 lakh', '₹35.5 lakh', '₹13.3 lakh'], a: 1, e: 'With indexation: 2,37,60,000 − 1,30,41,916 = ₹1,07,18,084 × 20% = ₹21.44 lakh — lower than ₹22.2 lakh, so it applies (land/building bought before 23-7-2024).', t: 'calc', d: 3, ref: '8.5.2' },
      { q: 'If he invests ₹50 lakh in NHAI/REC bonds within 6 months, his tax falls to about:', o: ['₹11.4 lakh', '₹15.95 lakh', '₹9.0 lakh', 'Nil'], a: 0, e: 'Indexed route: (1,07,18,084 − 50,00,000) × 20% ≈ ₹11.44 lakh vs non-indexed (1,77,60,000 − 50,00,000) × 12.5% ≈ ₹15.95 lakh → ₹11.44 lakh.', t: 'calc', d: 3, ref: '8.5.3' },
      { q: 'Statement I: Sec 54EC bonds must be bought within 6 months of the transfer. Statement II: If he also buys a new house for ₹60 lakh within 2 years, Sec 54 can bring his tax to nil.', o: ['Only I is true', 'Only II is true', 'Both are true', 'Both are false'], a: 2, e: 'Indexed gain 1.07 crore − 50 lakh (54EC) − 60 lakh (54) < 0 → nil.', t: 'multi', ref: '8.5.3' },
    ],
  },
  {
    id: 'xb-c6', title: 'Ms. Iyer’s equity year', ch: [7, 11], w: 2,
    text: 'Ms. Iyer (resident, 30% slab) has these transactions in FY 2025-26 (all STT paid where applicable): (1) 1,000 listed shares bought in January 2017 at ₹400 (highest price on 31-1-2018 ₹600) and sold in August 2025 at ₹900. (2) Equity-fund units bought in September 2024 for ₹2 lakh and redeemed in June 2025 for ₹2.6 lakh. (3) Listed shares bought in March 2025 for ₹1.5 lakh and sold in December 2025 for ₹1.1 lakh. (4) A debt fund (over 65% debt) bought in 2024, redeemed with a gain of ₹50,000. Ignore surcharge and cess.',
    qs: [
      { q: 'LTCG on item (1) is:', o: ['₹5,00,000', '₹3,00,000', '₹2,50,000', '₹6,00,000'], a: 1, e: 'Cost = max(400, min(600, 900)) = ₹600 → (900 − 600) × 1,000 = ₹3,00,000.', t: 'calc', ref: '11.2.4' },
      { q: 'Tax on item (1) before any set-off is:', o: ['₹37,500', '₹21,875', '₹60,000', '₹15,625'], a: 1, e: '(3,00,000 − 1,25,000) × 12.5% = ₹21,875.', t: 'calc', ref: '11.2.4' },
      { q: 'Item (2) is taxed as:', o: ['LTCG at 12.5%', 'STCG at 20% — ₹12,000', 'STCG at slab — ₹18,000', 'Exempt'], a: 1, e: 'Held 9 months → STCG u/s 111A: 60,000 × 20% = ₹12,000.', t: 'calc', ref: '11.6.1' },
      { q: 'The ₹40,000 loss on item (3) can be set off against:', o: ['Only STCG', 'Only LTCG', 'Any STCG or LTCG', 'Salary income'], a: 2, e: 'STCL can be set off against both short- and long-term gains; carried forward 8 years if unabsorbed.', ref: '7.5' },
      { q: 'The ₹50,000 gain on item (4) is:', o: ['LTCG at 12.5%', 'STCG at slab rates (Sec 50AA)', 'STCG at 20%', 'Exempt below ₹1.25 lakh'], a: 1, e: 'Specified mutual fund bought after 1-4-2023 → always short term at slab.', t: 'trap', ref: '10.3.4' },
    ],
  },
  {
    id: 'xb-c7', title: 'Rao abroad, Kapoor at home', ch: [7, 12], w: 2,
    text: 'Mr. Rao, an Indian citizen employed in Singapore, visited India for 150 days in FY 2025-26. He was in India for 400 days in the 4 preceding years and was non-resident in 9 of the last 10 years. His Indian income (rent and interest) is ₹18 lakh; his Singapore salary is ₹60 lakh. Ms. Kapoor, a resident in Mumbai, earns basic + DA of ₹12 lakh, HRA of ₹4.8 lakh and pays rent of ₹3.6 lakh a year. Her private-sector employer contributes 12% of basic + DA to her NPS.',
    qs: [
      { q: 'Mr. Rao’s residential status for FY 2025-26 is:', o: ['Non-resident', 'Resident and ordinarily resident', 'Resident but not ordinarily resident', 'Deemed resident only'], a: 2, e: 'Indian income > ₹15 lakh → 120 days + 365 days test is met → resident; such visitors (and NR 9 of 10 years) are RNOR.', t: 'trap', d: 3, ref: '7.2' },
      { q: 'Is his Singapore salary taxable in India?', o: ['Yes, fully', 'No — RNOR is taxed on foreign income only from a business controlled/profession set up in India', 'Yes, with DTAA credit', 'Only 50%'], a: 1, e: 'Foreign salary of an RNOR is outside the Indian tax net.', ref: '7.2' },
      { q: 'If his Indian income were only ₹12 lakh, his status would be:', o: ['Non-resident (needs 182 days)', 'RNOR', 'ROR', 'Deemed resident'], a: 0, e: 'For a visiting citizen with Indian income ≤ ₹15 lakh, the 60-day limb is replaced by 182 days; 150 < 182.', t: 'trap', ref: '7.2' },
      { q: 'Ms. Kapoor’s HRA exemption under the old regime is:', o: ['₹4,80,000', '₹2,40,000', '₹6,00,000', '₹3,60,000'], a: 1, e: 'Least of 4,80,000; 3,60,000 − 1,20,000 = 2,40,000; 50% × 12,00,000 = 6,00,000 → ₹2,40,000.', t: 'calc', ref: '7.3' },
      { q: 'Her deduction u/s 80CCD(2) for the employer’s NPS contribution of ₹1,44,000 is:', o: ['₹1,20,000 under both regimes', '₹1,20,000 old / ₹1,44,000 new', '₹1,44,000 under both', 'Nil in the new regime'], a: 1, e: 'Cap: 10% of salary (₹1.2 lakh) in the old regime; 14% (₹1.68 lakh) in the new regime → actual ₹1.44 lakh allowed.', t: 'calc', ref: '12.3.1' },
    ],
  },
  {
    id: 'xb-c8', title: 'The Sharma estate', ch: [14, 15], w: 2,
    text: 'Mr. Sharma, a Hindu, died without a will, leaving self-acquired assets worth ₹1.2 crore. He is survived by his widow, his mother, his father, two sons, one daughter, and the two children of a daughter who died before him. His mutual fund units name his elder son as the sole nominee. Years earlier he had bought a life policy under the Married Women’s Property Act for his wife.',
    qs: [
      { q: 'How many equal Class I shares will his estate be divided into?', o: ['5', '6', '7', '8'], a: 1, e: 'Widow, mother, son, son, daughter and the pre-deceased daughter’s branch = 6 shares. Father is Class II.', t: 'calc', ref: '14.4.2' },
      { q: 'Each grandchild through the pre-deceased daughter receives:', o: ['₹20 lakh', '₹10 lakh', '₹15 lakh', 'Nil'], a: 1, e: 'Branch share ₹20 lakh split equally between two children.', t: 'calc', ref: '14.4.2' },
      { q: 'His father’s share is:', o: ['₹20 lakh', '₹17.14 lakh', 'Nil', '₹10 lakh'], a: 2, e: 'Class I heirs exclude Class II heirs; father is the first entry of Class II.', t: 'trap', ref: '14.4.2' },
      { q: 'The AMC pays the mutual fund proceeds to the elder son as nominee. The son:', o: ['Becomes absolute owner', 'Holds them as trustee for all legal heirs', 'Must return them to the AMC', 'Shares only with his brother'], a: 1, e: 'Nomination gives a valid discharge to the AMC; ownership follows succession law.', ref: '15.4.3' },
      { q: 'The MWPA policy proceeds:', o: ['Form part of his estate and are shared by all heirs', 'Go to the wife as a trust and are outside his estate and creditors', 'Go to the nominee for distribution', 'Go to the Official Trustee for all heirs'], a: 1, e: 'An MWPA policy is a trust for the wife (and/or children).', ref: '14.4.4' },
    ],
  },
  {
    id: 'xb-c9', title: 'Mr. Kapur’s family trust', ch: [9, 15], w: 2,
    text: 'Mr. Kapur (68) wants to protect family wealth for his grandchildren. He is considering an irrevocable private trust in which the trustees decide how much each grandchild gets every year. He plans to settle listed shares and a commercial property into the trust during his lifetime. He also gifted a flat to his daughter-in-law last year; it is let out.',
    qs: [
      { q: 'Income of the proposed trust will generally be taxed at:', o: ['Each grandchild’s slab rate', 'The maximum marginal rate (discretionary trust)', '10% flat', 'Nil — trusts are exempt'], a: 1, e: 'Shares are indeterminate → Sec 164, MMR (subject to exceptions).', ref: '15.6.3' },
      { q: 'Transferring the listed shares into the IRREVOCABLE trust:', o: ['Attracts capital gains tax on Mr. Kapur', 'Is not a transfer for capital gains (Sec 47(iii))', 'Attracts gift tax on the trust', 'Requires probate'], a: 1, e: 'Transfer to an irrevocable trust is excluded; to a revocable trust it would be taxable.', ref: '15.6.13' },
      { q: 'Settling the commercial property during his lifetime will attract:', o: ['No stamp duty', 'Stamp duty on the registered settlement deed', 'Only GST', 'Capital gains at 20%'], a: 1, e: 'Stamp duty applies when immovable property is settled in lifetime; none if settled through a will.', ref: '15.6.13' },
      { q: 'Rent from the flat gifted to his daughter-in-law is taxable in the hands of:', o: ['The daughter-in-law', 'His son', 'Mr. Kapur', 'The trust'], a: 2, e: 'Clubbing: income from assets transferred to son’s wife without consideration is included in the transferor’s income.', t: 'trap', ref: '7.4' },
      { q: 'If instead he keeps a power to revoke the trust, the trust income will be taxed:', o: ['At MMR in the trust', 'In Mr. Kapur’s hands (Sec 61)', 'In the grandchildren’s hands', 'Exempt'], a: 1, e: 'Income from a revocable transfer is taxed on the transferor.', ref: '15.6.9' },
    ],
  },
  {
    id: 'xb-c10', title: 'The Guptas come home', ch: [7, 10, 20], w: 2,
    text: 'Mr. and Mrs. Gupta (45), Indian citizens, worked in the USA for 20 years and have now returned to start a venture in India. They own a US house that is let out, hold US tax-deferred retirement accounts, each has a US term policy of US$ 1 million, and their US employer health policy (with worldwide cover) can be renewed by them at year-end.',
    qs: [
      { q: 'In their first year back, they are most likely to be:', o: ['ROR', 'RNOR (non-resident in 9 of the preceding 10 years)', 'Non-resident regardless of stay', 'Deemed resident'], a: 1, e: 'Even if resident by days, being NR in 9 of the preceding 10 years makes them RNOR initially.', ref: '7.2' },
      { q: 'Once they become ROR, their US rental income will be:', o: ['Exempt in India', 'Taxable in India with credit for US taxes under the DTAA', 'Taxable in India without any credit', 'Taxable only in the US'], a: 1, e: 'ROR is taxed on worldwide income; DTAA gives credit.', ref: '7.8, 20.3' },
      { q: 'Income accruing in their US retirement accounts (USA notified under Sec 89A) will be taxed in India:', o: ['Every year on accrual', 'In the year of withdrawal', 'Never', 'Only on their death'], a: 1, e: 'Sec 89A aligns Indian taxation to withdrawal for notified countries.', ref: '10.4' },
      { q: 'Regarding their US life policies, the correct advice is:', o: ['They must surrender them on becoming resident', 'They can continue them, paying premiums from US income or remitting from India', 'Indian residents cannot hold foreign policies', 'They must convert them to Indian policies'], a: 1, e: 'The book’s case answer.', ref: '20.3' },
      { q: 'Best advice on health insurance:', o: ['Drop the US policy and buy only Indian cover', 'Keep the US policy only', 'Keep the US policy and also buy an Indian policy to start building claim-free history', 'Rely on the venture’s group cover'], a: 2, e: 'Builds history and waiting-period credit in India.', ref: '20.3' },
    ],
  },
  {
    id: 'xb-c11', title: 'Mr. Joshi’s debt portfolio', ch: [10, 12], w: 2,
    text: 'Mr. Joshi (resident, 30% slab) sells or redeems the following after 23 July 2024: (1) 200 listed NCDs bought in April 2022 at ₹1,000 each, sold at ₹1,060 each (ex-interest). (2) Unlisted debentures with an identical gain. (3) Units of a debt fund (over 65% debt) bought in June 2023 and redeemed in 2026 with a gain of ₹80,000. (4) Sovereign Gold Bonds bought at issue in 2017 and redeemed at maturity with RBI for a gain of ₹3 lakh; they paid 2.5% interest every year. (5) 364-day T-bills bought at a discount and held to maturity.',
    qs: [
      { q: 'Tax on item (1) is:', o: ['₹1,500 (LTCG 12.5%)', '₹3,600 (slab)', '₹2,400 (20%)', 'Nil'], a: 0, e: 'Listed, held > 12 months → LTCG 200 × 60 = ₹12,000 × 12.5% = ₹1,500.', t: 'calc', ref: '10.2.1' },
      { q: 'Tax on item (2) is:', o: ['₹1,500', '₹3,600', 'Nil', '₹2,400'], a: 1, e: 'Unlisted debentures are always STCG (Sec 50AA) → ₹12,000 × 30% = ₹3,600.', t: 'calc', ref: '10.2.1' },
      { q: 'The gain on item (3) is:', o: ['LTCG at 12.5% (held over 24 months)', 'STCG at slab — always short term', 'Exempt', 'LTCG with indexation'], a: 1, e: 'Debt SMF bought on/after 1-4-2023.', t: 'trap', ref: '10.3.4' },
      { q: 'Statement I: The ₹3 lakh gain on SGB redemption is exempt. Statement II: The 2.5% annual SGB interest is exempt.', o: ['Only I is true', 'Only II is true', 'Both are true', 'Both are false'], a: 0, e: 'Redemption by an individual is not a transfer; interest is taxable at slab (no TDS).', t: 'multi', ref: '12.2.1' },
      { q: 'The discount earned on the T-bills is taxed as:', o: ['Interest at slab', 'STCG at slab', 'LTCG at 12.5%', 'Exempt'], a: 1, e: 'T-bills pay no interest; the gain on redemption is short-term capital gain.', ref: '10.2.2' },
    ],
  },
  {
    id: 'xb-c12', title: 'Mehta’s mind games', ch: [16, 17, 18], w: 2,
    text: 'Rohit Mehta (34), a software engineer with a stable job, no loans and a 25-year horizon, scored “aggressive” on his adviser’s questionnaire. Recently he: refused to sell a stock bought at ₹800 now trading at ₹450, saying he will sell “once it gets back to ₹800”; booked profits within weeks on every stock that rose 10%; put his entire annual bonus into a small-cap fund “because it is extra money”; and wants to move 60% of his portfolio into gold because gold was last year’s top performer.',
    qs: [
      { q: 'Waiting for the stock to return to ₹800 before selling is mainly:', o: ['Anchoring', 'Framing', 'Endowment', 'Choice paralysis'], a: 0, e: 'He is anchored to his purchase price.', ref: '16.3.2' },
      { q: 'Selling winners quickly while holding losers is the:', o: ['Disposition effect (loss aversion)', 'Status quo bias', 'Home bias', 'Overconfidence'], a: 0, e: 'Shefrin & Statman’s disposition effect.', ref: '16.3.1' },
      { q: 'Treating the bonus as “extra money” to take more risk reflects:', o: ['Mental accounting', 'Anchoring', 'Herding', 'Regret aversion'], a: 0, e: 'Money is treated as non-fungible by source.', ref: '16.3.2' },
      { q: 'The best safeguard against his gold switch is:', o: ['A tactical overweight on gold', 'A pre-agreed strategic asset allocation with upper limits per asset class', 'Daily portfolio reviews', 'Switching advisers'], a: 1, e: 'Limits stop chasing past performance.', ref: '17.1' },
      { q: 'Given his profile, the model-portfolio style allocation that fits best is:', o: ['15% equity, 85% debt and liquid', 'About 70% equity (incl. sector), 10% gold, 20% debt and liquid', '100% small-cap', '50% gold, 50% FDs'], a: 1, e: 'Young, stable income, long horizon, aggressive → growth-heavy but diversified.', ref: '18.3.2' },
    ],
  },
  {
    id: 'xb-c13', title: 'The Pillais’ pension gap', ch: [5, 6, 20], w: 2,
    text: 'Mr. Pillai (60) has just retired with a pension of ₹6 lakh a year paid in advance, which rises 3% a year; his wife will receive it for life if he dies first. Their living expenses equal the pension today but rise 6% a year. They also want ₹1 lakh a year (today’s cost, rising 6%) for travel and social occasions, spent at the start of each year. Plan for 25 years. They have a corpus of ₹50 lakh.',
    qs: [
      { q: 'In year 1, the total shortfall to be met from the corpus is:', o: ['Nil', '₹1,00,000', '₹1,18,000', '₹6,00,000'], a: 1, e: 'Expenses equal pension in year 1; only the ₹1 lakh travel budget is unfunded.', t: 'calc', ref: '20.4' },
      { q: 'By year 10 (start), the annual shortfall grows to roughly:', o: ['₹1.7 lakh', '₹2.5 lakh', '₹4.0 lakh', '₹6.0 lakh'], a: 2, e: 'Expense 6 × 1.06⁹ = 10.14 lakh; pension 6 × 1.03⁹ = 7.83 lakh; gap 2.31 + travel 1.69 ≈ ₹4.0 lakh.', t: 'calc', d: 3, ref: '20.4' },
      { q: 'Discounted at 7%, the present value of all 25 years of shortfall is closest to:', o: ['₹40 lakh', '₹50 lakh', '₹58 lakh', '₹76 lakh'], a: 2, e: 'Sum of each year’s gap ÷ 1.07^(t−1) ≈ ₹58.1 lakh (≈ ₹76.3 lakh at 5%).', t: 'calc', d: 3, ref: '20.4' },
      { q: 'Since ₹50 lakh is less than the requirement at 7%, the corpus would need to earn roughly:', o: ['5%', '7%', '8.2%', '12%'], a: 2, e: 'Solving for the rate at which PV of the gaps equals ₹50 lakh gives ≈ 8.2%.', t: 'calc', d: 3, ref: '20.4' },
      { q: 'For the safe part of the corpus, the highest-yielding government scheme mentioned in the workbook case is:', o: ['PPF', 'Senior Citizens’ Savings Scheme (up to ₹30 lakh)', 'Kisan Vikas Patra', 'Sukanya Samriddhi'], a: 1, e: 'SCSS; PSU bank senior-citizen FDs are bank, not government, schemes.', ref: '20.4' },
    ],
  },
  {
    id: 'xb-c14', title: 'Leena, adviser on duty', ch: [18, 19], w: 2,
    text: 'Leena, a SEBI-registered Investment Adviser, is onboarding Mr. Bhatt (58), who retires in 2 years, has two dependants, a home loan, and wants to invest ₹40 lakh. Her firm’s online questionnaire classified him “aggressive” because he said he enjoys stock tips. He wants a free 1-month trial of her advice first, and asks whether to choose an index fund or an ETF on the same index, and whether to buy gold through jewellery or SGBs.',
    qs: [
      { q: 'Under SEBI IA Regulation 16, Leena should:', o: ['Accept the questionnaire result as is', 'Use an objective process assessing both willingness and ability to bear losses, and resolve the inconsistency', 'Only consider his stated preference', 'Skip profiling for HNIs'], a: 1, e: 'Ability factors (age, dependants, loan, near retirement) point to a much lower risk capacity.', ref: '18.2' },
      { q: 'Before any free trial, she must:', o: ['Charge a token fee', 'Communicate his risk profile and obtain his consent on it', 'Get SEBI approval', 'Nothing'], a: 1, e: 'No free trial without a communicated and consented risk profile.', ref: '18.2' },
      { q: 'Compared with an ETF on the same index, an index fund bought from the AMC:', o: ['Trades at real-time prices', 'Transacts at end-of-day NAV without brokerage or bid-ask costs', 'Always has lower expense ratio', 'Needs a demat account'], a: 1, e: 'ETFs carry brokerage, demat costs and spreads; index funds trade at NAV.', ref: '19.2.6' },
      { q: 'Versus jewellery, SGBs offer:', o: ['Making charges and GST', '2.5% interest, no storage or purity worries, tax-free redemption with RBI', 'Daily liquidity at NAV', 'Higher returns guaranteed'], a: 1, e: 'Workbook comparison 19.2.7.', ref: '19.2.7' },
      { q: 'Given two years to retirement and dependants, the allocation approach most appropriate for him is:', o: ['Tactical, mostly equity', 'Strategic, conservative-to-moderate with income and liquidity focus', 'Dynamic 100% equity model', 'All in sector funds'], a: 1, e: 'Short horizon and obligations reduce risk capacity.', ref: '18.3' },
    ],
  },
];
