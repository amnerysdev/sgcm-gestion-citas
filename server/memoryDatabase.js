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
const demo = {
  id: randomUUID(), firstName: 'María', lastName: 'González', email: 'paciente@sgcm.demo', role: 'patient',
  birthDate: '2000-03-15', gender: 'female', phone: '+1 829 123 4567', password: passwordRecord('SGCMdemo123'),
  profile: { name: 'María González', birth: '2000-03-15', nationality: 'Dominicana', document: '001-1234567-8', gender: 'Femenino', civil: 'Soltera', email: 'paciente@sgcm.demo', phone: '+1 829 123 4567', address: 'Av. Los Próceres #123', city: 'Santo Domingo, RD', alternatePhone: '+1 809 555 0142', postalCode: '10114', emergencyName: 'Carlos González', emergencyRelation: 'Hermano', emergencyPhone: '+1 849 555 0182', language: 'Español', notifications: true, reminders: true, contactMethod: 'Correo electrónico', photo: '' },
};
users.set(demo.email, demo);
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
  doctors, specialties: specialties.map(([id, name]) => ({ id, name })), sessions, users, appointments,
  register(data) {
    const email = data.email.trim().toLowerCase();
    if (users.has(email)) throw Object.assign(new Error('Ya existe una cuenta con ese correo electrónico.'), { status: 409 });
    const user = { id: randomUUID(), firstName: data.firstName.trim(), lastName: data.lastName.trim(), email, role: data.userType || 'patient', birthDate: data.birthDate, gender: data.gender || '', phone: data.phone.trim(), password: passwordRecord(data.password), profile: { name: `${data.firstName.trim()} ${data.lastName.trim()}`, birth: data.birthDate, nationality: 'Dominicana', document: '', gender: data.gender || '', civil: '', email, phone: data.phone.trim(), address: '', city: '', alternatePhone: '', postalCode: '', emergencyName: '', emergencyRelation: '', emergencyPhone: '', language: 'Español', notifications: true, reminders: true, contactMethod: 'Correo electrónico', photo: '' } };
    users.set(email, user); return user;
  },
  login(email, password) {
    const user = users.get(email.trim().toLowerCase());
    if (!user || !verifyPassword(password, user.password)) throw Object.assign(new Error('Correo o contraseña incorrectos.'), { status: 401 });
    return user;
  },
  publicUser(user) { const { password, ...safe } = user; return safe; },
  listAppointments(userId) { return [...appointments.values()].filter((row) => row.userId === userId).map(asAppointment).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)); },
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
