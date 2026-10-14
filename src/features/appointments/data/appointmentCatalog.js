import { Apple, Baby, Droplet, Heart, HeartPulse, Smile, Stethoscope } from "lucide-react";

export const specialties = [
  ["general", "Medicina General", Stethoscope], ["cardio", "Cardiología", HeartPulse],
  ["pediatria", "Pediatría", Baby], ["gineco", "Ginecología", Heart],
  ["derma", "Dermatología", Droplet], ["odonto", "Odontología", Smile], ["nutri", "Nutrición", Apple],
];

export const doctors = [
  { id: "maria", name: "Dra. María López", spec: "Medicina General", sid: "general", rating: "4.9", reviews: 124, initials: "ML", color: "lavender" },
  { id: "carlos", name: "Dr. Carlos Rodríguez", spec: "Medicina General", sid: "general", rating: "4.8", reviews: 98, initials: "CR", color: "mint" },
  { id: "ana", name: "Dra. Ana Torres", spec: "Medicina General", sid: "general", rating: "4.7", reviews: 76, initials: "AT", color: "peach" },
  { id: "juan", name: "Dr. Juan Pérez", spec: "Medicina General", sid: "general", rating: "4.6", reviews: 62, initials: "JP", color: "blue" },
  { id: "sofia", name: "Dra. Sofía Méndez", spec: "Cardiología", sid: "cardio", rating: "4.9", reviews: 88, initials: "SM", color: "peach" },
  { id: "miguel", name: "Dr. Miguel Castillo", spec: "Cardiología", sid: "cardio", rating: "4.8", reviews: 64, initials: "MC", color: "mint" },
  { id: "laura", name: "Dra. Laura Jiménez", spec: "Pediatría", sid: "pediatria", rating: "4.9", reviews: 102, initials: "LJ", color: "lavender" },
  { id: "elena", name: "Dra. Elena Vargas", spec: "Ginecología", sid: "gineco", rating: "4.8", reviews: 83, initials: "EV", color: "peach" },
  { id: "pedro", name: "Dr. Pedro Núñez", spec: "Dermatología", sid: "derma", rating: "4.7", reviews: 71, initials: "PN", color: "blue" },
  { id: "lucia", name: "Dra. Lucía Reyes", spec: "Odontología", sid: "odonto", rating: "4.9", reviews: 115, initials: "LR", color: "mint" },
  { id: "paula", name: "Dra. Paula Díaz", spec: "Nutrición", sid: "nutri", rating: "4.8", reviews: 57, initials: "PD", color: "lavender" },
];

export const appointmentTimes = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
export const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
export const padNumber = (value) => String(value).padStart(2, "0");
export const toDateKey = (date) => `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
export const formatAppointmentDate = (date) => new Intl.DateTimeFormat("es-DO", { weekday: "long", day: "numeric", month: "short", year: "numeric" }).format(date);