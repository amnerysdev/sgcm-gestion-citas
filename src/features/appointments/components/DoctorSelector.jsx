import { useState } from "react";
import { ChevronRight, Search, Star } from "lucide-react";
import { doctors } from "../data/appointmentCatalog.js";
import BookingStep from "./BookingStep.jsx";

export default function DoctorSelector({ specialtyId, doctor, onSelect, doctors: catalogDoctors }) {
  const [query, setQuery] = useState("");
  const matches = (catalogDoctors || doctors).filter((item) => (item.sid || item.specialtyId) === specialtyId && item.name.toLowerCase().includes(query.toLowerCase()));
  return <section className="booking-card"><BookingStep number="2" title="Médico" /><label className="booking-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar médico..." /></label><div className="doctor-list">{matches.map((item) => <button type="button" key={item.id} className={`doctor-option ${doctor?.id === item.id ? "selected" : ""}`} onClick={() => onSelect(item)}><span className={`doctor-avatar ${item.color || "blue"}`}>{item.initials || item.name.split(/\s+/).slice(0, 2).map((name) => name[0]).join("")}</span><span className="doctor-copy"><strong>{item.name}</strong><small>{item.spec || item.specialty}</small><em><Star size={12} fill="currentColor" /> {item.rating || "4.8"} ({item.reviews ?? 0})</em></span><ChevronRight size={16} /></button>)}{!matches.length && <p className="booking-empty">No hay médicos para esta búsqueda.</p>}</div></section>;
}
