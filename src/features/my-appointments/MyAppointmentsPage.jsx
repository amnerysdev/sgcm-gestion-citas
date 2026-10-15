import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, HeartPulse, X } from "lucide-react";
import { api } from "../../api.js";
import AppointmentStats from "./components/AppointmentStats.jsx";
import AppointmentFilters from "./components/AppointmentFilters.jsx";
import AppointmentCard from "./components/AppointmentCard.jsx";
import EmptyAppointments from "./components/EmptyAppointments.jsx";
import AppointmentReminders from "./components/AppointmentReminders.jsx";

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [tab, setTab] = useState("upcoming");
  const [query, setQuery] = useState("");
  const [menuFor, setMenuFor] = useState(null);
  const [notice, setNotice] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => { api.appointments().then(({ appointments: rows }) => setAppointments(rows)).catch((error) => showNotice(error.message)); }, []);
  useEffect(() => {
    if (menuFor === null) return;
    const closeOnOutsideClick = (event) => {
      if (!(event.target instanceof Element) || !event.target.closest(".more-wrap")) setMenuFor(null);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [menuFor]);

  const filtered = useMemo(() => appointments.filter((appointment) => {
    const matchesTab = tab === "all" || appointment.type === tab;
    const text = `${appointment.doctor} ${appointment.specialty} ${appointment.status}`.toLowerCase();
    return matchesTab && text.includes(query.toLowerCase().trim());
  }), [appointments, tab, query]);
  const upcomingCount = appointments.filter((appointment) => appointment.type === "upcoming" && appointment.status !== "Cancelada").length;
  const completedCount = appointments.filter((appointment) => appointment.status === "Completada").length;
  const nextAppointment = appointments.filter((appointment) => appointment.type === "upcoming" && appointment.status !== "Cancelada").sort((a, b) => a.dateKey.localeCompare(b.dateKey) || a.time24.localeCompare(b.time24))[0];

  function showNotice(message) { setNotice(message); window.setTimeout(() => setNotice(""), 3500); }
  async function cancelAppointment(id) {
    try { const { appointment } = await api.updateAppointment(id, "Cancelada"); setAppointments((items) => items.map((item) => item.id === id ? appointment : item)); showNotice("La cita quedó cancelada."); }
    catch (error) { showNotice(error.message); }
    setMenuFor(null);
  }
  async function rescheduleAppointment(id) {
    try { const { appointment } = await api.updateAppointment(id, "Pendiente"); setAppointments((items) => items.map((item) => item.id === id ? appointment : item)); showNotice("La solicitud de cambio quedó registrada."); }
    catch (error) { showNotice(error.message); }
    setMenuFor(null);
  }

  return <div className="my-appointments"><div className="page-content" id="mis-citas">
    <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot" /> TU SALUD, ORGANIZADA</div><h1>Mis citas<span className="title-period">.</span></h1><p className="page-subtitle">Consulta y administra tus próximas visitas médicas.</p></div><button type="button" className="primary-button" onClick={() => window.dispatchEvent(new CustomEvent("sgcm:navigate", { detail: "agendar" }))}><CalendarDays size={18} /> Agendar nueva cita</button></section>
    {notice && <div className="notice"><CheckCircle2 size={18} />{notice}<button onClick={() => setNotice("")} aria-label="Cerrar aviso"><X size={16} /></button></div>}
    <AppointmentStats upcomingCount={upcomingCount} completedCount={completedCount} nextAppointment={nextAppointment} />
    <section className="appointments-panel"><AppointmentFilters query={query} setQuery={setQuery} tab={tab} setTab={setTab} upcomingCount={upcomingCount} setPage={setPage} /><div className="appointment-list">{filtered.length === 0 ? <EmptyAppointments onShowAll={() => { setQuery(""); setTab("all"); }} /> : filtered.map((appointment) => <AppointmentCard key={appointment.id} appointment={appointment} menuOpen={menuFor === appointment.id} onToggleMenu={() => setMenuFor(menuFor === appointment.id ? null : appointment.id)} onReschedule={() => rescheduleAppointment(appointment.id)} onCancel={() => cancelAppointment(appointment.id)} />)}</div>
      {filtered.length > 0 && <div className="pagination"><span>Mostrando <strong>{filtered.length}</strong> de <strong>{appointments.length}</strong> citas</span><div className="page-controls"><button aria-label="Página anterior" disabled={page === 1} onClick={() => setPage(1)}><ChevronLeft size={17} /></button><button className="current-page">{page}</button><button aria-label="Página siguiente" disabled><ChevronRight size={17} /></button></div></div>}
    </section>
    <AppointmentReminders />
    <footer className="page-footer"><span>© 2026 SGCM · Sistema de Gestión de Citas Médicas</span><span>Hecho pensando en tu bienestar <HeartPulse size={14} /></span></footer>
  </div></div>;
}