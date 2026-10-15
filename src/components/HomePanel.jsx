import { CalendarPlus, ShieldCheck, Clock3 } from "lucide-react";

export default function HomePanel({ user }) {
  const isDoctor = user?.role === "specialist";
  return (
    <section className="home-panel">
      <div className="home-decoration home-decoration-top" aria-hidden="true" />
      <div className="home-decoration home-decoration-bottom" aria-hidden="true" />
      <div className="welcome-content">
        <img
          className="welcome-logo"
          src="/assets/sgcm-logo.png"
          alt="Sistema de Gestión de Citas Médicas"
        />
        <h1>{isDoctor ? "¡Bienvenido/a al portal profesional!" : "¡Bienvenido/a!"}</h1>
        <p className="welcome-copy">
          {isDoctor ? "Administra tu agenda de atención y mantén tu perfil profesional al día." : <>Gestiona tus citas médicas de forma rápida,<br className="desktop-break" /> segura y sencilla.</>}
        </p>
        <div className="welcome-benefits">
          <div className="benefit">
            <span className="benefit-icon"><CalendarPlus size={18} /></span>
            <span>{isDoctor ? "Configura tus horarios" : "Agenda tus citas"}</span>
          </div>
          <div className="benefit">
            <span className="benefit-icon"><Clock3 size={18} /></span>
            <span>{isDoctor ? "Consulta tus citas" : "Consulta tus horarios"}</span>
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
