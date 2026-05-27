import { api } from './client';

// GET api/Categories/GetAll?Type=Expense|Income
export function getCategories({ type } = {}) {
  return api.get('api/Categories/GetAll', { query: type ? { Type: type } : undefined });
}

// GET api/Categories/GetById?Id=guid
export function getCategoryById(id) {
  return api.get('api/Categories/GetById', { query: { Id: id } });
}

// POST api/Categories/Add  Body: { name, type }
export function addCategory({ name, type }) {
  return api.post('api/Categories/Add', { name, type });
}

// POST api/Categories/Modify  Body: { id, name, type }
export function modifyCategory({ id, name, type }) {
  return api.post('api/Categories/Modify', { id, name, type });
}

// POST api/Categories/Delete  Body: { id }
export function deleteCategory(id) {
  return api.post('api/Categories/Delete', { id });
}
