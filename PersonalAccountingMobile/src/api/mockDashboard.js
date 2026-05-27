// Fallback dataset used when the backend is unreachable, so the UI is still browsable
// (e.g. running `npm run web` without the API server up).
export const mockDashboard = {
  currentBalances: [
    { currency: 'SYP', totalIncome: 2750000, totalExpense: 300000, balance: 2450000 },
    { currency: 'USD', totalIncome: 1200, totalExpense: 450, balance: 750 },
    { currency: 'EUR', totalIncome: 600, totalExpense: 200, balance: 400 },
  ],
  recentTransactions: [
    {
      id: '1',
      amount: 150000,
      currency: 'SYP',
      note: 'تحويل من أحمد خالد',
      date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      categoryName: 'تحويل من أحمد خالد',
      categoryType: 'Income',
    },
    {
      id: '2',
      amount: 42500,
      currency: 'SYP',
      note: 'فاتورة الكهرباء',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'فاتورة الكهرباء',
      categoryType: 'Expense',
    },
    {
      id: '3',
      amount: 85,
      currency: 'USD',
      note: 'سوبر ماركت الهدى',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'سوبر ماركت الهدى',
      categoryType: 'Expense',
    },
  ],
  topExpenses: [],
};
