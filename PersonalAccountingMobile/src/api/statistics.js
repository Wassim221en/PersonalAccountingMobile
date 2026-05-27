import { api } from './client';

// GET api/Transactions/GetStatistics
// Params: Year (default current), Month (optional → daily breakdown), Currency (optional → all 3)
// Response shape: { year, month, currencies: [{ currency, totalIncome, totalExpense, balance,
//                  monthlyBreakdown[], categoryBreakdown[], dailyBreakdown[] }] }
export function getStatistics({ year, month, currency } = {}) {
  const query = {};
  if (year) query.Year = year;
  if (month) query.Month = month;
  if (currency) query.Currency = currency;
  return api.get('api/Transactions/GetStatistics', { query });
}
