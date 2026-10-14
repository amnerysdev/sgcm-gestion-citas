import { useRef, useState } from "react";
import { Camera, Image as ImageIcon } from "lucide-react";
import { profilePhotoUrl } from "../data/profileData.js";
import ProfilePanelHeading from "./ProfilePanelHeading.jsx";

export default function ProfilePhotoPanel({ onNotice }) {
  const [photo, setPhoto] = useState(profilePhotoUrl);
  const fileRef = useRef(null);
  function upload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      onNotice("Usa una imagen JPG, PNG o GIF de máximo 5 MB."); event.target.value = ""; return;
    }
    setPhoto(URL.createObjectURL(file));
    onNotice("Foto previsualizada. Aún no se ha subido al servidor.");
  }
  return <section className="panel"><ProfilePanelHeading icon={ImageIcon} title="Foto de perfil" description="Tu foto de perfil te identifica en el sistema." /><div className="photobox"><img src={photo} alt="Foto de perfil" className="photo" /><div className="photocontrol"><button className="outline" onClick={() => fileRef.current?.click()}><Camera size={17} />Cambiar foto</button><span>JPG, PNG o GIF. Máx. 5 MB.</span><input ref={fileRef} hidden type="file" accept="image/jpeg,image/png,image/gif" onChange={upload} /></div></div></section>;
}