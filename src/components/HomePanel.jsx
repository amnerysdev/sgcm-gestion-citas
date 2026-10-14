import { CalendarPlus, ShieldCheck, Clock3 } from "lucide-react";

export default function HomePanel() {
  return (
    <section className="home-panel">
      <div className="home-decoration home-decoration-top" aria-hidden="true" />
      <div className="home-decoration home-decoration-bottom" aria-hidden="true" />
      <div className="welcome-content">
        <img
          className="welcome-logo"
          src="/assets/sgcm-logo.svg"
          alt="Sistema de Gestión de Citas Médicas"
        />
        <h1>¡Bienvenido/a!</h1>
        <p className="welcome-copy">
          Gestiona tus citas médicas de forma rápida,
          <br className="desktop-break" /> segura y sencilla.
        </p>
        <div className="welcome-benefits">
          <div className="benefit">
            <span className="benefit-icon"><CalendarPlus size={18} /></span>
            <span>Agenda tus citas</span>
          </div>
          <div className="benefit">
            <span className="benefit-icon"><Clock3 size={18} /></span>
            <span>Consulta tus horarios</span>
          </div>
          <div className="benefit">
            <span className="benefit-icon"><ShieldCheck size={18} /></span>
            <span>Gestiona con confianza</span>
          </div>
        </div>
      </div>
    </section>
  );
}
