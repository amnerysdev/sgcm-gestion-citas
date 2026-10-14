import { useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, Phone, Stethoscope, UserRound } from "lucide-react";

export default function RegisterForm({ onBack, onNotice, onRegister }) {
  const [userType, setUserType] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("newPassword") !== data.get("confirmPassword")) return onNotice("Las contraseñas no coinciden.");
    setBusy(true);
    try { await onRegister({ userType, firstName: data.get("firstName"), lastName: data.get("lastName"), email: data.get("email"), password: data.get("newPassword"), birthDate: data.get("birthDate"), phone: data.get("phone"), gender: data.get("gender") }); }
    catch (error) { onNotice(error.message); }
    finally { setBusy(false); }
  }

  return (
    <section className="registration-card" aria-labelledby="register-title">
      <button className="register-back" type="button" onClick={onBack}><ArrowLeft size={16} /> Volver al inicio de sesión</button>
      <header className="register-heading"><h1 id="register-title">Crear una cuenta</h1><p>Completa tus datos para registrarte en SGCM.</p></header>
      <form className="register-form" onSubmit={submit}>
        <fieldset className="register-type"><legend>Tipo de usuario</legend>
          <label className={userType === "patient" ? "selected" : ""}><input type="radio" name="userType" value="patient" checked={userType === "patient"} onChange={() => setUserType("patient")} /><span className="type-icon"><UserRound size={18} /></span>Paciente</label>
          <label className={userType === "specialist" ? "selected" : ""}><input type="radio" name="userType" value="specialist" checked={userType === "specialist"} onChange={() => setUserType("specialist")} /><span className="type-icon"><Stethoscope size={18} /></span>Especialista</label>
        </fieldset>
        <div className="register-grid">
          <label className="register-field"><span className="field-label">Nombre(s) <b>*</b></span><div className="register-input"><UserRound /><input name="firstName" autoComplete="given-name" placeholder="Ej. María" required /></div></label>
          <label className="register-field"><span className="field-label">Apellido(s) <b>*</b></span><div className="register-input"><UserRound /><input name="lastName" autoComplete="family-name" placeholder="Ej. Rodríguez" required /></div></label>
          <label className="register-field full"><span className="field-label">Correo electrónico <b>*</b></span><div className="register-input"><Mail /><input name="email" type="email" autoComplete="email" placeholder="tu@correo.com" required /></div></label>
          <label className="register-field"><span className="field-label">Contraseña <b>*</b></span><div className="register-input"><LockKeyhole /><input name="newPassword" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Mínimo 8 caracteres" minLength={8} required /><button type="button" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff /> : <Eye />}</button></div></label>
          <label className="register-field"><span className="field-label">Confirmar contraseña <b>*</b></span><div className="register-input"><LockKeyhole /><input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" placeholder="Repite tu contraseña" minLength={8} required /><button type="button" aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"} onClick={() => setShowConfirmPassword((value) => !value)}>{showConfirmPassword ? <EyeOff /> : <Eye />}</button></div></label>
          <label className="register-field"><span className="field-label">Fecha de nacimiento <b>*</b></span><div className="register-input"><CalendarDays /><input name="birthDate" type="date" autoComplete="bday" required /></div></label>
          <label className="register-field"><span className="field-label">Teléfono <b>*</b></span><div className="register-input"><Phone /><input name="phone" type="tel" autoComplete="tel" placeholder="Ej. 809-555-1234" required /></div></label>
          <label className="register-field full"><span className="field-label">Género</span><div className="register-input"><UserRound /><select name="gender" defaultValue=""><option value="" disabled>Selecciona una opción</option><option value="female">Femenino</option><option value="male">Masculino</option><option value="other">Otro</option><option value="prefer-not-to-say">Prefiero no decirlo</option></select><span className="select-chevron" /></div></label>
        </div>
        <label className="terms-check"><input type="checkbox" name="terms" required /><span className="terms-box"><CheckCircle2 size={13} /></span><span>Acepto los <button type="button" onClick={() => onNotice("Agrega aquí los Términos y Condiciones de SGCM.")}>Términos y Condiciones</button> y la <button type="button" onClick={() => onNotice("Agrega aquí la Política de Privacidad de SGCM.")}>Política de Privacidad</button>.</span></label>
        <button className="register-submit" type="submit" disabled={busy}>{busy ? "Creando cuenta…" : "Crear cuenta"} <ArrowRight size={18} /></button>
      </form>
    </section>
  );
}
