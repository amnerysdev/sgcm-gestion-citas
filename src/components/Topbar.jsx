import { CalendarDays, ChevronDown, Menu, Moon } from "lucide-react";
import { useState } from "react";

function formatSpanishDate(date) {
  const value = new Intl.DateTimeFormat("es-DO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
  return value.charAt(0).toLocaleUpperCase("es-DO") + value.slice(1);
}

export default function Topbar({
  onMenuClick,
  mobileMenuOpen,
  userMenuOpen,
  setUserMenuOpen,
  user,
}) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
  };

  return (
    <header className="topbar">
      <button
        className="mobile-inline-menu"
        onClick={onMenuClick}
        aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        <Menu size={21} />
      </button>

      <div className="date-pill">
        <CalendarDays size={19} strokeWidth={1.8} aria-hidden="true" />
        <span>{formatSpanishDate(new Date())}</span>
      </div>

      <div className="topbar-actions">
        <div className="user-menu-wrap">
          <button
            type="button"
            className="user-menu-trigger"
            onClick={() => setUserMenuOpen((open) => !open)}
            aria-expanded={userMenuOpen}
            aria-haspopup="menu"
          >
            <span className="user-avatar" aria-hidden="true">{`${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`}</span>
            <span className="user-copy">
              <strong>{user ? `${user.firstName} ${user.lastName}` : "Paciente"}</strong>
              <small>{user?.role === "specialist" ? "Especialista" : "Paciente"}</small>
            </span>
            <ChevronDown
              size={17}
              className={`chevron ${userMenuOpen ? "rotated" : ""}`}
              aria-hidden="true"
            />
          </button>
          {userMenuOpen && (
            <div className="user-dropdown" role="menu">
              <button role="menuitem" onClick={() => {
                setUserMenuOpen(false);
                window.dispatchEvent(new CustomEvent("sgcm:navigate", { detail: "perfil" }));
              }}>
                Mi perfil
              </button>
              <button role="menuitem" onClick={() => {
                setUserMenuOpen(false);
                window.dispatchEvent(new CustomEvent("sgcm:logout-requested"));
              }}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>

        <span className="topbar-divider" aria-hidden="true" />

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={darkMode ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          title={darkMode ? "Tema claro" : "Tema oscuro"}
        >
          <Moon size={20} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
