import { useEffect, useState } from "react";
import { api } from "./api.js";
import LoginPage from "./features/login/LoginPage.jsx";
import DashboardShell from "./components/DashboardShell.jsx";
import usePortalNavigation from "./app/usePortalNavigation.js";
import { portalSections } from "./app/portalSections.js";

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const navigation = usePortalNavigation();
  const { activeSection, navigate, resetNavigation } = navigation;

  useEffect(() => {
    document.title = user ? `SGCM | ${portalSections[activeSection]?.label ?? "Inicio"}` : "SGCM | Iniciar sesión";
  }, [activeSection, user]);

  useEffect(() => { api.me().then(({ user: current }) => setUser(current)).catch(() => setUser(null)).finally(() => setCheckingSession(false)); }, []);

  useEffect(() => {
    const handleNavigate = (event) => navigate(event.detail);
    const handleLogout = async () => { try { await api.logout(); } finally { setUser(null); resetNavigation(); } };
    window.addEventListener("sgcm:navigate", handleNavigate);
    window.addEventListener("sgcm:logout-requested", handleLogout);
    return () => {
      window.removeEventListener("sgcm:navigate", handleNavigate);
      window.removeEventListener("sgcm:logout-requested", handleLogout);
    };
  }, [navigate, resetNavigation]);

  if (checkingSession) return <div className="session-loading" role="status">Cargando SGCM…</div>;
  async function login(email, password) { const response = await api.login(email, password); setUser(response.user); return response; }
  async function register(data) { const response = await api.register(data); setUser(response.user); return response; }
  if (!user) return <LoginPage onLogin={login} onRegister={register} />;
  return <DashboardShell navigation={navigation} user={user} />;
}
