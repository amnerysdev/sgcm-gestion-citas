import { Pencil, Phone } from "lucide-react";
import ProfilePanelHeading from "./ProfilePanelHeading.jsx";

export default function ContactInfoPanel({ profile, onEdit, isDoctor = false }) {
  const details = isDoctor
    ? [["Correo profesional", profile.email], ["Teléfono de contacto", profile.phone], ["Consultorio", profile.address], ["Ciudad / provincia", profile.city], ["Teléfono alternativo", profile.alternatePhone]]
    : [["Correo electrónico", profile.email], ["Dirección", `${profile.address || ""}${profile.city ? ` · ${profile.city}` : ""}`], ["Teléfono", profile.phone], ["Teléfono alternativo", profile.alternatePhone], ["Contacto de emergencia", profile.emergencyName], ["Teléfono de emergencia", profile.emergencyPhone]];
  return <section className="panel"><ProfilePanelHeading icon={Phone} title={isDoctor ? "Contacto y consultorio" : "Datos de contacto"} description={isDoctor ? "Indica cómo pueden contactarte y dónde atiendes." : "Mantén tu información de contacto actualizada."} action={<button className="outline" onClick={onEdit}><Pencil size={15} />Editar</button>} /><div className="contacts">{details.map(([label, value]) => <div className={`detail ${label === "Dirección" || label === "Consultorio" ? "address" : ""}`} key={label}><span>{label}</span><b>{value || "Por completar"}</b></div>)}</div></section>;
}
