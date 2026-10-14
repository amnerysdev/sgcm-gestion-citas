import { Pencil, UserRound } from "lucide-react";
import ProfilePanelHeading from "./ProfilePanelHeading.jsx";

export default function PersonalInfoPanel({ profile, onEdit }) {
  const birthDate = new Date(`${profile.birth}T12:00:00`).toLocaleDateString("es-DO", { day: "numeric", month: "long", year: "numeric" });
  return <section className="panel"><ProfilePanelHeading icon={UserRound} title="Información personal" description="Revisa y actualiza tus datos personales." action={<button className="outline" onClick={onEdit}><Pencil size={15} />Editar</button>} /><div className="details"><div className="detail"><span>Nombre completo</span><b>{profile.name}</b></div><div className="detail"><span>Fecha de nacimiento</span><b>{birthDate}</b></div><div className="detail"><span>Nacionalidad</span><b>{profile.nationality}</b></div><div className="detail"><span>Documento de identidad</span><b>{profile.document}</b></div><div className="detail"><span>Género</span><b>{profile.gender}</b></div><div className="detail"><span>Estado civil</span><b>{profile.civil}</b></div></div></section>;
}