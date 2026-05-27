import { api } from './client';

// GET api/Transactions/GetDashboard
// Response: { currentMonth: { totalIncome, totalExpense, balance }, recentTransactions, topExpenses }
export function getDashboard(options) {
  return api.get('api/Transactions/GetDashboard', options);
}
