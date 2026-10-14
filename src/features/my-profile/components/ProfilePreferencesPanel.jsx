import { BellRing, CalendarDays, ChevronRight, Globe, Mail, Settings } from "lucide-react";
import ProfilePanelHeading from "./ProfilePanelHeading.jsx";

function PreferenceToggle({ checked, onClick, label }) {
  return <button className={`toggle ${checked ? "on" : ""}`} role="switch" aria-label={label} aria-checked={checked} onClick={onClick}><i /></button>;
}

export default function ProfilePreferencesPanel({ profile, onSave, onNotice }) {
  const language = profile.language || "Español";
  const notifications = profile.notifications ?? true;
  const reminders = profile.reminders ?? true;
  const contact = profile.contactMethod || "Correo electrónico";
  const update = async (changes) => { try { await onSave(changes); } catch (error) { onNotice(error.message); } };
  return <section className="panel"><ProfilePanelHeading icon={Settings} title="Preferencias" description="Personaliza tu experiencia en SGCM." /><div className="prefs">
    <div className="pref"><Globe /><span>Idioma</span><select value={language} onChange={(event) => update({ language: event.target.value })}><option>Español</option><option>English</option></select><ChevronRight /></div>
    <div className="pref"><BellRing /><span>Notificaciones</span><PreferenceToggle label="Notificaciones" checked={notifications} onClick={() => update({ notifications: !notifications })} /><ChevronRight /></div>
    <div className="pref"><CalendarDays /><span>Recordatorios de citas</span><PreferenceToggle label="Recordatorios de citas" checked={reminders} onClick={() => update({ reminders: !reminders })} /><ChevronRight /></div>
    <div className="pref"><Mail /><span>Método de contacto preferido</span><select value={contact} onChange={(event) => update({ contactMethod: event.target.value })}><option>Correo electrónico</option><option>Teléfono</option><option>SMS</option></select><ChevronRight /></div>
  </div></section>;
}
