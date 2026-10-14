import { useState } from "react";
import LoginIntro from "./components/LoginIntro.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import FeedbackToast from "./components/FeedbackToast.jsx";

export default function LoginPage({ onLogin }) {
  const [view, setView] = useState("login");
  const [notice, setNotice] = useState("");
  const closeRegister = () => { setView("login"); setNotice(""); };

  if (view === "register") {
    return <div className="login-screen register-screen"><main className="registration-page"><RegisterForm onBack={closeRegister} onNotice={setNotice} /><FeedbackToast message={notice} onClose={() => setNotice("")} /></main></div>;
  }

  return (
    <div className="login-screen">
      <main className="page-shell">
        <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="ambient ambient-three" />
        <LoginIntro />
        <LoginForm onLogin={onLogin} onNotice={setNotice} onOpenRegister={() => { setView("register"); setNotice(""); }} />
        <FeedbackToast message={notice} onClose={() => setNotice("")} />
        <footer className="page-footer">© {new Date().getFullYear()} SGCM · Sistema de Gestión de Citas Médicas</footer>
      </main>
    </div>
  );
}