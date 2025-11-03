const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function register({ name, email, password }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export function saveToken(token) {
  localStorage.setItem('kanban_token', token);
}

export function getToken() {
  return localStorage.getItem('kanban_token');
}

export function logout() {
  localStorage.removeItem('kanban_token');
}

export function authHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}