import { useState } from "react";
import { Phone, Save, ShieldCheck, UserRound, X } from "lucide-react";
import { specialties } from "../../appointments/data/appointmentCatalog.js";
import ProfileField from "./ProfileField.jsx";

export default function ProfileEditModal({ type, profile, onClose, onSave, isDoctor = false }) {
  const [draft, setDraft] = useState({ ...profile });
  const change = (event) => setDraft((current) => ({ ...current, [event.target.name]: event.target.value }));
  const isPersonal = type === "personal";
  function submit(event) { event.preventDefault(); onSave(draft); }
  const doctorDetails = <>
    <ProfileField label="Nombre profesional" name="name" value={draft.name} onChange={change} />
    <ProfileField label="Especialidad principal" name="specialty" value={draft.specialty} onChange={change} options={["", ...specialties.map(([, name]) => name)]} />
    <ProfileField label="Número de exequátur" name="licenseNumber" value={draft.licenseNumber} onChange={change} />
    <ProfileField label="Años de experiencia" name="yearsExperience" type="number" value={draft.yearsExperience} onChange={change} />
    <ProfileField label="Formación académica" name="education" value={draft.education} onChange={change} />
    <ProfileField label="Acerca del especialista" name="biography" value={draft.biography} onChange={change} multiline />
  </>;
  const patientDetails = <>
    <ProfileField label="Nombre completo" name="name" value={draft.name} onChange={change} />
    <ProfileField label="Fecha de nacimiento" name="birth" type="date" value={draft.birth} onChange={change} />
    <ProfileField label="Nacionalidad" name="nationality" value={draft.nationality} onChange={change} />
    <ProfileField label="Documento de identidad" name="document" value={draft.document} onChange={change} />
    <ProfileField label="Género" name="gender" value={draft.gender} onChange={change} options={["Femenino", "Masculino", "Otro", "Prefiero no decirlo"]} />
    <ProfileField label="Estado civil" name="civil" value={draft.civil} onChange={change} options={["Soltera", "Soltero", "Casada", "Casado", "Unión libre", "Divorciada", "Divorciado", "Prefiero no decirlo"]} />
  </>;
  const doctorContact = <>
    <ProfileField label="Correo profesional" name="email" type="email" value={draft.email} onChange={change} />
    <ProfileField label="Teléfono de contacto" name="phone" type="tel" value={draft.phone} onChange={change} />
    <ProfileField label="Dirección del consultorio" name="address" value={draft.address} onChange={change} />
    <ProfileField label="Ciudad / provincia" name="city" value={draft.city} onChange={change} />
    <ProfileField label="Teléfono alternativo" name="alternatePhone" type="tel" value={draft.alternatePhone} onChange={change} />
  </>;
  const patientContact = <>
    <ProfileField label="Correo electrónico" name="email" type="email" value={draft.email} onChange={change} />
    <ProfileField label="Teléfono" name="phone" type="tel" value={draft.phone} onChange={change} />
    <ProfileField label="Dirección" name="address" value={draft.address} onChange={change} />
    <ProfileField label="Ciudad / provincia" name="city" value={draft.city} onChange={change} />
    <ProfileField label="Teléfono alternativo" name="alternatePhone" type="tel" value={draft.alternatePhone} onChange={change} />
    <ProfileField label="Contacto de emergencia" name="emergencyName" value={draft.emergencyName} onChange={change} />
    <ProfileField label="Teléfono de emergencia" name="emergencyPhone" type="tel" value={draft.emergencyPhone} onChange={change} />
  </>;
  return <div className="backdrop" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="modal" role="dialog" aria-modal="true"><button className="close" onClick={onClose} aria-label="Cerrar"><X /></button><div className="modalicon">{isPersonal ? <UserRound /> : <Phone />}</div><span className="eyebrow">{isDoctor ? "PERFIL PROFESIONAL" : "CONFIGURACIÓN DE CUENTA"}</span><h2>{isPersonal ? (isDoctor ? "Editar perfil profesional" : "Editar información personal") : (isDoctor ? "Editar contacto y consultorio" : "Editar datos de contacto")}</h2><p className="desc">Actualiza los datos y guarda los cambios para verlos reflejados en la página.</p><form onSubmit={submit}>{isPersonal ? (isDoctor ? doctorDetails : patientDetails) : (isDoctor ? doctorContact : patientContact)}<div className="modalactions"><button type="button" className="secondary" onClick={onClose}>Cancelar</button><button type="submit" className="primary"><Save size={16} />Guardar cambios</button></div></form><p className="privacy"><ShieldCheck size={14} />Los cambios se guardan mientras el servidor está activo.</p></section></div>;
}
