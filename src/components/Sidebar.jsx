import {
  LayoutGrid,
  CalendarPlus,
  CalendarDays,
  UserRound,
  LogOut,
} from "lucide-react";

const navigation = [
  { id: "inicio", label: "Inicio", Icon: LayoutGrid },
  { id: "agendar", label: "Agendar cita", Icon: CalendarPlus },
  { id: "citas", label: "Mis citas", Icon: CalendarDays },
  { id: "perfil", label: "Mi perfil", Icon: UserRound },
];

export default function Sidebar({ activeSection, onNavigate, mobileMenuOpen }) {
  return (
    <aside
      className={`sidebar ${mobileMenuOpen ? "is-open" : ""}`}
      aria-label="Navegación principal"
    >
      <a
        href="#inicio"
        className="sidebar-brand"
        onClick={(event) => {
          event.preventDefault();
          onNavigate("inicio");
        }}
        aria-label="SGCM, ir al inicio"
      >
        <img src="/assets/sgcm-logo.svg" alt="Sistema de Gestión de Citas Médicas" />
      </a>

      <nav className="sidebar-nav">
        {navigation.map(({ id, label, Icon }) => (
          <button
            type="button"
            key={id}
            className={`nav-link ${activeSection === id ? "is-active" : ""}`}
            onClick={() => onNavigate(id)}
            aria-current={activeSection === id ? "page" : undefined}
          >
            <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          className="nav-link logout-link"
          onClick={() => {
            // Conecta aquí tu función de cierre de sesión existente.
            window.dispatchEvent(new CustomEvent("sgcm:logout-requested"));
          }}
        >
          <LogOut aria-hidden="true" size={19} strokeWidth={1.8} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
