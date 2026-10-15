import { CalendarDays, Clock3, MapPin, MoreHorizontal } from "lucide-react";

export default function AppointmentCard({ appointment, menuOpen, onToggleMenu, onReschedule, onCancel }) {
  const item = appointment;
  return (
    <article className="appointment-card">
      <div className="date-tile"><strong>{item.day}</strong><span>{item.month}</span><i /></div>
      <div className="appointment-main">
        <div className="doctor-line">
          <img className="doctor-photo" src={item.image} alt={`Retrato de ${item.doctor}`} onError={(event) => { event.currentTarget.style.display = "none"; }} />
          <div className="doctor-info"><h3>{item.doctor}</h3><p>{item.specialty}</p></div>
        </div>
        <div className="appointment-meta">
          <span><CalendarDays size={15} />{item.date}</span><span><Clock3 size={15} />{item.time}</span><span><MapPin size={15} />{item.location}</span>
        </div>
      </div>
      <div className="card-actions">
        <span className={`status status-${item.status.toLowerCase()}`}>{item.status === "Confirmada" && <span className="status-dot" />}{item.status}</span>
        <div className="more-wrap">
          <button className="more-button" aria-label="Más opciones" onClick={onToggleMenu}><MoreHorizontal size={20} /></button>
          {menuOpen && <div className="action-menu"><button onClick={onReschedule}>Solicitar cambio</button>{item.status !== "Cancelada" && <button className="danger-action" onClick={onCancel}>Cancelar cita</button>}</div>}
        </div>
      </div>
    </article>
  );
}