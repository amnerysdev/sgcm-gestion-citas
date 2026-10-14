async function request(path, options = {}) {
  const response = await fetch(`/api${path}`, { credentials: 'same-origin', headers: { 'content-type': 'application/json', ...options.headers }, ...options });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'No fue posible completar la solicitud.');
  return payload;
}

export const api = {
  me: () => request('/me'),
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  profile: () => request('/profile'),
  saveProfile: (profile) => request('/profile', { method: 'PUT', body: JSON.stringify(profile) }),
  catalog: () => request('/catalog'),
  availability: (doctorId, date) => request(`/availability?doctorId=${encodeURIComponent(doctorId)}&date=${encodeURIComponent(date)}`),
  appointments: () => request('/appointments'),
  createAppointment: (data) => request('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  updateAppointment: (id, status) => request(`/appointments/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
};
