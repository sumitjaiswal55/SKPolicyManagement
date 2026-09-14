import {
  Bell,
  Building2,
  Lock,
  User,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

export default function Settings() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1000px] p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="Settings"
          description="Manage your account and application preferences."
        />

        <div className="space-y-5">
          <Section
            icon={User}
            title="Profile"
            description="Your personal information"
          >
            <Input label="Full Name" value="Admin User" />
            <Input label="Email" value="admin@policydesk.com" />
            <Input label="Phone" value="9876543210" />
          </Section>

          <Section
            icon={Building2}
            title="Business"
            description="Business details"
          >
            <Input label="Business Name" value="ABC Insurance Services" />
            <Input label="Business Phone" value="9876543210" />
            <Input label="Address" value="Greater Noida, Uttar Pradesh" />
          </Section>

          <Section
            icon={Bell}
            title="Notifications"
            description="Control your reminder preferences"
          >
            <Toggle label="Premium due reminders" enabled />
            <Toggle label="Overdue payment alerts" enabled />
            <Toggle label="Monthly business summary" />
          </Section>

          <Section
            icon={Lock}
            title="Security"
            description="Manage your account security"
          >
            <button className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Change Password
            </button>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
          <Icon size={18} className="text-slate-600" />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">{children}</div>
    </section>
  );
}

function Input({ label, value }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-slate-500">
        {label}
      </span>

      <input
        defaultValue={value}
        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
      />
    </label>
  );
}

function Toggle({ label, enabled = false }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
      <span className="text-sm font-medium text-slate-700">{label}</span>

      <div
        className={`flex h-6 w-11 items-center rounded-full p-1 ${
          enabled ? "bg-slate-900" : "bg-slate-200"
        }`}
      >
        <div
          className={`h-4 w-4 rounded-full bg-white transition ${
            enabled ? "translate-x-5" : ""
          }`}
        />
      </div>
    </div>
  );
}