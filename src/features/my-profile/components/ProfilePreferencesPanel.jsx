import { useState } from "react";
import { BellRing, CalendarDays, ChevronRight, Globe, Mail, Settings } from "lucide-react";
import ProfilePanelHeading from "./ProfilePanelHeading.jsx";

function PreferenceToggle({ checked, onClick, label }) {
  return <button className={`toggle ${checked ? "on" : ""}`} role="switch" aria-label={label} aria-checked={checked} onClick={onClick}><i /></button>;
}

export default function ProfilePreferencesPanel({ onNotice }) {
  const [language, setLanguage] = useState("Español");
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [contact, setContact] = useState("Correo electrónico");
  return <section className="panel"><ProfilePanelHeading icon={Settings} title="Preferencias" description="Personaliza tu experiencia en SGCM." /><div className="prefs">
    <div className="pref"><Globe /><span>Idioma</span><select value={language} onChange={(event) => { setLanguage(event.target.value); onNotice("Idioma actualizado en la demostración."); }}><option>Español</option><option>English</option></select><ChevronRight /></div>
    <div className="pref"><BellRing /><span>Notificaciones</span><PreferenceToggle label="Notificaciones" checked={notifications} onClick={() => { setNotifications((value) => !value); onNotice(`Notificaciones ${notifications ? "desactivadas" : "activadas"}.`); }} /><ChevronRight /></div>
    <div className="pref"><CalendarDays /><span>Recordatorios de citas</span><PreferenceToggle label="Recordatorios de citas" checked={reminders} onClick={() => { setReminders((value) => !value); onNotice(`Recordatorios ${reminders ? "desactivados" : "activados"}.`); }} /><ChevronRight /></div>
    <div className="pref"><Mail /><span>Método de contacto preferido</span><select value={contact} onChange={(event) => { setContact(event.target.value); onNotice("Método de contacto actualizado."); }}><option>Correo electrónico</option><option>Teléfono</option><option>SMS</option></select><ChevronRight /></div>
  </div></section>;
}