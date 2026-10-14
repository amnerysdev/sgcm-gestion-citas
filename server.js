import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { createServer as createViteServer } from 'vite';
import { db } from './server/memoryDatabase.js';

const PORT = Number(process.env.PORT || 5173);
const sessionsCookie = 'sgcm_session';
const cookieValue = (header, name) => header?.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${name}=`))?.slice(name.length + 1);
const send = (response, status, payload, headers = {}) => { response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', ...headers }); response.end(JSON.stringify(payload)); };
async function readJson(request) {
  let raw = ''; for await (const chunk of request) { raw += chunk; if (raw.length > 8_000_000) throw Object.assign(new Error('Solicitud demasiado grande.'), { status: 413 }); }
  try { return JSON.parse(raw || '{}'); } catch { throw Object.assign(new Error('El cuerpo JSON no es válido.'), { status: 400 }); }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  if (!url.pathname.startsWith('/api/')) return;
  const path = url.pathname.replace(/\/$/, '');
  try {
    if (request.method === 'GET' && path === '/api/health') return send(response, 200, { status: 'ok', database: 'memory' });
    if (request.method === 'GET' && path === '/api/catalog') return send(response, 200, { doctors: db.doctors, specialties: db.specialties });
    if (request.method === 'GET' && path === '/api/availability') {
      const { doctorId, date } = Object.fromEntries(url.searchParams);
      return send(response, 200, { bookedTimes: [...db.appointments.values()].filter((item) => item.doctorId === doctorId && item.date === date && item.status !== 'Cancelada').map((item) => item.time) });
    }
    if (request.method === 'POST' && path === '/api/auth/register') {
      const data = await readJson(request);
      if (!data.firstName?.trim() || !data.lastName?.trim() || !/^\S+@\S+\.\S+$/.test(data.email || '') || !data.birthDate || !data.phone?.trim() || (data.password || '').length < 8) throw Object.assign(new Error('Revisa tus datos. La contraseña debe tener al menos 8 caracteres.'), { status: 400 });
      const user = db.register(data); const token = randomBytes(32).toString('hex'); db.sessions.set(token, user.id);
      return send(response, 201, { user: db.publicUser(user) }, { 'set-cookie': `${sessionsCookie}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400` });
    }
    if (request.method === 'POST' && path === '/api/auth/login') {
      const data = await readJson(request); const user = db.login(data.email || '', data.password || ''); const token = randomBytes(32).toString('hex'); db.sessions.set(token, user.id);
      return send(response, 200, { user: db.publicUser(user) }, { 'set-cookie': `${sessionsCookie}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400` });
    }
    if (request.method === 'POST' && path === '/api/auth/logout') {
      const token = cookieValue(request.headers.cookie, sessionsCookie); if (token) db.sessions.delete(token);
      return send(response, 200, { ok: true }, { 'set-cookie': `${sessionsCookie}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0` });
    }
    const token = cookieValue(request.headers.cookie, sessionsCookie);
    const userId = token && db.sessions.get(token);
    const user = userId && [...db.users.values()].find((item) => item.id === userId);
    if (request.method === 'GET' && path === '/api/me') return user ? send(response, 200, { user: db.publicUser(user) }) : send(response, 200, { user: null });
    if (!user) return send(response, 401, { error: 'Inicia sesión para continuar.' });
    if (request.method === 'GET' && path === '/api/profile') return send(response, 200, { profile: user.profile });
    if (request.method === 'PUT' && path === '/api/profile') {
      const patch = await readJson(request);
      const email = (patch.email || user.email).trim().toLowerCase();
      if (!/^\S+@\S+\.\S+$/.test(email) || (db.users.has(email) && email !== user.email)) return send(response, 409, { error: 'Ese correo no es válido o ya está registrado.' });
      if (patch.name !== undefined && !patch.name.trim()) return send(response, 400, { error: 'El nombre no puede quedar vacío.' });
      const previousEmail = user.email;
      user.profile = { ...user.profile, ...patch, email }; user.email = email; user.firstName = user.profile.name.trim().split(/\s+/)[0]; user.lastName = user.profile.name.trim().split(/\s+/).slice(1).join(' '); user.phone = user.profile.phone;
      if (email !== previousEmail) { db.users.delete(previousEmail); db.users.set(email, user); }
      return send(response, 200, { profile: user.profile });
    }
    if (request.method === 'GET' && path === '/api/appointments') return send(response, 200, { appointments: db.listAppointments(user.id) });
    if (request.method === 'POST' && path === '/api/appointments') return send(response, 201, { appointment: db.createAppointment(user.id, await readJson(request)) });
    const match = path.match(/^\/api\/appointments\/([^/]+)$/);
    if (match) {
      const appointment = db.appointments.get(match[1]);
      if (!appointment || appointment.userId !== user.id) return send(response, 404, { error: 'No se encontró la cita.' });
      if (request.method === 'PATCH') {
        const { status } = await readJson(request);
        if (!['Cancelada', 'Pendiente'].includes(status)) return send(response, 400, { error: 'Estado de cita no válido.' });
        appointment.status = status; return send(response, 200, { appointment: db.listAppointments(user.id).find((item) => item.id === appointment.id) });
      }
    }
    return send(response, 404, { error: 'Ruta no encontrada.' });
  } catch (error) { return send(response, error.status || 500, { error: error.status ? error.message : 'Ocurrió un error al procesar la solicitud.' }); }
});

const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
server.on('request', vite.middlewares);
server.listen(PORT, '127.0.0.1', () => console.log(`SGCM disponible en http://localhost:${PORT}`));
