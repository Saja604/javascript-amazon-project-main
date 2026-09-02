// automated test
// test cases: basic or edge cases
// give the tests names that start with the code or it or nothing, then group the tests with the same categories together.

import { formatCurrency } from "../scripts/money.js";

describe('test suite: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(3674)).toEqual('36.74');
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    })

    it('rounds up to the nearest cent', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })
});