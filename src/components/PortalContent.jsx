import HomePanel from "../components/HomePanel.jsx";
import BookingPage from "../features/appointments/BookingPage.jsx";
import MyAppointmentsPage from "../features/my-appointments/MyAppointmentsPage.jsx";
import MyProfilePage from "../features/my-profile/MyProfilePage.jsx";
import { portalSections } from "../app/portalSections.js";

const sectionPages = {
  inicio: HomePanel,
  agendar: BookingPage,
  citas: MyAppointmentsPage,
  perfil: MyProfilePage,
};

export default function PortalContent({ activeSection, onNavigate, user }) {
  const Page = sectionPages[activeSection];
  if (Page === HomePanel) return <Page />;
  if (activeSection === "agendar") return <Page user={user} />;
  if (activeSection === "citas") return <Page />;
  if (activeSection === "perfil") return <Page />;
  return <section className="placeholder-panel" aria-live="polite"><span className="eyebrow">SGCM · PORTAL DEL PACIENTE</span><h1>{portalSections[activeSection]?.title}</h1><p>Esta sección está preparada para conectar el módulo correspondiente de tu sistema.</p><button className="dashboard-booking-link" onClick={() => onNavigate("agendar")}>Agendar una cita</button></section>;
}
