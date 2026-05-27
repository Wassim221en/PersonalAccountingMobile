import { api } from './client';

// GET api/Transactions/GetAll
// Params: DateFrom, DateTo, Type, CategoryId, Currency, PageIndex, PageSize (all optional)
export function getTransactions(params = {}) {
  const query = {};
  if (params.dateFrom) query.DateFrom = params.dateFrom;
  if (params.dateTo) query.DateTo = params.dateTo;
  if (params.type) query.Type = params.type;
  if (params.categoryId) query.CategoryId = params.categoryId;
  if (params.currency) query.Currency = params.currency;
  if (params.pageIndex) query.PageIndex = params.pageIndex;
  if (params.pageSize) query.PageSize = params.pageSize;
  return api.get('api/Transactions/GetAll', { query });
}

export function getTransactionById(id) {
  return api.get('api/Transactions/GetById', { query: { Id: id } });
}

// POST api/Transactions/Add
// Body: { amount, currency, note, date, categoryId }
// `date` must be an ISO string with Damascus offset (+03:00 / +02:00).
// `currency` is one of "SYP" | "USD" | "EUR".
export function addTransaction({ amount, currency, note, date, categoryId }) {
  return api.post('api/Transactions/Add', {
    amount,
    currency,
    note: note || null,
    date,
    categoryId,
  });
}

export function modifyTransaction({ id, amount, currency, note, date, categoryId }) {
  return api.post('api/Transactions/Modify', {
    id,
    amount,
    currency,
    note: note || null,
    date,
    categoryId,
  });
}

export function deleteTransaction(id) {
  return api.post('api/Transactions/Delete', { id });
}
