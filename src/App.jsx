import { useEffect, useState } from "react";
import LoginPage from "./features/login/LoginPage.jsx";
import DashboardShell from "./components/DashboardShell.jsx";
import usePortalNavigation from "./app/usePortalNavigation.js";
import { portalSections } from "./app/portalSections.js";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = usePortalNavigation();
  const { activeSection, navigate, resetNavigation } = navigation;

  useEffect(() => {
    document.title = isAuthenticated ? `SGCM | ${portalSections[activeSection]?.label ?? "Inicio"}` : "SGCM | Iniciar sesión";
  }, [activeSection, isAuthenticated]);

  useEffect(() => {
    const handleNavigate = (event) => navigate(event.detail);
    const handleLogout = () => { setIsAuthenticated(false); resetNavigation(); };
    window.addEventListener("sgcm:navigate", handleNavigate);
    window.addEventListener("sgcm:logout-requested", handleLogout);
    return () => {
      window.removeEventListener("sgcm:navigate", handleNavigate);
      window.removeEventListener("sgcm:logout-requested", handleLogout);
    };
  }, [navigate, resetNavigation]);

  if (!isAuthenticated) return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  return <DashboardShell navigation={navigation} />;
}