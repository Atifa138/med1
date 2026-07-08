import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import HistoryCard from "../components/HistoryCard";
import { useAuth } from "../context/AuthContext";

const filters = ["All", "Low", "Moderate", "High"];

export default function History() {
  const { user } = useAuth();

  const [reports, setReports] = useState([]);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://127.0.0.1:8000/history?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("History API:", data);

        const mapped = data.map((report) => ({
          id: report.id,
          name: report.filename,
          type: "Medical Report",
          date: report.created_at,
          status: report.status,

          riskLevel: report.risk
            ? report.risk.toLowerCase().includes("high")
              ? "High"
              : report.risk.toLowerCase().includes("moderate")
              ? "Moderate"
              : "Low"
            : "Low",

          answer: report.answer,
          risk: report.risk,
          explanation: report.explanation,
        }));

        setReports(mapped);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  const filtered = useMemo(() => {
    return reports.filter((report) => {
      const matchesQuery =
        report.name.toLowerCase().includes(query.toLowerCase()) ||
        report.type.toLowerCase().includes(query.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ||
        report.riskLevel === activeFilter;

      return matchesQuery && matchesFilter;
    });
  }, [reports, query, activeFilter]);

  return (
    <div className="mx-auto max-w-4xl animate-fade-up">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Report History
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Every report you've analyzed, in one place.
        </p>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search reports..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="focus-ring w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-slate-400"
          />
        </div>

        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`focus-ring rounded-full px-3.5 py-1.5 text-xs font-medium ${
                activeFilter === filter
                  ? "bg-teal-600 text-white"
                  : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((report) => (
            <HistoryCard
              key={report.id}
              report={report}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <p className="text-sm font-medium text-ink">
            No reports found.
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Upload a report to see it here.
          </p>
        </div>
      )}
    </div>
  );
}