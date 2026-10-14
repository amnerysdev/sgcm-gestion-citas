import { useState } from "react";
import { Check, Phone, ShieldCheck, UserRound, X } from "lucide-react";
import { initialProfile } from "./data/profileData.js";
import PersonalInfoPanel from "./components/PersonalInfoPanel.jsx";
import ContactInfoPanel from "./components/ContactInfoPanel.jsx";
import ProfilePhotoPanel from "./components/ProfilePhotoPanel.jsx";
import ProfilePreferencesPanel from "./components/ProfilePreferencesPanel.jsx";
import ProfileEditModal from "./components/ProfileEditModal.jsx";

export default function MyProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState("");
  const [notice, setNotice] = useState("");
  function inform(message) { setNotice(message); window.setTimeout(() => setNotice(""), 3200); }
  function saveProfile(draft) { setProfile((current) => ({ ...current, ...draft })); setEditing(""); inform("Cambios actualizados en esta demostración."); }

  return <div className="my-profile"><main className="content" id="perfil">
    <section className="banner"><div className="bannericon"><UserRound size={38} /></div><div><h1>Mi perfil</h1><p>Gestiona tu información personal, de contacto y preferencias.</p></div><div className="motto">Tu salud,<br />nuestra prioridad <span>♡</span></div></section>
    {notice && <div className="notice"><Check size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Cerrar aviso"><X size={15} /></button></div>}
    <div className="grid"><PersonalInfoPanel profile={profile} onEdit={() => setEditing("personal")} /><ContactInfoPanel profile={profile} onEdit={() => setEditing("contact")} /><ProfilePhotoPanel onNotice={inform} /><ProfilePreferencesPanel onNotice={inform} /></div>
    <footer className="footer"><span>© 2026 SGCM · Sistema de Gestión de Citas Médicas</span><span><ShieldCheck size={15} />Tu información merece cuidado.</span></footer>
  </main>{editing && <ProfileEditModal type={editing} profile={profile} onClose={() => setEditing("")} onSave={saveProfile} />}</div>;
}