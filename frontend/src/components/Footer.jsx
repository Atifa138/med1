export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-xs text-slate-400">
      <p>
        © {new Date().getFullYear()} MediGuide AI. For informational purposes only — always
        consult a licensed physician.
      </p>
    </footer>
  )
}
