import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import VitalLogo from '../components/VitalLogo.jsx'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <VitalLogo className="mb-10" />

      <svg viewBox="0 0 300 60" className="mb-6 w-64 opacity-80">
        <path
          className="vital-trace"
          d="M0 30 H100 L112 10 L128 50 L142 18 L156 40 H300"
          fill="none"
          stroke="#0D9488"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <h1 className="font-display text-6xl font-bold text-brand-700">404</h1>
      <h2 className="mt-3 font-display text-xl font-semibold text-ink">
        We couldn't find that page
      </h2>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        The page you're looking for may have moved or no longer exists. Let's get you back to
        somewhere useful.
      </p>

      <Link
        to="/dashboard"
        className="focus-ring mt-7 flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
      >
        <Home className="h-4 w-4" /> Back to dashboard
      </Link>
    </div>
  )
}
