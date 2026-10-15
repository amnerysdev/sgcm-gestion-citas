import { randomBytes, scryptSync, timingSafeEqual, randomUUID } from 'node:crypto';

const specialties = [
  ['general', 'Medicina General'], ['cardio', 'Cardiología'], ['pediatria', 'Pediatría'],
  ['gineco', 'Ginecología'], ['derma', 'Dermatología'], ['odonto', 'Odontología'], ['nutri', 'Nutrición'],
];
const doctors = [
  ['maria', 'Dra. María López', 'general'], ['carlos', 'Dr. Carlos Rodríguez', 'general'], ['ana', 'Dra. Ana Torres', 'general'], ['juan', 'Dr. Juan Pérez', 'general'],
  ['sofia', 'Dra. Sofía Méndez', 'cardio'], ['miguel', 'Dr. Miguel Castillo', 'cardio'], ['laura', 'Dra. Laura Jiménez', 'pediatria'],
  ['elena', 'Dra. Elena Vargas', 'gineco'], ['pedro', 'Dr. Pedro Núñez', 'derma'], ['lucia', 'Dra. Lucía Reyes', 'odonto'], ['paula', 'Dra. Paula Díaz', 'nutri'],
].map(([id, name, specialtyId]) => ({ id, name, specialtyId, specialty: specialties.find(([key]) => key === specialtyId)[1] }));

