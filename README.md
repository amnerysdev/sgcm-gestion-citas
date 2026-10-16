# .𖥔 ݁ ˖🩺 SGCM · Medical Appointment Management

SGCM is a web portal for coordinating the appointment journey between patients and medical specialists. Patients can explore specialties and doctors, choose a date and available time, and keep track of upcoming and past visits. Specialists have a separate workspace to manage weekly availability, mark days off, review their appointment list, update appointment statuses, and maintain their professional profile.

The project is designed as a complete local demonstration: the React interface communicates with a Node.js API, which handles registration, sign-in, sessions, profiles, schedules, and appointment data. The API uses an in-memory database, so no external database setup is required to explore the application.

## 📦 Technologies

- `JavaScript (ES modules)` — application and API logic
- `React 18` — component-based user interface
- `Vite 6` — development tooling and frontend build
- `Node.js HTTP` — local API server and Vite middleware
- `Map` — in-memory records for users, sessions, schedules, and appointments
- `Lucide React` — interface icons
- `CSS` — responsive layouts, shared design tokens, and feature-specific styling

## 🚀 Features

- **Patient and Specialist Registration:** Create an account as a patient or specialist. Specialist registration requires selecting a medical specialty.

- **Authentication:** Sign in with a demo or registered account. The API keeps the session in memory and sends the session identifier in an HTTP-only cookie.

- **Appointment Booking:** Browse medical specialties and doctors, select an available date and time, and save an appointment.

- **Patient Appointments:** Review upcoming and past visits, search and filter appointments, request a schedule change, or cancel an appointment.

- **Specialist Availability:** Enable working days, set one or more appointment blocks per day, and add exceptions for unavailable dates.

- **Specialist Appointments:** Review patient appointments, update appointment statuses, and keep notes for a visit.

- **Patient and Professional Profiles:** View and edit contact information, patient details or specialist credentials, profile photos, and preferences.

- **Responsive Portal:** Navigate the patient and specialist workspaces on desktop and smaller screens.

## 🖇 How to Run

1. Install [Node.js 18 or newer](https://nodejs.org/).
2. Clone or download this repository, then open its project folder in a terminal.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the portal and API:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

To build the frontend for production, run:

```bash
npm run build
```

## 🔐 Demo Credentials

Use either account to explore its respective portal:

| Account | Email | Password |
| --- | --- | --- |
| Patient | `paciente@sgcm.demo` | `SGCMdemo123` |
| Specialist | `especialista@sgcm.demo` | `DoctorDemo123` |

## 💥 Preview

The application currently runs as a local preview. Start it with `npm run dev`, then open [http://localhost:5173](http://localhost:5173) and sign in with one of the demo credentials above.

## 🧠 Data and API

The HTTP API is defined in `server.js`; the in-memory data model and demo records are in `server/memoryDatabase.js`. The frontend sends requests through `src/api.js`.

Available API groups:

- **Authentication:** `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/me`
- **Catalog and availability:** `/api/catalog`, `/api/availability`
- **Patient appointments:** `/api/appointments`
- **Specialist schedule:** `/api/schedule`
- **Specialist appointments:** `/api/specialist/appointments`
- **Profiles:** `/api/profile`

All data is temporary and is reset when the server process stops or restarts. The in-memory store is intended for development and demonstrations, not for production patient records.

## 📂 Project Structure

```text
src/
├── app/                          # Portal navigation and section definitions
├── components/                   # Shared shell, sidebar, top bar, and home panel
├── features/
│   ├── appointments/             # Specialty, doctor, calendar, and booking flow
│   ├── doctor-schedule/          # Specialist working hours and exceptions
│   ├── login/                    # Sign-in and account registration
│   ├── my-appointments/          # Patient appointment list and actions
│   ├── my-profile/               # Patient and specialist profiles
│   └── specialist-appointments/  # Specialist appointments and visit notes
├── styles/                       # Shared design tokens and layout styles
├── api.js                        # Frontend API client
├── App.jsx                       # Session state and application entry point
└── main.jsx                      # React mount and global styles
server.js                         # Node.js API and Vite middleware
server/memoryDatabase.js          # In-memory data and demo accounts
```

## 📝 Notes

- The server uses port `5173` by default. Set the `PORT` environment variable to use a different port.
- Demo accounts and seeded appointments are recreated whenever the server starts.
- Demo credentials and in-memory storage are for local exploration only; do not use them for real patient data.
