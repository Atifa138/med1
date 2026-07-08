import { useEffect, useState } from "react";
import {
  Calendar,
  Droplet,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    username: "",
    phone: "",
    dob: "",
    bloodGroup: "O+",
  });

  const [saved, setSaved] =useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.full_name || "",
        username: user.username || "",
        phone: user.phone || "",
        dob: user.dob || "",
        bloodGroup: user.bloodGroup || "O+",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSave = (e) => {
    e.preventDefault();

    // Backend profile update will be added later.

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const initials =
    form.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="mx-auto max-w-3xl animate-fade-up">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Profile
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal and account details.
        </p>
      </div>

      <div className="mb-6 flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-600 text-2xl font-semibold text-white">
          {initials}
        </span>

        <div className="text-center sm:text-left">
          <h3 className="font-display text-lg font-semibold text-ink">
            {form.name}
          </h3>

          <p className="text-sm text-slate-500">
            @{form.username}
          </p>

          <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium text-teal-600 sm:justify-start">
            <ShieldCheck className="h-3.5 w-3.5" />

            Registered User
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h3 className="font-display text-base font-semibold text-ink">
          Personal information
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Full Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="focus-ring w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Username
            </label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={form.username}
                disabled
                className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-100 py-2.5 pl-10 pr-3 text-sm text-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Phone Number
            </label>

            <div className="relative">
              <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="focus-ring w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-ink"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Date of Birth
            </label>

            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="focus-ring w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-ink"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Blood Group
            </label>

            <div className="relative">
              <Droplet className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                className="focus-ring w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-ink"
              >
                {[
                  "O+",
                  "O-",
                  "A+",
                  "A-",
                  "B+",
                  "B-",
                  "AB+",
                  "AB-",
                ].map((bg) => (
                  <option key={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="focus-ring rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-teal-700"
          >
            Save Changes
          </button>

          {saved && (
            <span className="text-sm font-medium text-teal-600">
              Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}