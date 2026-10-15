import { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarDays, CalendarOff, CircleAlert, Clock3, Copy, Pencil, Plus, Trash2, X } from 'lucide-react';
import { api } from '../../api.js';
import './doctor-schedule.css';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const blank = () => ({ weekly: DAYS.map((day) => ({ day, enabled: false, blocks: [] })), exceptions: [] });
const todayKey = () => { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`; };
const dateLabel = (date) => new Intl.DateTimeFormat('es-DO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`));

export default function DoctorSchedulePage() {
  const [schedule, setSchedule] = useState(blank);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editorDay, setEditorDay] = useState(null);
  const [draft, setDraft] = useState([]);
  const [copySource, setCopySource] = useState(null);
  const [copyTargets, setCopyTargets] = useState([]);
  const [exceptionOpen, setExceptionOpen] = useState(false);
  const [exceptionDate, setExceptionDate] = useState('');
  const [exceptionReason, setExceptionReason] = useState('');

  useEffect(() => { api.schedule().then(({ schedule: data }) => setSchedule(data)).catch((e) => setError(e.message)).finally(() => setLoading(false)); }, []);
  const persist = useCallback(async (next) => {
    setSchedule(next); setError('');
    try { const { schedule: saved } = await api.saveSchedule(next); setSchedule(saved); }
    catch (e) { setError(e.message); }
  }, []);
  const metrics = useMemo(() => {
    const active = schedule.weekly.filter((d) => d.enabled);
    const mins = active.flatMap((d) => d.blocks).reduce((sum, b) => { const [sh, sm] = b.start.split(':').map(Number); const [eh, em] = b.end.split(':').map(Number); return sum + eh * 60 + em - sh * 60 - sm; }, 0);
    const today = todayKey();
    const next = [...schedule.exceptions].filter((e) => e.date >= today).sort((a,b) => a.date.localeCompare(b.date))[0];
    return { days: active.length, hours: `${Math.floor(mins / 60)} h${mins % 60 ? ` ${mins % 60} min` : ''}`, next: next ? dateLabel(next.date) : 'Sin excepciones' };
  }, [schedule]);
  const toggleDay = (day, enabled) => void persist({ ...schedule, weekly: schedule.weekly.map((d) => d.day !== day ? d : { ...d, enabled, blocks: enabled && !d.blocks.length ? [{ start: '08:00', end: '12:00' }] : d.blocks }) });
  const openEditor = (day) => { setEditorDay(day); setDraft(schedule.weekly.find((d) => d.day === day).blocks.map((b) => ({ ...b }))); };
  const saveDay = () => {
    const ordered = [...draft].sort((a,b) => a.start.localeCompare(b.start));
    if (!ordered.length || ordered.some((b,i) => !b.start || !b.end || b.start >= b.end || (i && ordered[i-1].end > b.start))) { setError('Agrega bloques válidos. Las horas no pueden superponerse.'); return; }
    const next = { ...schedule, weekly: schedule.weekly.map((d) => d.day === editorDay ? { ...d, enabled: true, blocks: ordered } : d) };
    setEditorDay(null); void persist(next);
  };
  const saveCopy = () => {
    const blocks = schedule.weekly.find((d) => d.day === copySource).blocks;
    void persist({ ...schedule, weekly: schedule.weekly.map((d) => copyTargets.includes(d.day) ? { ...d, enabled: true, blocks: blocks.map((b) => ({ ...b })) } : d) });
    setCopySource(null); setCopyTargets([]);
  };
  const addException = (event) => {
    event.preventDefault();
    const today = todayKey();
    if (!exceptionDate || exceptionDate < today) { setError('Selecciona una fecha de hoy en adelante.'); return; }
    if (schedule.exceptions.some((e) => e.date === exceptionDate)) { setError('Ya existe una excepción para esa fecha.'); return; }
    void persist({ ...schedule, exceptions: [...schedule.exceptions, { id: `${exceptionDate}-${Date.now()}`, date: exceptionDate, reason: exceptionReason.trim() }] });
    setExceptionOpen(false); setExceptionDate(''); setExceptionReason('');
  };
  if (loading) return <section className="doctor-schedule"><div className="ds-loading">Cargando tus horarios…</div></section>;
  return <section className="doctor-schedule">
    <header className="ds-header"><div><span className="ds-eyebrow">SGCM · PORTAL DEL ESPECIALISTA</span><h1>Mis horarios</h1><p>Define los días y bloques en que estarás disponible para atender.</p></div></header>
    {error && <div className="ds-alert" role="alert"><CircleAlert size={18}/>{error}<button onClick={() => setError('')} aria-label="Cerrar aviso"><X size={16}/></button></div>}
    <div className="ds-metrics"><article><span className="ds-metric-icon"><CalendarDays size={20}/></span><div><small>Días activos</small><strong>{metrics.days} <em>de 7</em></strong></div></article><article><span className="ds-metric-icon"><Clock3 size={20}/></span><div><small>Tiempo semanal</small><strong>{metrics.hours}</strong></div></article><article><span className="ds-metric-icon"><CalendarOff size={20}/></span><div><small>Próximo día libre</small><strong className="ds-next">{metrics.next}</strong></div></article></div>
    <div className="ds-main-grid"><section className="ds-card"><div className="ds-card-title"><div><h2>Disponibilidad semanal</h2><p>Activa los días y administra tus bloques de atención.</p></div><span className="ds-timezone">Hora local · Santo Domingo</span></div><div className="ds-table-head"><span>Día</span><span>Estado</span><span>Horario 1</span><span>Horario 2</span><span aria-hidden="true"/></div><div className="ds-day-list">{schedule.weekly.map((day) => <article className="ds-day-row" key={day.day}><label className="ds-day-toggle"><input type="checkbox" checked={day.enabled} onChange={(e) => toggleDay(day.day, e.target.checked)}/><span className="ds-switch"/><span className="ds-day-name">{day.day}</span></label><span className={`ds-status ${day.enabled ? 'is-available' : ''}`}>{day.enabled ? 'Disponible' : 'No disponible'}</span>{[0,1].map((index) => { const block = day.blocks[index]; return <div className="ds-day-slot" key={index}>{day.enabled && block ? <span className="ds-block-chip"><Clock3 size={14}/>{block.start} – {block.end}</span> : <span className="ds-slot-empty">—</span>}{index === 1 && day.blocks.length > 2 && <span className="ds-more">+{day.blocks.length-2}</span>}</div>; })}<div className="ds-day-actions">{day.enabled && <button title="Copiar bloques" aria-label={`Copiar horario de ${day.day}`} onClick={() => { setCopySource(day.day); setCopyTargets([]); }}><Copy size={16}/></button>}<button title="Editar horario" aria-label={`Editar horario de ${day.day}`} disabled={!day.enabled} onClick={() => openEditor(day.day)}><Pencil size={16}/></button></div></article>)}</div><p className="ds-footnote">Tus cambios se guardan automáticamente en esta sesión.</p></section>
    <aside className="ds-card ds-exceptions-card"><div className="ds-exceptions-header"><span className="ds-exception-icon"><CalendarOff size={21}/></span><div className="ds-exceptions-copy"><h2>Excepciones y días libres</h2><p>Añade fechas en las que no estarás disponible.</p></div><button className="ds-add-exception" onClick={() => setExceptionOpen(true)}><Plus size={17}/> Añadir excepción</button></div>{schedule.exceptions.length > 0 && <ul className="ds-exception-list">{[...schedule.exceptions].sort((a,b) => a.date.localeCompare(b.date)).map((item) => <li key={item.id}><span className="ds-exception-date">{dateLabel(item.date)}{item.reason && <small>{item.reason}</small>}</span><button aria-label={`Eliminar excepción ${item.date}`} onClick={() => void persist({ ...schedule, exceptions: schedule.exceptions.filter((e) => e.id !== item.id) })}><Trash2 size={16}/></button></li>)}</ul>}</aside></div>
    {editorDay && <div className="ds-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setEditorDay(null); }}><section className="ds-modal" role="dialog" aria-modal="true" aria-labelledby="ds-editor-title"><header><div><span className="ds-eyebrow">DISPONIBILIDAD</span><h2 id="ds-editor-title">Horario del {editorDay}</h2></div><button className="ds-close" onClick={() => setEditorDay(null)} aria-label="Cerrar"><X/></button></header><p className="ds-modal-copy">Añade uno o más bloques de atención.</p><div className="ds-block-editor">{draft.map((b,i) => <div className="ds-time-row" key={i}><label>Desde<input type="time" value={b.start} onChange={(e) => setDraft(draft.map((x,j) => i===j?{...x,start:e.target.value}:x))}/></label><span className="ds-time-dash">—</span><label>Hasta<input type="time" value={b.end} onChange={(e) => setDraft(draft.map((x,j) => i===j?{...x,end:e.target.value}:x))}/></label><button className="ds-icon-button" aria-label="Eliminar bloque" onClick={() => setDraft(draft.filter((_,j) => j!==i))}><Trash2 size={17}/></button></div>)}</div><button className="ds-text-button" disabled={draft.length>=6} onClick={() => setDraft([...draft,{start:'13:00',end:'17:00'}])}><Plus size={16}/> Añadir bloque</button><footer><button className="ds-secondary" onClick={() => setEditorDay(null)}>Cancelar</button><button className="ds-primary" onClick={saveDay}>Guardar horario</button></footer></section></div>}
    {copySource && <div className="ds-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setCopySource(null); }}><section className="ds-modal" role="dialog" aria-modal="true" aria-labelledby="ds-copy-title"><header><div><span className="ds-eyebrow">COPIAR DISPONIBILIDAD</span><h2 id="ds-copy-title">Copiar {copySource}</h2></div><button className="ds-close" onClick={() => setCopySource(null)} aria-label="Cerrar"><X/></button></header><p className="ds-modal-copy">Selecciona los días que recibirán los mismos bloques.</p><div className="ds-copy-days">{DAYS.filter((day) => day!==copySource).map((day) => <label key={day}><input type="checkbox" checked={copyTargets.includes(day)} onChange={(e) => setCopyTargets(e.target.checked?[...copyTargets,day]:copyTargets.filter((x) => x!==day))}/>{day}</label>)}</div><footer><button className="ds-secondary" onClick={() => setCopySource(null)}>Cancelar</button><button className="ds-primary" disabled={!copyTargets.length} onClick={saveCopy}>Copiar horario</button></footer></section></div>}
    {exceptionOpen && <div className="ds-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setExceptionOpen(false); }}><form className="ds-modal" onSubmit={addException}><header><div><span className="ds-eyebrow">EXCEPCIÓN DE AGENDA</span><h2>Añadir día libre</h2></div><button type="button" className="ds-close" onClick={() => setExceptionOpen(false)} aria-label="Cerrar"><X/></button></header><p className="ds-modal-copy">La fecha seleccionada no aparecerá disponible para nuevas citas.</p><label className="ds-form-label">Fecha<input required type="date" min={todayKey()} value={exceptionDate} onChange={(e) => setExceptionDate(e.target.value)}/></label><label className="ds-form-label">Motivo <span>(opcional)</span><input maxLength={100} value={exceptionReason} onChange={(e) => setExceptionReason(e.target.value)} placeholder="Ej. Congreso médico"/></label><footer><button type="button" className="ds-secondary" onClick={() => setExceptionOpen(false)}>Cancelar</button><button className="ds-primary" type="submit">Guardar día libre</button></footer></form></div>}
  </section>;
}
