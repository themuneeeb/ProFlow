// src/services/authService.js
const API = import.meta.env.VITE_API_URL

export async function signup({ name, email, password, confirmPassword }) {
  const res = await fetch(`${API}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, confirmPassword }),
  })
  if (!res.ok) throw new Error((await res.json()).message || res.statusText)
  return res.json()  // { token }
}

export async function login({ email, password }) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error((await res.json()).message || res.statusText)
  return res.json() // { token }
}
