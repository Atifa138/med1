import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import VitalLogo from '../components/VitalLogo.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const registered = location.state?.registered;

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    if (!form.username || !form.password) {
      setError('Enter your username and password to continue.')
      return
    }

    try {
      setLoading(true)

      await login(
        form.username,
        form.password
      )

      navigate(
        location.state?.from?.pathname || '/dashboard',
        { replace: true }
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-teal-600 p-10 text-white lg:flex">
        <VitalLogo className="text-white [&_span]:text-white" />

        <div className="max-w-md">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-teal-200">
            Report clarity, in seconds
          </p>

          <h2 className="font-display text-3xl font-semibold leading-tight">
            Understand your lab reports without the medical jargon.
          </h2>

          <p className="mt-4 text-sm text-brand-100">
            Upload any PDF report and get a plain-language breakdown of every
            marker, flagged risks, and next steps to discuss with your doctor.
          </p>
        </div>

        <svg viewBox="0 0 400 60" className="w-full opacity-70">
          <path
            className="vital-trace"
            d="M0 30 H150 L165 8 L182 52 L198 15 L214 40 H400"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Form side */}
      <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <VitalLogo />
          </div>

          <h1 className="font-display text-2xl font-semibold text-ink">
            Welcome back
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Log in to view your report history and analyses.
          </p>
          {registered && (
  <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
    Account created successfully. Please log in.
  </div>
)}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">

            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Username
              </label>

              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={handleChange}
                  className="focus-ring w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-ink"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-teal-600 hover:text-teal-700"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="focus-ring w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm text-ink placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="focus-ring flex w-full items-center justify-center rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-700 disabled:opacity-70"
            >
              {loading ? (
                <LoadingSpinner size="sm" label="" />
              ) : (
                'Log in'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-teal-600 hover:text-teal-700"
            >
              Create one
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-slate-400">
            Use your registered username and password to log in.
          </p>
        </div>
      </div>
    </div>
  )
}