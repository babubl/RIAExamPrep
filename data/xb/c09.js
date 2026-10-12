// NISM X-B, Chapter 9 — Income from Other Sources (Dec 2025, §9.1–9.4)
export default {
  id: 'xb9', exam: 'xb', ch: 9, module: 9,
  title: 'Income from Other Sources',
  sections: [
    { h: 'Scope (9.1)', pts: [
      'Residual head: income not taxable under salary, house property, business or capital gains.',
      'Includes: dividends (incl. buy-back proceeds), lottery and online-game winnings, interest on securities, rent from machinery/furniture (if not business income), keyman policy receipts (if not business/salary), interest on enhanced compensation, forfeited advance for transfer of a capital asset, deemed income u/s 56(2), compensation on termination of employment, life-policy receipts above premiums paid (non-exempt, non-ULIP), specified sums from business trusts.',
      'Always taxed here: dividends, interest on securities held as investment, forfeited advance money, deemed income u/s 56(2), specified business-trust receipts.',
    ]},
    { h: 'Dividends (9.2)', pts: [
      'Deemed dividend (Sec 2(22)): distribution of accumulated profits releasing assets; debentures/bonus to preference holders out of profits; distribution on liquidation or capital reduction out of profits; loans by closely held company to shareholders; buy-back payments.',
      'DDT abolished from AY 2021-22: dividends taxed in the shareholder’s hands at slab rates (residents); for non-residents subject to DTAA.',
      'From 1 October 2024: buy-back proceeds are taxed as dividend with no expense deduction; the cost of the shares bought back becomes a capital loss for the shareholder.',
      'TDS under Sec 194 (company) / 194K (mutual fund).',
    ]},
    { h: 'Interest on securities (9.3)', pts: [
      'Sec 2(28B): interest on Central/State government securities and on debentures of local authorities, companies or statutory corporations.',
      'Taxed on accrual (mercantile) or receipt (cash) basis per the method regularly followed (Sec 145).',
      'Deductions: collection charges, interest on money borrowed to buy the securities, other revenue expenses wholly for earning the income.',
      'Securities held as stock-in-trade → business income on sale; held as investment → capital gains.',
      'Foreign-currency interest converted at SBI TT buying rate on the last day of the month before the income is due (or the TDS date).',
    ]},
    { h: 'Gifts of securities (9.4)', pts: [
      'Movable property (incl. shares/securities) received without or for inadequate consideration is taxable if the aggregate FMV (or the shortfall) in the year exceeds ₹50,000 — then the WHOLE amount is taxable.',
      'FMV per Rule 11UA.',
      'Exempt: on marriage; under will/inheritance; in contemplation of death; from specified relatives, local authority, specified funds/trusts/institutions, registered trusts; HUF partition.',
      'Relatives include spouse, children, parents, siblings and their spouses, spouse’s siblings, grandparents, lineal ascendants/descendants, parents’ siblings and their spouses, in-laws. NOT relatives: step-brother/sister, nephew/niece, cousins.',
    ]},
  ],
  keys: [
    'Gift > ₹50,000 aggregate in a year → entire amount taxable',
    'Nephew, niece, cousin are NOT “relatives”',
    'Buy-back (from 1-10-2024) = dividend; cost → capital loss',
  ],
  qs: [
    { q: 'Winnings from a lottery are taxable under:', o: ['Capital gains', 'Business income', 'Income from other sources', 'Exempt'], a: 2, e: 'Lotteries and online-game winnings fall under Other Sources.', ref: '9.1' },
    { q: 'Advance money received for a proposed sale of land, forfeited when the deal falls through, is taxed as:', o: ['Capital gain', 'Reduction of cost of acquisition', 'Income from other sources', 'Exempt'], a: 2, e: 'It is always taxable under Other Sources.', ref: '9.1' },
    { q: 'A loan given by a closely held company to a shareholder out of accumulated profits is:', o: ['Exempt', 'Deemed dividend', 'Capital receipt', 'Business income of the company'], a: 1, e: 'Sec 2(22) treats it as deemed dividend.', ref: '9.2' },
    { q: 'Shares bought for ₹4 lakh are tendered in a company buy-back on 1 December 2025 for ₹6 lakh. The tax treatment is:', o: ['₹2 lakh capital gain', '₹6 lakh dividend under Other Sources; ₹4 lakh capital loss', 'Fully exempt', '₹2 lakh dividend'], a: 1, e: 'From 1-10-2024, buy-back proceeds are dividend; the cost becomes a capital loss.', t: 'trap', d: 3, ref: '9.2' },
    { q: 'Dividends from Indian companies received by a resident individual are taxed:', o: ['At 10% flat', 'Exempt after DDT', 'At slab rates', 'At 20%'], a: 2, e: 'Since DDT abolition, at the shareholder’s slab rate.', ref: '9.2' },
    { q: 'Interest on securities is taxed on:', o: ['Receipt basis always', 'Accrual basis always', 'Accrual or receipt basis per the accounting method regularly employed', 'Maturity only'], a: 2, e: 'Sec 145: mercantile (accrual) or cash (receipt).', ref: '9.3' },
    { q: 'Which is NOT a permissible deduction from interest on securities?', o: ['Collection charges', 'Interest on money borrowed to buy the securities', 'Personal travel expenses', 'Revenue expense wholly for earning the income'], a: 2, e: 'Only expenses wholly and exclusively for earning the income.', ref: '9.3' },
    { q: 'Rohan receives shares worth ₹30,000 from his friend and ₹35,000 from a colleague in the same year. Taxable amount:', o: ['Nil', '₹15,000', '₹65,000', '₹35,000'], a: 2, e: 'Aggregate ₹65,000 exceeds ₹50,000 → the whole ₹65,000 is taxable.', t: 'calc', ref: '9.4.1' },
    { q: 'Gifts of shares from which person are taxable if above ₹50,000?', o: ['Father’s brother', 'Wife’s sister', 'Cousin', 'Grandson’s wife'], a: 2, e: 'Cousins are not relatives; the others are.', t: 'trap', ref: '9.4.3' },
    { q: 'Statement I: Shares received on the occasion of one’s marriage from friends are exempt. Statement II: Shares received from a nephew worth ₹1 lakh are exempt.', o: ['Only I is true', 'Only II is true', 'Both are true', 'Both are false'], a: 0, e: 'Marriage gifts are exempt from anyone; a nephew is not a relative.', t: 'multi', ref: '9.4.3' },
    { q: 'Shares with FMV ₹2,00,000 are bought from a non-relative for ₹1,70,000. Taxable under Other Sources:', o: ['Nil', '₹30,000', '₹2,00,000', '₹1,70,000'], a: 0, e: 'Shortfall of ₹30,000 does not exceed ₹50,000 → nil.', t: 'calc', ref: '9.4.1' },
    { q: 'The FMV of gifted shares for this provision is determined under:', o: ['Rule 11UA', 'Sec 50C', 'Rule 115A', 'CII table'], a: 0, e: 'Rule 11UA of the IT Rules.', ref: '9.4.2' },
  ],
};
