import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import PDFUpload from '../components/PDFUpload.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { useAuth } from "../context/AuthContext";


const steps = [
  'Uploading your file securely',
  'Extracting text from the report',
  'Identifying markers and reference ranges',
  'Generating plain-language summary',
]

export default function UploadReport() {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [file, setFile] = useState(null)
  const [reportType, setReportType] = useState('Blood Test')
  const [analyzing, setAnalyzing] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  const handleAnalyze = async () => {
  if (!file) return;

  try {
    setAnalyzing(true);

    // Step 1: Upload PDF
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", user.username);

    const uploadRes = await fetch("https://med1-production.up.railway.app/upload/report", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();
    if (!uploadRes.ok) {
  console.log(uploadData);
  throw new Error(uploadData.detail);
}

    console.log(uploadData);

    const analyzeRes = await fetch("https://med1-production.up.railway.app/analyze/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    report_id: uploadData.report_id,
    query: "Summarize this medical report",
  }),
});

const analysis = await analyzeRes.json();

if (!analyzeRes.ok) {
  console.log(analysis);
  throw new Error(analysis.detail);
}

console.log(analysis);

navigate("/analysis-result", {
  state: {
    analysis,
  },
});
  } catch (err) {
    console.error(err);
    alert("Upload Failed");
  } finally {
    setAnalyzing(false);
  }
};

  return (
    <div className="mx-auto max-w-2xl animate-fade-up">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-ink">Upload a medical report</h2>
        <p className="mt-1 text-sm text-slate-500">
          We'll read your PDF and translate it into a clear, plain-language summary.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        {analyzing ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <LoadingSpinner size="lg" label="" />
            <p className="mt-5 font-medium text-ink">{steps[stepIndex]}</p>
            <div className="mt-6 w-full max-w-xs space-y-2">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2 text-xs">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      i <= stepIndex ? 'bg-teal-500' : 'bg-slate-200'
                    }`}
                  />
                  <span className={i <= stepIndex ? 'text-ink' : 'text-slate-400'}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <label className="mb-1.5 block text-sm font-medium text-ink">Report type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="focus-ring w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink"
              >
                <option>Blood Test</option>
                <option>Lipid Panel</option>
                <option>Thyroid</option>
                <option>Liver Panel</option>
                <option>Vitamins</option>
                <option>Other</option>
              </select>
            </div>

            <label className="mb-1.5 block text-sm font-medium text-ink">Report file</label>
            <PDFUpload onFileSelected={setFile} />

            <button
              onClick={handleAnalyze}
              disabled={!file}
              className="focus-ring mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <Sparkles className="h-4 w-4" /> Analyze report
            </button>
            <p className="mt-3 text-center text-xs text-slate-400">
  Your medical report will be securely analyzed using AI. The generated summary is for informational purposes only.
</p>
          </>
        )}
      </div>
    </div>
  )
}
