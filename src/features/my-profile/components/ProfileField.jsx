export default function ProfileField({ label, name, value, onChange, type = "text", options, multiline = false }) {
  return <label className="field"><span>{label}</span>{options ? <select name={name} value={value || ""} onChange={onChange}>{options.map((option) => <option key={option} value={option}>{option || "Selecciona una opción"}</option>)}</select> : multiline ? <textarea name={name} value={value || ""} onChange={onChange} rows={4} /> : <input name={name} type={type} value={value || ""} onChange={onChange} />}</label>;
}
