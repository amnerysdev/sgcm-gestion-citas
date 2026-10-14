import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { specialties } from "../data/appointmentCatalog.js";
import BookingStep from "./BookingStep.jsx";

export default function SpecialtySelector({ selected, onSelect }) {
  const [query, setQuery] = useState("");
  const matches = specialties.filter(([, name]) => name.toLowerCase().includes(query.toLowerCase()));
  return <section className="booking-card"><BookingStep number="1" title="Especialidad" /><label className="booking-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar especialidad..." /></label><div className="specialty-list">{matches.map(([id, name, Icon]) => <button type="button" key={id} className={`specialty-option ${selected === id ? "selected" : ""}`} onClick={() => onSelect(id)}><Icon size={20} /><span>{name}</span><ChevronRight size={16} /></button>)}{!matches.length && <p className="booking-empty">No se encontraron especialidades.</p>}</div></section>;
}