import { useState } from "react";
import { ArrowRight, Eye, EyeOff, HeartPulse, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import BrandMark from "./BrandMark.jsx";

export default function LoginForm({ onLogin, onNotice, onOpenRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!email.trim() || !password) return onNotice("Completa tu correo electrónico y contraseña para continuar.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return onNotice("Escribe un correo electrónico válido.");
    setBusy(true);
    try { await onLogin(email.trim(), password); }
    catch (error) { onNotice(error.message); }
    finally { setBusy(false); }
  }

  function recover() {
    onNotice(email.trim() ? `La recuperación de contraseña debe conectarse al sistema. Correo ingresado: ${email.trim()}` : "Escribe tu correo electrónico para solicitar la recuperación de contraseña.");
  }

  return (
    <section className="form-side" aria-label="Acceso a tu cuenta">
      <div className="login-card">
        <div className="mobile-brand"><BrandMark /><span>SGCM</span></div>
        <div className="card-heading"><h2>Iniciar sesión</h2><p>Ingresa a tu cuenta para continuar.</p></div>
        <form onSubmit={submit} noValidate>
          <label htmlFor="login-email">Correo electrónico</label>
          <div className="input-wrap"><Mail size={22} /><input id="login-email" type="email" autoComplete="email" placeholder="tu@email.com" value={email} onChange={(event) => setEmail(event.target.value)} /></div>
          <label htmlFor="login-password">Contraseña</label>
          <div className="input-wrap"><LockKeyhole size={22} /><input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Ingresa tu contraseña" value={password} onChange={(event) => setPassword(event.target.value)} /><button className="icon-button" type="button" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <Eye size={21} /> : <EyeOff size={21} />}</button></div>
          <div className="form-options"><label className="remember"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span className="custom-check" />Recordarme</label><button className="text-button" type="button" onClick={recover}>¿Olvidaste tu contraseña?</button></div>
          <button className="submit-button" type="submit" disabled={busy}>{busy ? "Un momento…" : "Iniciar sesión"}<ArrowRight size={22} /></button>
        </form>
        <p className="register-prompt">¿No tienes una cuenta?<button className="text-button" type="button" onClick={onOpenRegister}>Regístrate aquí</button></p>
        <div className="secure-note"><ShieldCheck size={15} /> Tu información se trata de forma segura</div>
      </div>
    </section>
  );
}
