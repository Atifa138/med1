import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import VitalLogo from '../components/VitalLogo.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    full_name: '',
    username: '',
    password: '',
    agree: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    if (!form.full_name || !form.username || !form.password) {
      setError('Please fill in every field.')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (!form.agree) {
      setError('Please accept the terms.')
      return
    }

    try {
      setLoading(true)

      await register(
        form.full_name,
        form.username,
        form.password
      )
      navigate("/login", {
        replace: true,
        state: {
          registered: true,
        },
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-brand-600 p-10 text-white lg:flex">
        <VitalLogo className="text-white [&_span]:text-white" />

        <div className="max-w-md">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-teal-100">
            Your reports, explained
          </p>

          <h2 className="font-display text-3xl font-semibold leading-tight">
            Create your account and get your first analysis in under a minute.
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">

          <div className="mb-8 lg:hidden">
            <VitalLogo />
          </div>

          <h1 className="font-display text-2xl font-semibold text-ink">
            Create your account
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Start understanding your health data.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Full Name
              </label>

              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="focus-ring w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Username
              </label>

              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className="focus-ring w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Password
              </label>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="focus-ring w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-slate-500">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              I agree to the Terms of Service and Privacy Policy.
            </label>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="focus-ring flex w-full items-center justify-center rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-70"
            >
              {loading ? (
                <LoadingSpinner size="sm" label="" />
              ) : (
                'Create account'
              )}
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-teal-600 hover:text-teal-700"
            >
              Log in
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}