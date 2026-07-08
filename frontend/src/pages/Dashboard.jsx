import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  FileUp,
  FileText,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import HistoryCard from "../components/HistoryCard";

export default function Dashboard() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`https://med1-production.up.railway.app/dashboard/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const reports = data.recent_reports.map((report) => ({
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

        setDashboard({
          ...data,
          recent_reports: reports,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl py-20 text-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-fade-up">

      {/* Hero */}

      <section className="rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-teal-600 p-8 text-white">

        <h1 className="text-3xl font-bold">
          Welcome {user?.full_name} 👋
        </h1>

        <p className="mt-2 text-brand-100">
          Upload a report and let AI explain it in simple language.
        </p>

        <Link
          to="/upload"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-brand-700"
        >
          <FileUp size={18} />
          Upload Report
        </Link>

      </section>

      {/* Stats */}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl border bg-white p-5 shadow">
          <p className="text-sm text-slate-500">
            Total Reports
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {dashboard.total_reports}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow">
          <p className="text-sm text-slate-500">
            Low Risk
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {dashboard.low_risk}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow">
          <p className="text-sm text-slate-500">
            Moderate Risk
          </p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-600">
            {dashboard.moderate_risk}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow">
          <p className="text-sm text-slate-500">
            High Risk
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {dashboard.high_risk}
          </h2>
        </div>

      </section>

      {/* Recent Reports */}

      <section className="rounded-2xl border bg-white p-6 shadow">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-xl font-semibold">
            Recent Reports
          </h2>

          {dashboard.recent_reports.length > 0 && (
            <Link
              to="/history"
              className="flex items-center gap-1 text-teal-600"
            >
              View All
              <ArrowUpRight size={16} />
            </Link>
          )}

        </div>

        {dashboard.recent_reports.length === 0 ? (

          <div className="py-16 text-center">

            <FileText
              size={60}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-5 text-xl font-semibold">
              No Reports Yet
            </h3>

            <p className="mt-2 text-slate-500">
              Upload your first medical report to begin analysis.
            </p>

            <Link
              to="/upload"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white"
            >
              <FileUp size={18} />
              Upload First Report
            </Link>

          </div>

        ) : (

          <div className="space-y-3">

            {dashboard.recent_reports.map((report) => (
              <HistoryCard
                key={report.id}
                report={report}
              />
            ))}

          </div>

        )}

      </section>

    </div>
  );
}