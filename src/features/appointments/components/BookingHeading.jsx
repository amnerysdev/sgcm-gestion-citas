import { CalendarPlus, Stethoscope } from "lucide-react";

export default function BookingHeading() {
  return <div className="booking-heading"><div className="eyebrow"><CalendarPlus size={17} /> Agendar cita</div><div className="booking-heading-row"><div><h1>Tu salud, en buenas manos</h1><p>Selecciona la especialidad, el médico y la fecha que mejor se adapte a ti.</p></div><div className="heading-art" aria-hidden="true"><Stethoscope size={58} /><span>♥</span></div></div></div>;
}