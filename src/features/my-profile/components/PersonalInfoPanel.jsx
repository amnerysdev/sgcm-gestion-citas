import { Pencil, UserRound } from "lucide-react";
import ProfilePanelHeading from "./ProfilePanelHeading.jsx";

export default function PersonalInfoPanel({ profile, onEdit, isDoctor = false }) {
  const birthDate = new Date(`${profile.birth}T12:00:00`).toLocaleDateString("es-DO", { day: "numeric", month: "long", year: "numeric" });
  const details = isDoctor
    ? [["Nombre profesional", profile.name], ["Especialidad", profile.specialty], ["Exequátur", profile.licenseNumber], ["Años de experiencia", profile.yearsExperience], ["Formación académica", profile.education], ["Acerca del especialista", profile.biography]]
    : [["Nombre completo", profile.name], ["Fecha de nacimiento", birthDate], ["Nacionalidad", profile.nationality], ["Documento de identidad", profile.document], ["Género", profile.gender], ["Estado civil", profile.civil]];
  return <section className="panel"><ProfilePanelHeading icon={UserRound} title={isDoctor ? "Perfil profesional" : "Información personal"} description={isDoctor ? "Presenta tu especialidad y trayectoria profesional." : "Revisa y actualiza tus datos personales."} action={<button className="outline" onClick={onEdit}><Pencil size={15} />Editar</button>} /><div className="details">{details.map(([label, value]) => <div className="detail" key={label}><span>{label}</span><b>{value || "Por completar"}</b></div>)}</div></section>;
}
