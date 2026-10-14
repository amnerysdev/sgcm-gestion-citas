import { CalendarDays } from "lucide-react";

export default function EmptyAppointments({ onShowAll }) {
  return <div className="empty-state"><div className="empty-icon"><CalendarDays size={27} /></div><h3>No encontramos citas</h3><p>Prueba con otra búsqueda o cambia el filtro seleccionado.</p><button className="text-button" onClick={onShowAll}>Mostrar todas las citas</button></div>;
}