import { ChevronRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const riskStyles = {
  Low: "bg-teal-50 text-teal-700",
  Moderate: "bg-amber-50 text-amber-700",
  High: "bg-red-50 text-red-700",
};

export default function HistoryCard({ report }) {
  const navigate = useNavigate();

  const openAnalysis = () => {
    if (!report.answer) {
      alert("This report has not been analyzed yet.");
      return;
    }

    navigate("/analysis-result", {
      state: {
        analysis: {
          report_id: report.id,
          status: report.status,
          analysis: {
            answer: report.answer,
            risk: report.risk,
            explanation: report.explanation,
          },
        },
        report,
      },
    });
  };

  return (
    <button
      onClick={openAnalysis}
      className="focus-ring flex w-full items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <FileText className="h-5 w-5" />
        </span>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">
            {report.name}
          </p>

          <p className="text-xs text-slate-400">
            {report.type} · {new Date(report.date).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            riskStyles[report.riskLevel]
          }`}
        >
          {report.riskLevel} Risk
        </span>

        <ChevronRight className="hidden h-4 w-4 text-slate-300 sm:block" />
      </div>
    </button>
  );
}