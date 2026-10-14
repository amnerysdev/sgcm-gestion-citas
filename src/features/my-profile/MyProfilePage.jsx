import { useEffect, useState } from "react";
import { Check, Phone, ShieldCheck, UserRound, X } from "lucide-react";
import { api } from "../../api.js";
import PersonalInfoPanel from "./components/PersonalInfoPanel.jsx";
import ContactInfoPanel from "./components/ContactInfoPanel.jsx";
import ProfilePhotoPanel from "./components/ProfilePhotoPanel.jsx";
import ProfilePreferencesPanel from "./components/ProfilePreferencesPanel.jsx";
import ProfileEditModal from "./components/ProfileEditModal.jsx";

export default function MyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => { api.profile().then(({ profile: current }) => setProfile(current)).catch((error) => inform(error.message)); }, []);
  function inform(message) { setNotice(message); window.setTimeout(() => setNotice(""), 3200); }
  async function saveProfile(draft) { try { const { profile: saved } = await api.saveProfile(draft); setProfile(saved); setEditing(""); inform("Los cambios se guardaron."); } catch (error) { inform(error.message); } }

  if (!profile) return <div className="my-profile"><p role="status">Cargando perfil…</p></div>;

  return <div className="my-profile"><main className="content" id="perfil">
    <section className="banner"><div className="bannericon"><UserRound size={38} /></div><div><h1>Mi perfil</h1><p>Gestiona tu información personal, de contacto y preferencias.</p></div><div className="motto">Tu salud,<br />nuestra prioridad <span>♡</span></div></section>
    {notice && <div className="notice"><Check size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Cerrar aviso"><X size={15} /></button></div>}
    <div className="grid"><PersonalInfoPanel profile={profile} onEdit={() => setEditing("personal")} /><ContactInfoPanel profile={profile} onEdit={() => setEditing("contact")} /><ProfilePhotoPanel photo={profile.photo} onSave={async (photo) => { try { const { profile: saved } = await api.saveProfile({ photo }); setProfile(saved); inform("La foto quedó guardada en memoria."); } catch (error) { inform(error.message); } }} onNotice={inform} /><ProfilePreferencesPanel profile={profile} onSave={async (changes) => { try { const { profile: saved } = await api.saveProfile(changes); setProfile(saved); inform("Preferencias guardadas."); } catch (error) { inform(error.message); } }} onNotice={inform} /></div>
    <footer className="footer"><span>© 2026 SGCM · Sistema de Gestión de Citas Médicas</span><span><ShieldCheck size={15} />Tu información merece cuidado.</span></footer>
  </main>{editing && <ProfileEditModal type={editing} profile={profile} onClose={() => setEditing("")} onSave={saveProfile} />}</div>;
}
