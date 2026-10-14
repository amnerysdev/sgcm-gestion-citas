import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { doctors, specialties } from "./data/appointmentCatalog.js";
import BookingHeading from "./components/BookingHeading.jsx";
import SpecialtySelector from "./components/SpecialtySelector.jsx";
import DoctorSelector from "./components/DoctorSelector.jsx";
import AppointmentCalendar from "./components/AppointmentCalendar.jsx";
import AppointmentConfirmation from "./components/AppointmentConfirmation.jsx";
import { api } from "../../api.js";

export default function BookingPage() {
  const [specialtyId, setSpecialtyId] = useState("general");
  const [doctor, setDoctor] = useState(doctors[0]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [confirmed, setConfirmed] = useState(false);
  const [toast, setToast] = useState("");
  const [catalogDoctors, setCatalogDoctors] = useState(doctors);
  const [catalogSpecialties, setCatalogSpecialties] = useState(specialties);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [saving, setSaving] = useState(false);
  useEffect(() => { api.catalog().then((catalog) => { setCatalogDoctors(catalog.doctors); setCatalogSpecialties(catalog.specialties); }).catch((error) => setToast(error.message)); }, []);
  useEffect(() => { if (!doctor || !date) { setBookedTimes([]); return; } const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; api.availability(doctor.id, key).then(({ bookedTimes: times }) => setBookedTimes(times)).catch((error) => setToast(error.message)); }, [doctor, date]);

  function selectSpecialty(id) { setSpecialtyId(id); setDoctor(null); setDate(null); setTime(""); setConfirmed(false); }
  function cancel() { setDoctor(null); setDate(null); setTime(""); setConfirmed(false); setToast(""); }
  async function confirm() { if (!doctor || !date || !time || saving) return; setSaving(true); try { const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; await api.createAppointment({ doctorId: doctor.id, date: key, time }); setBookedTimes((items) => [...items, time]); setConfirmed(true); setToast("Tu cita se guardó correctamente."); } catch (error) { setToast(error.message); } finally { setSaving(false); } }
  const clearConfirmation = () => setConfirmed(false);

  return <div className="booking-page"><BookingHeading /><div className="booking-grid"><SpecialtySelector specialties={catalogSpecialties} selected={specialtyId} onSelect={selectSpecialty} /><DoctorSelector specialtyId={specialtyId} doctor={doctor} doctors={catalogDoctors} onSelect={(value) => { setDoctor(value); setConfirmed(false); }} /><AppointmentCalendar month={month} setMonth={setMonth} date={date} setDate={setDate} time={time} setTime={setTime} bookedTimes={bookedTimes} onChange={clearConfirmation} /></div><AppointmentConfirmation doctor={doctor} date={date} time={time} confirmed={confirmed} saving={saving} onConfirm={confirm} onCancel={cancel} />{toast && <div className="booking-toast" role="status"><CheckCircle2 size={18} />{toast}<button type="button" onClick={() => setToast("")} aria-label="Cerrar"><X size={16} /></button></div>}<p className="demo-note">Los médicos y horarios disponibles se consultan desde el servidor.</p></div>;
}
