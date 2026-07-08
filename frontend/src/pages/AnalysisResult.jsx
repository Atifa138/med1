import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Download,
  FileText,
} from "lucide-react";

import jsPDF from "jspdf";

const riskBadge = {
  Low: "bg-teal-50 text-teal-700 border-teal-200",
  Moderate: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-red-50 text-red-700 border-red-200",
};

export default function AnalysisResult() {
  const { state } = useLocation();
  console.log("STATE =", state);
  console.log("ANALYSIS =", state?.analysis);

  const navigate = useNavigate();

  // Coming from Upload -> Analyze
  const analysis = state?.analysis;

  // Coming from History page
  const historyReport = state?.report;

  // Use report from History if available
  const report =
  state?.report || {
    name: "Medical Report.pdf",
    type: "Medical Report",
    date: new Date().toISOString()
    
  };

  // Support both navigation flows
  const answer =
    analysis?.analysis?.answer ||
    report.answer ||
    "No analysis available.";

  const risk =
    analysis?.analysis?.risk ||
    report.risk ||
    "No risk assessment available.";
    const calculatedRiskLevel = (() => {
  const text = risk.toLowerCase();

  if (text.includes("high")) return "High";

  if (text.includes("moderate")) return "Moderate";

  if (
    text.includes("normal") ||
    text.includes("no abnormal") ||
    text.includes("low")
  ) {
    return "Low";
  }

  return report.riskLevel || "Low";
})();

  const explanation =
    analysis?.analysis?.explanation ||
    report.explanation ||
    "No explanation available.";
  const lifestyle =
  analysis?.analysis?.lifestyle ||
  report.lifestyle ||
  "No lifestyle recommendations available.";

  const summary =
  analysis?.analysis?.summary ||
  report.summary ||
  "No summary available.";

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("MediGuide AI - Medical Report Summary", 20, 20);

    doc.setFontSize(12);

    doc.text(`Report: ${report.name}`, 20, 35);
    doc.text(
      `Date: ${new Date(report.date).toLocaleDateString()}`,
      20,
      45
    );

    doc.text("Report Summary:", 20, 60);
    doc.text(doc.splitTextToSize(summary, 170), 20, 70);

    let y = 120;

    doc.text("Medical Answer:", 20, y);
    doc.text(doc.splitTextToSize(answer, 170), 20, y + 10);

    y += 70;

    doc.text("Risk Assessment:", 20, y);
    doc.text(doc.splitTextToSize(risk, 170), 20, y + 10);

    y += 70;

    doc.text("Lifestyle Advice:", 20, y);
    doc.text(doc.splitTextToSize(lifestyle, 170), 20, y + 10);

    y += 70;

    doc.text("Simple Explanation:", 20, y);
    doc.text(doc.splitTextToSize(explanation, 170), 20, y + 10);

    doc.save("Medical_Report_Summary.pdf");
  };

  // Nothing passed from either page
  if (!analysis && !historyReport) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <h2 className="text-xl font-semibold">
          No analysis found.
        </h2>

        <button
          onClick={() => navigate("/upload")}
          className="mt-6 rounded-xl bg-teal-600 px-5 py-3 text-white"
        >
          Upload Report
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl animate-fade-up">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">

        {/* Header */}

        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">

          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <FileText className="h-6 w-6" />
            </span>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                {report.name}
              </h2>

              <p className="text-xs text-slate-400">
                {report.type} ·{" "}
                {new Date(report.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
              riskBadge[calculatedRiskLevel]
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            {calculatedRiskLevel} Risk
          </span>
        </div>

        {/* Report Summary */}

<div className="border-b border-slate-100 py-6">
  <h3 className="mb-2 text-lg font-semibold">
    Report Summary
  </h3>

  <p className="whitespace-pre-line text-slate-700">
    {summary}
  </p>
</div>

        {/* Medical Answer */}

        <div className="border-b border-slate-100 py-6">
          <h3 className="mb-2 text-lg font-semibold">
            Medical Answer
          </h3>

          <p className="text-slate-700 whitespace-pre-line">
            {answer}
          </p>
        </div>

        {/* Risk */}

        <div className="border-b border-slate-100 py-6">
          <h3 className="mb-2 text-lg font-semibold">
            Risk Assessment
          </h3>

          <p className="text-slate-700 whitespace-pre-line">
            {risk}
          </p>
        </div>
        {/* Lifestyle */}
        <div className="border-b border-slate-100 py-6">
          <h3 className="mb-2 text-lg font-semibold">
            Lifestyle Advice
          </h3>
        <p className="whitespace-pre-line text-slate-700">
          {lifestyle}
          </p>
        </div>

        

        {/* Explanation */}

        <div className="py-6">
          <h3 className="mb-2 text-lg font-semibold">
            Simple Explanation
          </h3>

          <p className="whitespace-pre-line text-slate-700">
            {explanation}
          </p>
        </div>

        {/* Buttons */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          <button
            onClick={downloadPDF}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Download className="h-4 w-4" />
            Download PDF Summary
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold hover:bg-slate-50"
          >
            Analyze Another Report
          </button>

        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          This summary is generated by AI and is for informational purposes only.
          Always consult a qualified healthcare professional.
        </p>

      </div>
    </div>
  );
}