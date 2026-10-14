import { CheckCircle2, X } from "lucide-react";

export default function FeedbackToast({ message, onClose }) {
  if (!message) return null;
  return <div className="toast" role="status"><CheckCircle2 size={22} /><p>{message}</p><button type="button" onClick={onClose} aria-label="Cerrar aviso"><X size={19} /></button></div>;
}