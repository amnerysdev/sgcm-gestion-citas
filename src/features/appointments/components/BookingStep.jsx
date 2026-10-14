export default function BookingStep({ number, title }) {
  return <div className="step-title"><span>{number}</span><h2>{title}</h2></div>;
}