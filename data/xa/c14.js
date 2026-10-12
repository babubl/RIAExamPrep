// NISM X-A, Chapter 14 — Introduction to Modern Portfolio Theory (Sep 2026, §14.1–14.8)
export default {
  id: 'xa14', exam: 'xa', ch: 14, module: 5,
  title: 'Introduction to Modern Portfolio Theory',
  sections: [
    { h: 'MPT and its assumptions (14.1–14.2)', pts: [
      'Harry Markowitz, “Portfolio Selection”, Journal of Finance, 1952; Nobel Prize 1990.',
      'MPT quantified diversification through covariance/correlation and showed variance of return is a meaningful measure of portfolio risk.',
      'Assumptions: investors maximise return for a given risk (prefer lower risk for equal return); see each investment as a probability distribution of returns; maximise one-period expected utility; diminishing marginal utility of wealth; risk = variability of expected returns; decisions based only on expected return and variance.',
    ]},
    { h: 'Attitudes to risk (14.3)', pts: [
      'Fair game = zero risk premium. Risk-averse investors reject fair games and demand a premium for risk.',
      'Certainty Equivalent Rate (CER): risk-free rate that is as attractive as the risky portfolio. Highly risk-averse investors assign a CER below the risk-free rate and reject the risky portfolio.',
      'Risk-neutral: judge only on expected return; CER = expected return.',
      'Risk-seeking: will engage in a fair game; adjust utility upward for risk.',
    ]},
    { h: 'Return and risk (14.4)', pts: [
      'Expected return = Σ (probability × return). Book: A = 0.3×15 + 0.5×10 + 0.2×2 = 9.9%; B = 17.7%.',
      'Variance = average squared deviation from the mean (sample: divide by n − 1); standard deviation = √variance.',
      'Portfolio expected return = weighted average of asset returns (book: 14.7%).',
      'Two-asset variance = w₁²σ₁² + w₂²σ₂² + 2w₁w₂ρ₁₂σ₁σ₂. Book: 50/50, σ 5% each, ρ 0.5 → σp = 4.33%.',
      'Number of covariance terms = (n² − n)/2 → 3 assets: 3; 50 assets: 1,225.',
    ]},
    { h: 'Frontier and optimisation (14.5–14.8)', pts: [
      'Perfect positive correlation (+1): opportunity set is a straight line; portfolio SD = weighted average SD → no diversification benefit.',
      'Efficient frontier: “umbrella-shaped” set of portfolios giving the highest return for each risk level (or lowest risk for each return). Portfolios below it, or to its right, are sub-optimal.',
      'Optimisation inputs: expected return of every asset, standard deviation of each, and correlations among all; plus investor constraints.',
      'Estimation risk: errors in estimating these many inputs drive output errors (50 securities need 1,225 correlation estimates).',
    ]},
  ],
  keys: [
    'E(R) = Σ pᵢRᵢ',
    'σp² = w₁²σ₁² + w₂²σ₂² + 2w₁w₂ρσ₁σ₂',
    'Covariance terms = (n² − n)/2',
    'ρ = +1 → no diversification benefit',
  ],
  qs: [
    { q: 'Modern Portfolio Theory was introduced by:', o: ['William Sharpe', 'Harry Markowitz', 'Eugene Fama', 'Jack Treynor'], a: 1, e: 'Markowitz’s 1952 paper “Portfolio Selection”; Nobel in 1990.', ref: '14.1' },
    { q: 'A prospect with zero risk premium is called a:', o: ['Risk-free asset', 'Fair game', 'Efficient portfolio', 'Arbitrage'], a: 1, e: 'Fair game = zero risk premium; risk-averse investors reject it.', ref: '14.3' },
    { q: 'For a risk-neutral investor, the certainty equivalent rate of a risky portfolio equals:', o: ['The risk-free rate', 'The expected return of the risky portfolio', 'Zero', 'The expected return minus a risk penalty'], a: 1, e: 'Risk-neutral investors don’t penalise risk.', ref: '14.3' },
    { q: 'A risk-seeking investor:', o: ['Rejects fair games', 'Engages in fair games and adjusts utility upward for risk', 'Ignores returns', 'Holds only risk-free assets'], a: 1, e: 'Risk seekers accept fair games; risk-averse investors adjust utility downward.', ref: '14.3' },
    { q: 'Scenarios: boom (prob 0.25) return 20%, normal (0.50) 12%, recession (0.25) −4%. Expected return is:', o: ['9.33%', '10%', '12%', '8%'], a: 1, e: '0.25×20 + 0.5×12 + 0.25×(−4) = 5 + 6 − 1 = 10%.', t: 'calc', ref: '14.4' },
    { q: 'Portfolio: A 20% weight (9% return), B 10% (12%), C 30% (15%), D 40% (18%). Expected portfolio return:', o: ['13.5%', '14.7%', '15.2%', '12.0%'], a: 1, e: '0.018 + 0.012 + 0.045 + 0.072 = 14.7%.', t: 'calc', ref: '14.4' },
    { q: 'Two assets: weights 60%/40%, SDs 20%/10%, correlation 0.3. Portfolio standard deviation is closest to:', o: ['16.0%', '13.7%', '8.0%', '15.0%'], a: 1, e: 'Var = 0.36×0.04 + 0.16×0.01 + 2×0.6×0.4×0.3×0.2×0.1 = 0.01888 → SD 13.74%.', t: 'calc', d: 3, ref: '14.4' },
    { q: 'If the correlation in the previous question were +1, the portfolio SD would be:', o: ['13.7%', '16%', '8%', '20%'], a: 1, e: 'With ρ = +1, SD = weighted average = 0.6×20 + 0.4×10 = 16% — no diversification benefit.', t: 'calc', ref: '14.5' },
    { q: 'How many covariance terms are there in a portfolio of 10 securities?', o: ['10', '45', '90', '100'], a: 1, e: '(n² − n)/2 = (100 − 10)/2 = 45.', t: 'calc', ref: '14.4' },
    { q: 'A portfolio of 50 securities requires how many correlation estimates?', o: ['50', '1,225', '2,450', '2,500'], a: 1, e: '(2,500 − 50)/2 = 1,225.', t: 'calc', ref: '14.8' },
    { q: 'Portfolios lying BELOW the efficient frontier are:', o: ['Optimal', 'Sub-optimal — not enough return for the risk', 'Unattainable', 'Risk-free'], a: 1, e: 'They give less return for the same risk than frontier portfolios.', ref: '14.6' },
    { q: 'Which input is NOT required for Markowitz portfolio optimisation?', o: ['Expected return of each asset', 'Standard deviation of each asset', 'Correlation among assets', 'Price-to-book ratio of each asset'], a: 3, e: 'MPT needs expected returns, standard deviations and correlations (plus constraints).', ref: '14.7' },
    { q: 'The error arising from estimating returns, risks and correlations is called:', o: ['Model risk', 'Estimation risk', 'Basis risk', 'Tracking error'], a: 1, e: 'The workbook calls it estimation risk.', ref: '14.8' },
    { q: 'Statement I: MPT assumes investors base decisions solely on expected return and variance. Statement II: MPT assumes increasing marginal utility of wealth.', o: ['Only I is true', 'Only II is true', 'Both are true', 'Both are false'], a: 0, e: 'MPT assumes diminishing marginal utility of wealth.', t: 'multi', ref: '14.2' },
    { q: 'Annual returns of a fund were 10%, 15%, −5% and 20%. The sample standard deviation is closest to:', o: ['8.0%', '10.8%', '12.5%', '15.0%'], a: 1, e: 'Mean 10; squared deviations 0, 25, 225, 100 = 350; ÷ (n − 1 = 3) = 116.7; √ = 10.8%.', t: 'calc', d: 3, ref: '14.4' },
  ],
};
