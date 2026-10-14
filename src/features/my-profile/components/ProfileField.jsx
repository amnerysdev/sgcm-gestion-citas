export default function ProfileField({ label, name, value, onChange, type = "text", options }) {
  return <label className="field"><span>{label}</span>{options ? <select name={name} value={value} onChange={onChange}>{options.map((option) => <option key={option}>{option}</option>)}</select> : <input name={name} type={type} value={value || ""} onChange={onChange} />}</label>;
}