import { useMemo } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { appointmentTimes, monthNames, toDateKey } from "../data/appointmentCatalog.js";
import BookingStep from "./BookingStep.jsx";

export default function AppointmentCalendar({ month, setMonth, date, setDate, time, setTime, onChange }) {
  const cells = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const dayCount = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const previousCount = new Date(month.getFullYear(), month.getMonth(), 0).getDate();
    return Array.from({ length: 42 }, (_, index) => {
      const day = index - offset + 1;
      const outside = day < 1 || day > dayCount;
      const cellDate = day < 1
        ? new Date(month.getFullYear(), month.getMonth() - 1, previousCount + day)
        : day > dayCount
          ? new Date(month.getFullYear(), month.getMonth() + 1, day - dayCount)
          : new Date(month.getFullYear(), month.getMonth(), day);
      return { date: cellDate, outside };
    });
  }, [month]);
  const isAvailable = (value) => ![0, 6].includes(value.getDay()) && value >= new Date(new Date().setHours(0, 0, 0, 0));
  const changeMonth = (offset) => setMonth(new Date(month.getFullYear(), month.getMonth() + offset, 1));

  return (
    <section className="booking-card calendar-card">
      <BookingStep number="3" title="Fecha y hora" />
      <div className="booking-month"><button type="button" onClick={() => changeMonth(-1)} aria-label="Mes anterior"><ChevronLeft /></button><strong>{monthNames[month.getMonth()]} {month.getFullYear()}</strong><button type="button" onClick={() => changeMonth(1)} aria-label="Mes siguiente"><ChevronRight /></button></div>
      <div className="booking-calendar">{["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((label) => <span className="weekday" key={label}>{label}</span>)}{cells.map(({ date: cellDate, outside }, index) => { const available = !outside && isAvailable(cellDate); const chosen = date && toDateKey(date) === toDateKey(cellDate); return <button type="button" key={index} disabled={!available} className={`calendar-day ${outside ? "outside " : ""}${available ? "available " : ""}${chosen ? "chosen" : ""}`} onClick={() => { setDate(cellDate); setTime(""); onChange(); }}>{cellDate.getDate()}</button>; })}</div>
      <div className="booking-times"><div className="time-label"><Clock3 size={18} /><strong>Horarios disponibles</strong></div>{date ? <div className="time-grid">{appointmentTimes.map((value) => <button type="button" key={value} className={time === value ? "chosen" : ""} onClick={() => { setTime(value); onChange(); }}>{value}</button>)}</div> : <p className="booking-hint">Selecciona una fecha disponible para ver los horarios.</p>}</div>
    </section>
  );
}