const passwordRecord = (password) => {
  const salt = randomBytes(16);
  return { salt: salt.toString('hex'), hash: scryptSync(password, salt, 64).toString('hex') };
};
const verifyPassword = (password, record) => {
  const actual = scryptSync(password, Buffer.from(record.salt, 'hex'), 64);
  return timingSafeEqual(actual, Buffer.from(record.hash, 'hex'));
};
const users = new Map();
const sessions = new Map();
const appointments = new Map();
const specialistAppointments = new Map();
const schedules = new Map();
const scheduleDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const localDateKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const defaultSchedule = () => ({ weekly: scheduleDays.map((day, index) => ({ day, enabled: index < 5, blocks: index < 5 ? [{ start: '08:00', end: '12:00' }, { start: '14:00', end: '17:00' }] : [] })), exceptions: [] });
const demo = {
  id: randomUUID(), firstName: 'María', lastName: 'González', email: 'paciente@sgcm.demo', role: 'patient',
  birthDate: '2000-03-15', gender: 'female', phone: '+1 829 123 4567', password: passwordRecord('SGCMdemo123'),
  profile: { name: 'María González', birth: '2000-03-15', nationality: 'Dominicana', document: '001-1234567-8', gender: 'Femenino', civil: 'Soltera', email: 'paciente@sgcm.demo', phone: '+1 829 123 4567', address: 'Av. Los Próceres #123', city: 'Santo Domingo, RD', alternatePhone: '+1 809 555 0142', postalCode: '10114', emergencyName: 'Carlos González', emergencyRelation: 'Hermano', emergencyPhone: '+1 849 555 0182', language: 'Español', notifications: true, reminders: true, contactMethod: 'Correo electrónico', photo: '' },
};
users.set(demo.email, demo);
const demoSpecialist = {
  id: 'demo-specialist', firstName: 'Ana', lastName: 'Torres', email: 'especialista@sgcm.demo', role: 'specialist',
  birthDate: '1988-05-12', gender: 'female', phone: '+1 809 555 0140', password: passwordRecord('DoctorDemo123'),
  profile: { name: 'Dra. Valeria Castillo', birth: '1988-05-12', nationality: 'Dominicana', document: '', gender: 'female', civil: '', email: 'especialista@sgcm.demo', phone: '+1 809 555 0198', address: 'Consultorio 304, Centro Médico Demostrativo', city: 'Santiago de los Caballeros', alternatePhone: '+1 829 555 0164', postalCode: '', emergencyName: '', emergencyRelation: '', emergencyPhone: '', language: 'Español', notifications: true, reminders: true, contactMethod: 'Correo electrónico', photo: '', specialty: 'Cardiología', licenseNumber: 'DEMO-EXQ-7842', yearsExperience: '9', education: 'Doctorado en Medicina · Universidad Autónoma de Santo Domingo', biography: 'Especialista en cardiología con enfoque en prevención, evaluación cardiovascular y acompañamiento integral del paciente.' },
};
users.set(demoSpecialist.email, demoSpecialist);
[
  ['sp-1','María Pérez','001234','2026-10-14','09:00','Consulta general','Confirmada','809-555-1234','maria.perez@email.com','Dolor de cabeza recurrente','blue'],
  ['sp-2','José Castillo','001235','2026-10-14','10:30','Seguimiento','Confirmada','809-555-2345','jose.castillo@email.com','Seguimiento de tratamiento','purple'],
  ['sp-3','Sofía López','001236','2026-10-14','12:00','Resultado de laboratorios','En espera','809-555-3456','sofia.lopez@email.com','Revisión de resultados','pink'],
  ['sp-4','Andrés Rodríguez','001237','2026-10-14','14:00','Consulta general','Confirmada','809-555-4567','andres.rodriguez@email.com','Consulta de rutina','mint'],
  ['sp-5','Carla Castro','001238','2026-10-14','16:30','Control','Confirmada','809-555-5678','carla.castro@email.com','Control preventivo','orange'],
  ['sp-6','Luis Gómez','001239','2026-10-15','09:00','Consulta general','En espera','809-555-6789','luis.gomez@email.com','Consulta general','purple'],
  ['sp-7','Elena Martínez','001240','2026-10-16','11:00','Seguimiento','Confirmada','809-555-7890','elena.martinez@email.com','Seguimiento','mint'],
  ['sp-8','Pedro Sánchez','001241','2026-10-12','08:30','Control','Completada','809-555-8901','pedro.sanchez@email.com','Control anual','orange'],
  ['sp-9','Laura Díaz','001242','2026-10-10','13:30','Consulta general','Completada','809-555-9012','laura.diaz@email.com','Dolor de espalda','pink'],
  ['sp-10','Miguel Núñez','001243','2026-10-18','10:00','Seguimiento','Confirmada','809-555-0123','miguel.nunez@email.com','Seguimiento','blue'],
  ['sp-11','Daniela Reyes','001244','2026-10-20','15:00','Consulta general','En espera','809-555-1122','daniela.reyes@email.com','Consulta general','purple'],
  ['sp-12','Raúl Medina','001245','2026-10-08','09:30','Control','Cancelada','809-555-2233','raul.medina@email.com','Control','mint'],
].forEach(([id,name,patientId,date,time,consultationType,status,phone,email,reason,color]) => specialistAppointments.set(id, { id, specialistId: demoSpecialist.id, name, patientId, date, time, consultationType, status, phone, email, reason, color, note: '' }));
[
  { id: 'demo-1', doctorId: 'laura', doctorName: 'Dra. Laura Jiménez', specialty: 'Pediatría', date: '2026-10-22', time: '09:30', status: 'Confirmada' },
  { id: 'demo-2', doctorId: 'carlos', doctorName: 'Dr. Carlos Rodríguez', specialty: 'Medicina General', date: '2026-10-27', time: '14:00', status: 'Pendiente' },
  { id: 'demo-3', doctorId: 'sofia', doctorName: 'Dra. Sofía Méndez', specialty: 'Cardiología', date: '2026-09-08', time: '10:15', status: 'Completada' },
].forEach((row) => appointments.set(row.id, { ...row, userId: demo.id }));

