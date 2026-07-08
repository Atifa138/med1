import { useCallback, useRef, useState } from 'react'
import { FileText, UploadCloud, X } from 'lucide-react'

export default function PDFUpload({ onFileSelected }) {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const validateAndSet = (selected) => {
    if (!selected) return
    if (selected.type !== 'application/pdf') {
      setError('Please upload a PDF file.')
      return
    }
    if (selected.size > 15 * 1024 * 1024) {
      setError('File is too large. Maximum size is 15MB.')
      return
    }
    setError('')
    setFile(selected)
    onFileSelected?.(selected)
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    validateAndSet(dropped)
  }, [])

  const removeFile = () => {
    setFile(null)
    setError('')
    onFileSelected?.(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  if (file) {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-teal-200 bg-teal-50/60 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-medium text-ink">{file.name}</p>
            <p className="text-xs text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
        </div>
        <button
          onClick={removeFile}
          className="focus-ring rounded-full p-1.5 text-slate-400 hover:bg-white hover:text-red-500"
          aria-label="Remove file"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
          isDragging
            ? 'border-teal-500 bg-teal-50'
            : 'border-slate-300 bg-white hover:border-teal-400 hover:bg-teal-50/40'
        }`}
      >
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <UploadCloud className="h-7 w-7" />
        </span>
        <p className="text-sm font-medium text-ink">
          Drag and drop your report, or <span className="text-teal-600">browse</span>
        </p>
        <p className="mt-1 text-xs text-slate-400">PDF only, up to 15MB</p>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => validateAndSet(e.target.files?.[0])}
        />
      </label>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}
