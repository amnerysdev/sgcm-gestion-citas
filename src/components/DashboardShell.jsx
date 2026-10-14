import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import PortalContent from "./PortalContent.jsx";

export default function DashboardShell({ navigation, user }) {
  const { activeSection, mobileMenuOpen, setMobileMenuOpen, userMenuOpen, setUserMenuOpen, navigate } = navigation;
  return <div className="app-shell">
    {mobileMenuOpen && <button className="mobile-scrim" aria-label="Cerrar menú de navegación" onClick={() => setMobileMenuOpen(false)} />}
    <Sidebar activeSection={activeSection} onNavigate={navigate} mobileMenuOpen={mobileMenuOpen} />
    <div className="app-main"><Topbar user={user} onMenuClick={() => setMobileMenuOpen((open) => !open)} mobileMenuOpen={mobileMenuOpen} userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} /><main className="main-content"><PortalContent user={user} activeSection={activeSection} onNavigate={navigate} /></main></div>
    <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? "Cerrar navegación" : "Abrir navegación"} aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}</button>
  </div>;
}
