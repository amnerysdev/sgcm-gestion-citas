import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/tokens.css";
import "./styles/layout.css";
import "./features/appointments/booking.css";
import "./features/my-appointments/my-appointments.css";
import "./features/my-profile/my-profile.css";
import "./features/login/login.css";
import "./features/login/registration.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
