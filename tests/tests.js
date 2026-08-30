// automated test
// test cases: basic or edge cases
// give the tests names that start with the code or it or nothing, then group the tests with the same categories together.
import { formatCurrency } from "../scripts/money.js";

if(formatCurrency(2095) === '20.95') {
    console.log('passed');
}