import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { doctors } from "./data/appointmentCatalog.js";
import BookingHeading from "./components/BookingHeading.jsx";
import SpecialtySelector from "./components/SpecialtySelector.jsx";
import DoctorSelector from "./components/DoctorSelector.jsx";
import AppointmentCalendar from "./components/AppointmentCalendar.jsx";
import AppointmentConfirmation from "./components/AppointmentConfirmation.jsx";

export default function BookingPage() {
  const [specialtyId, setSpecialtyId] = useState("general");
  const [doctor, setDoctor] = useState(doctors[0]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [confirmed, setConfirmed] = useState(false);
  const [toast, setToast] = useState("");

  function selectSpecialty(id) { setSpecialtyId(id); setDoctor(null); setDate(null); setTime(""); setConfirmed(false); }
  function cancel() { setDoctor(null); setDate(null); setTime(""); setConfirmed(false); setToast(""); }
  function confirm() { if (!doctor || !date || !time) return; setConfirmed(true); setToast("Cita de demostración confirmada. No se ha enviado al sistema médico."); }
  const clearConfirmation = () => setConfirmed(false);

  return <div className="booking-page"><BookingHeading /><div className="booking-grid"><SpecialtySelector selected={specialtyId} onSelect={selectSpecialty} /><DoctorSelector specialtyId={specialtyId} doctor={doctor} onSelect={(value) => { setDoctor(value); setConfirmed(false); }} /><AppointmentCalendar month={month} setMonth={setMonth} date={date} setDate={setDate} time={time} setTime={setTime} onChange={clearConfirmation} /></div><AppointmentConfirmation doctor={doctor} date={date} time={time} confirmed={confirmed} onConfirm={confirm} onCancel={cancel} />{toast && <div className="booking-toast" role="status"><CheckCircle2 size={18} />{toast}<button type="button" onClick={() => setToast("")} aria-label="Cerrar"><X size={16} /></button></div>}<p className="demo-note">Prototipo visual · Médicos y horarios de demostración.</p></div>;
}