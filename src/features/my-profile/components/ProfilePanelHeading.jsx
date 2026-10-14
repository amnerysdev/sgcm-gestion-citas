export default function ProfilePanelHeading({ icon: Icon, title, description, action }) {
  return <div className={`panelhead ${action ? "" : "compact"}`}><div className="icon"><Icon size={26} /></div><div className="paneltitle"><h2>{title}</h2><p>{description}</p></div>{action}</div>;
}