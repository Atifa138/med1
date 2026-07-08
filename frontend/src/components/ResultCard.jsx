const statusStyles = {
  normal: { dot: 'bg-teal-500', text: 'text-teal-700', bg: 'bg-teal-50', label: 'Normal' },
  attention: { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50', label: 'Attention' },
  low: { dot: 'bg-brand-500', text: 'text-brand-700', bg: 'bg-brand-50', label: 'Low' },
  high: { dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50', label: 'High' },
}

export default function ResultCard({ marker }) {
  const style = statusStyles[marker.status] || statusStyles.normal

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-card">
      <div className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
        <div>
          <p className="text-sm font-medium text-ink">{marker.name}</p>
          <p className="text-xs text-slate-400">Reference: {marker.range}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-mono text-sm font-medium text-ink">{marker.value}</p>
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${style.bg} ${style.text}`}
        >
          {style.label}
        </span>
      </div>
    </div>
  )
}
