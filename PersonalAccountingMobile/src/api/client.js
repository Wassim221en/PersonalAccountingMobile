import { apiBaseUrl } from '../config/env';

// Thin fetch wrapper that unwraps the backend's OperationResponse<T> envelope:
//   { success, statusCode, errorMessage, data }
async function request(method, path, { query, body, signal } = {}) {
  const url = new URL(path.replace(/^\//, ''), apiBaseUrl.replace(/\/?$/, '/'));
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.append(k, String(v));
    });
  }

  const res = await fetch(url.toString(), {
    method,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  let envelope = null;
  try {
    envelope = await res.json();
  } catch (_) {
    // Non-JSON response (e.g. 5xx HTML page). Fall through to generic error.
  }

  if (!res.ok || (envelope && envelope.success === false)) {
    const message =
      envelope?.errorMessage?.message ||
      envelope?.errorMessage ||
      `Request failed with status ${res.status}`;
    const err = new Error(typeof message === 'string' ? message : 'Request failed');
    err.statusCode = envelope?.statusCode ?? res.status;
    throw err;
  }

  return envelope?.data ?? envelope;
}

export const api = {
  get: (path, options) => request('GET', path, options),
  post: (path, body, options) => request('POST', path, { ...options, body }),
};