function asAppointment(row) {
  const date = new Date(`${row.date}T12:00:00`);
  return { ...row, dateKey: row.date, time24: row.time, day: new Intl.DateTimeFormat('es-DO', { day: '2-digit' }).format(date), month: new Intl.DateTimeFormat('es-DO', { month: 'short' }).format(date).replace('.', '').toUpperCase(), date: new Intl.DateTimeFormat('es-DO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date), time: new Intl.DateTimeFormat('es-DO', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(`${row.date}T${row.time}:00`)), doctor: row.doctorName, specialty: row.specialty, location: 'Consultorio 204', image: '', type: row.status === 'Completada' || row.status === 'Cancelada' ? 'past' : 'upcoming' };
}

export const db = {
  doctors, specialties: specialties.map(([id, name]) => ({ id, name })), sessions, users, appointments, schedules, specialistAppointments,
  getSchedule(userId) {
    if (!schedules.has(userId)) schedules.set(userId, defaultSchedule());
    return structuredClone(schedules.get(userId));
  },
  saveSchedule(userId, value) {
    const fail = (message) => { throw Object.assign(new Error(message), { status: 400 }); };
    if (!value || !Array.isArray(value.weekly) || value.weekly.length !== 7 || !Array.isArray(value.exceptions)) fail('El horario enviado no es válido.');
    const weekly = scheduleDays.map((day, index) => {
      const item = value.weekly[index];
      if (!item || item.day !== day || typeof item.enabled !== 'boolean' || !Array.isArray(item.blocks) || item.blocks.length > 6) fail('Revisa los días y bloques del horario.');
      const blocks = item.blocks.map(({ start, end }) => {
        if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(start) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(end) || start >= end) fail(`El bloque de ${day} tiene horas inválidas.`);
        return { start, end };
      }).sort((a, b) => a.start.localeCompare(b.start));
      if (item.enabled && !blocks.length) fail(`${day} debe tener al menos un bloque o estar desactivado.`);
      if (blocks.some((block, i) => i > 0 && blocks[i - 1].end > block.start)) fail(`Los bloques de ${day} no pueden superponerse.`);
      return { day, enabled: item.enabled, blocks };
    });
    const seen = new Set();
    const exceptions = value.exceptions.map((item) => {
      const date = new Date(`${item.date}T12:00:00`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date) || Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== item.date || item.date < localDateKey() || seen.has(item.date) || typeof item.reason !== 'string' || item.reason.length > 100) fail('Revisa las fechas y motivos de las excepciones.');
      seen.add(item.date); return { id: String(item.id || item.date), date: item.date, reason: item.reason.trim() };
    });
    const schedule = { weekly, exceptions };
    schedules.set(userId, schedule);
    return structuredClone(schedule);
  },
  register(data) {
    const email = data.email.trim().toLowerCase();
    if (users.has(email)) throw Object.assign(new Error('Ya existe una cuenta con ese correo electrónico.'), { status: 409 });
    const role = data.userType === 'specialist' ? 'specialist' : 'patient';
    const profile = { name: `${data.firstName.trim()} ${data.lastName.trim()}`, birth: data.birthDate, nationality: 'Dominicana', document: '', gender: data.gender || '', civil: '', email, phone: data.phone.trim(), address: '', city: '', alternatePhone: '', postalCode: '', emergencyName: '', emergencyRelation: '', emergencyPhone: '', language: 'Español', notifications: true, reminders: true, contactMethod: 'Correo electrónico', photo: '' };
    if (role === 'specialist') Object.assign(profile, { specialty: '', licenseNumber: '', yearsExperience: '', education: '', biography: '' });
    const user = { id: randomUUID(), firstName: data.firstName.trim(), lastName: data.lastName.trim(), email, role, birthDate: data.birthDate, gender: data.gender || '', phone: data.phone.trim(), password: passwordRecord(data.password), profile };
    users.set(email, user); return user;
  },
  login(email, password) {
    const user = users.get(email.trim().toLowerCase());
    if (!user || !verifyPassword(password, user.password)) throw Object.assign(new Error('Correo o contraseña incorrectos.'), { status: 401 });
    return user;
  },
  publicUser(user) { const { password, ...safe } = user; return safe; },
  listAppointments(userId) { return [...appointments.values()].filter((row) => row.userId === userId).map(asAppointment).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)); },
  listSpecialistAppointments(specialistId) { return [...specialistAppointments.values()].filter((row) => row.specialistId === specialistId).map((row) => ({ ...row, dateKey: row.date, time24: row.time })).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)); },
  createSpecialistAppointment(specialistId, data) {
    const validStatuses = ['Confirmada', 'En espera', 'Completada', 'Cancelada'];
    const date = new Date(`${data.date}T12:00:00`);
    if (typeof data.name !== 'string' || !data.name.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(data.date || '') || Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== data.date || !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.time || '') || typeof data.consultationType !== 'string' || !data.consultationType.trim() || !validStatuses.includes(data.status || 'Confirmada') || (data.email && !/^\S+@\S+\.\S+$/.test(data.email))) throw Object.assign(new Error('Revisa el nombre, la fecha, la hora y el tipo de consulta.'), { status: 400 });
    if ([...specialistAppointments.values()].some((row) => row.specialistId === specialistId && row.date === data.date && row.time === data.time && row.status !== 'Cancelada')) throw Object.assign(new Error('Ya existe una cita en esa fecha y hora.'), { status: 409 });
    const row = { id: randomUUID(), specialistId, name: data.name.trim(), patientId: data.patientId?.trim() || `SG-${String(Date.now()).slice(-6)}`, date: data.date, time: data.time, consultationType: data.consultationType.trim(), status: data.status || 'Confirmada', phone: data.phone?.trim() || '', email: data.email?.trim() || '', reason: data.reason?.trim() || '', color: data.color || 'blue', note: '' };
    specialistAppointments.set(row.id, row); return { ...row, dateKey: row.date, time24: row.time };
  },
  updateSpecialistAppointment(specialistId, id, patch) {
    const row = specialistAppointments.get(id);
    if (!row || row.specialistId !== specialistId) throw Object.assign(new Error('No se encontró la cita.'), { status: 404 });
    const allowed = ['name', 'patientId', 'date', 'time', 'consultationType', 'status', 'phone', 'email', 'reason', 'note'];
    const updates = Object.fromEntries(Object.entries(patch || {}).filter(([key]) => allowed.includes(key)));
    const next = { ...row, ...updates };
    const date = new Date(`${next.date}T12:00:00`);
    if (typeof next.name !== 'string' || !next.name.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(next.date || '') || Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== next.date || !/^([01]\d|2[0-3]):[0-5]\d$/.test(next.time || '') || typeof next.consultationType !== 'string' || !next.consultationType.trim() || !['Confirmada', 'En espera', 'Completada', 'Cancelada'].includes(next.status) || (next.email && !/^\S+@\S+\.\S+$/.test(next.email)) || typeof next.note !== 'string' || next.note.length > 4000) throw Object.assign(new Error('Los datos de la cita no son válidos.'), { status: 400 });
    if (next.status !== 'Cancelada' && specialistAppointments.size && [...specialistAppointments.values()].some((other) => other.id !== id && other.specialistId === specialistId && other.date === next.date && other.time === next.time && other.status !== 'Cancelada')) throw Object.assign(new Error('Ya existe otra cita en esa fecha y hora.'), { status: 409 });
    if (specialistAppointments.size && [...specialistAppointments.values()].some((other) => other.id !== id && other.specialistId === specialistId && other.date === next.date && other.time === next.time && other.status !== 'Cancelada' && next.status !== 'Cancelada')) throw Object.assign(new Error('Ya existe otra cita en esa fecha y hora.'), { status: 409 });
    Object.assign(row, updates); return { ...row, dateKey: row.date, time24: row.time };
  },
  createAppointment(userId, data) {
    const doctor = doctors.find((item) => item.id === data.doctorId);
    const validTimes = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
    if (!doctor || !/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !validTimes.includes(data.time)) throw Object.assign(new Error('Selecciona un médico, una fecha y un horario válidos.'), { status: 400 });
    const date = new Date(`${data.date}T12:00:00`);
    const normalizedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    if (Number.isNaN(date.valueOf()) || normalizedDate !== data.date || date < new Date(new Date().toDateString()) || [0, 6].includes(date.getDay())) throw Object.assign(new Error('La fecha seleccionada no está disponible.'), { status: 400 });
    if (appointments.size && [...appointments.values()].some((row) => row.doctorId === doctor.id && row.date === data.date && row.time === data.time && row.status !== 'Cancelada')) throw Object.assign(new Error('Ese horario ya está reservado. Elige otro.'), { status: 409 });
    const row = { id: randomUUID(), userId, doctorId: doctor.id, doctorName: doctor.name, specialty: doctor.specialty, date: data.date, time: data.time, status: 'Confirmada' };
    appointments.set(row.id, row); return asAppointment(row);
  },
};
