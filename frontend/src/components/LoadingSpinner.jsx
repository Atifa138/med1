export default function LoadingSpinner({ label = 'Loading', size = 'md', fullScreen = false }) {
  const dims = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-10 w-10' : 'h-6 w-6'

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <svg
        className={`${dims} animate-spin text-teal-600`}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {label && <p className="text-sm font-medium text-slate-500">{label}</p>}
    </div>
  )

  if (!fullScreen) return spinner

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center" role="status">
      {spinner}
    </div>
  )
}
