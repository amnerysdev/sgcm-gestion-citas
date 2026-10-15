import { useState } from "react";
import { ChevronRight, Search, Star } from "lucide-react";
import { doctors } from "../data/appointmentCatalog.js";
import BookingStep from "./BookingStep.jsx";

export default function DoctorSelector({ specialtyId, doctor, onSelect, doctors: catalogDoctors }) {
  const [query, setQuery] = useState("");
  const matches = (catalogDoctors || doctors).filter((item) => (item.sid || item.specialtyId) === specialtyId && item.name.toLowerCase().includes(query.toLowerCase()));
  return <section className="booking-card"><BookingStep number="2" title="Médico" /><label className="booking-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar médico..." /></label><div className="doctor-list">{matches.map((item) => <button type="button" key={item.id} className={`doctor-option ${doctor?.id === item.id ? "selected" : ""}`} onClick={() => onSelect(item)}>{(() => { const image = item.image || (item.name.startsWith("Dra.") ? "/assets/doctors/doctor-female.png" : "/assets/doctors/doctor-male.png"); return <img className="doctor-avatar-photo" src={image} alt={`Retrato de ${item.name}`} loading="lazy" />; })()}<span className="doctor-copy"><strong>{item.name}</strong><small>{item.spec || item.specialty}</small><em><Star size={12} fill="currentColor" /> {item.rating || "4.8"} ({item.reviews ?? 0})</em></span><ChevronRight size={16} /></button>)}{!matches.length && <p className="booking-empty">No hay médicos para esta búsqueda.</p>}</div></section>;
}
