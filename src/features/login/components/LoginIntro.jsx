import { CalendarDays, HeartPulse, ShieldCheck, UserRound } from "lucide-react";
import BrandMark from "./BrandMark.jsx";

const benefits = [
  { icon: CalendarDays, lines: <>Agenda tus<br />citas fácilmente</> },
  { icon: UserRound, lines: <>Conecta con<br />especialistas</> },
  { icon: ShieldCheck, lines: <>Tu información<br />segura</> },
  { icon: HeartPulse, lines: <>Mejora tu<br />bienestar</> },
];

export default function LoginIntro() {
  return (
    <section className="intro" aria-label="Bienvenida a SGCM">
      <header className="brand"><BrandMark /><div><div className="brand-name">SGCM</div><div className="brand-tagline">Tu salud, nuestra prioridad</div></div></header>
      <div className="intro-copy"><p className="eyebrow">TU BIENESTAR, MÁS CERCA</p><h1>Cuidar de ti<br />también es <span>nuestro propósito</span></h1><p className="intro-description">Accede a tus citas, consulta con nuestros especialistas y mantén tu información médica siempre al día.</p></div>
      <div className="benefits">{benefits.map(({ icon: Icon, lines }) => <div className="benefit" key={Icon.displayName || Icon.name}><div className="benefit-icon"><Icon /></div><p>{lines}</p></div>)}</div>
      <div className="medical-photo" role="img" aria-label="Estetoscopio y materiales médicos" />
    </section>
  );
}