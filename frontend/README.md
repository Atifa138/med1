# MediGuide AI — Frontend

A modern, professional React frontend for a medical report analysis dashboard.
**Frontend only** — no backend, no AI pipeline, no RAG. All data is mocked in
`src/data/dummyData.js` and authentication is simulated in-memory.

## Tech Stack

- React 18
- Vite
- React Router v6
- Tailwind CSS
- lucide-react (icons)

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

Log in or register with **any** email/password — authentication is mocked
client-side (see `src/context/AuthContext.jsx`) and stored in `sessionStorage`
for the duration of the tab session.

## Folder Structure

```
src/
├── components/        Reusable UI building blocks
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Footer.jsx
│   ├── DashboardLayout.jsx   (shell combining Navbar + Sidebar + Footer)
│   ├── ProtectedRoute.jsx
│   ├── LoadingSpinner.jsx
│   ├── PDFUpload.jsx
│   ├── ResultCard.jsx
│   ├── HistoryCard.jsx
│   └── VitalLogo.jsx         (brand mark / signature motif)
├── pages/              One component per route
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── UploadReport.jsx
│   ├── AnalysisResult.jsx
│   ├── History.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
├── context/
│   └── AuthContext.jsx       Mock auth state (no backend calls)
├── data/
│   └── dummyData.js          All dummy/mock data used across pages
├── App.jsx             Route definitions
├── main.jsx            App entry point
└── index.css           Tailwind layers + global styles
```

## Design

- **Palette:** white surfaces, deep clinical blue (`brand`), and teal
  (`teal`) as the primary accent, evoking a modern medical dashboard.
- **Typography:** Lexend for display/headings, Inter for body text, IBM Plex
  Mono for report values.
- **Signature motif:** an animated "vital line" (ECG-style trace) used across
  the login/register hero panels, the dashboard CTA, and the 404 page to tie
  the whole product back to its subject.

## Notes

- No network requests are made anywhere in this codebase.
- Replace the contents of `src/data/dummyData.js` and the mock functions in
  `src/context/AuthContext.jsx` when wiring up a real backend.
