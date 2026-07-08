export default function VitalLogo({ size = 'md', showWordmark = true, className = '' }) {
  const dims = size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8'
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`${dims} shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-teal-500 p-1.5 shadow-soft`}
      >
        <svg viewBox="0 0 40 40" className="h-full w-full" fill="none">
          <path
            d="M2 20H13L16 8L22 32L26 16L29 20H38"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showWordmark && (
        <span className={`font-display font-semibold tracking-tight text-ink ${textSize}`}>
          MediGuide <span className="text-teal-600">AI</span>
        </span>
      )}
    </div>
  )
}
