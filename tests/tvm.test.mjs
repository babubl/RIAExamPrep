import test from 'node:test';
import assert from 'node:assert/strict';
import { FV, PV, PMT, NPER, RATE, realRate, cagr, effAnnual } from '../js/engine.js';

const near = (a, b, tol = 0.5) => assert.ok(Math.abs(a - b) <= tol, `${a} vs ${b}`);

test('PMT: EMI on 40 lakh at 9% for 20 years', () => near(PMT(0.09 / 12, 240, 4000000), -35989.04, 0.05));
test('FV: 50,000 inflated at 6% for 20 years', () => near(FV(0.06, 20, 0, -50000), 160356.77, 0.05));
test('PV annuity due: X-B case 1 corpus (0.91% real, 15 years)', () => near(PV(0.0091, 15, -1028922.63, 0, 1), 14496632, 5));
test('PV: Adil needs-based cover corpus (X-B practice Q1)', () => near(PV(realRate(0.08, 0.06), 30, -300000), 6824711.97, 5));
test('RATE: insurance plan return (X-B practice Q2) ≈ 5.3%', () => near(RATE(20, -5850, 0, 200000) * 100, 5.3, 0.05));
test('NPER: doubling at 9% ≈ 8.04 years', () => near(NPER(0.09, 0, -1, 2), 8.04, 0.01));
test('round trips', () => {
  const pmt = PMT(0.01, 180, 0, -10000000); near(pmt, 20016.8, 0.5);
  near(FV(0.01, 180, -pmt), 10000000, 1);
  near(RATE(180, -pmt, 0, 10000000), 0.01, 1e-9);
  near(NPER(0.01, -pmt, 0, 10000000), 180, 1e-6);
});
test('zero rate', () => { assert.equal(FV(0, 10, -100), 1000); assert.equal(PMT(0, 10, 1000), -100); });
test('helpers', () => { near(realRate(0.08, 0.06), 0.018868, 1e-6); near(cagr(100, 200, 6), 0.122462, 1e-6); near(effAnnual(0.12, 4), 0.125509, 1e-6); });
