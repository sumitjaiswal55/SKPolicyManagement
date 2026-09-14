import {
  ArrowLeft,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  Plus,
} from "lucide-react";
import StatusBadge from "../components/StatusBadge";

export default function CustomerDetails({ customer, policies, onBack, onPolicy }) {
  if (!customer) return null;

 const customerPolicies = policies.filter(
  (p) => p.customerId === customer.id
);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1200px] p-4 sm:p-6 lg:p-8">
        <button
          onClick={onBack}
          className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Customers
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
              {customer.name
                .split(" ")
                .map((x) => x[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  {customer.name}
                </h1>
                <StatusBadge status={customer.status} />
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Customer ID: {customer.id}
              </p>
            </div>

            <button className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
              <Plus size={16} className="mr-2 inline" />
              Add Policy
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Info icon={Phone} label="Phone" value={customer.phone} />
            <Info icon={Mail} label="Email" value={customer.email} />
            <Info icon={CalendarDays} label="Date of Birth" value={customer.dob} />
            <Info icon={MapPin} label="City" value={customer.city} />
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-slate-900">Policies</h2>
            <p className="mt-1 text-xs text-slate-500">
              All policies belonging to this customer.
            </p>
          </div>

          <div className="space-y-3">
            {customerPolicies.map((policy) => (
              <button
                key={policy.id}
                onClick={() => onPolicy(policy)}
                className="flex w-full flex-col gap-3 rounded-xl border border-slate-100 p-4 text-left transition hover:border-slate-200 hover:bg-slate-50 sm:flex-row sm:items-center"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {policy.plan}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {policy.id} · {policy.company}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    ₹{policy.premium.toLocaleString("en-IN")}
                    <span className="text-xs font-normal text-slate-400">
                      {" "}
                      / {policy.frequency}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Next due: {policy.nextDue}
                  </p>
                </div>

                <StatusBadge status={policy.status} />
              </button>
            ))}

            {!customerPolicies.length && (
              <p className="py-8 text-center text-sm text-slate-400">
                No policies found.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Icon size={14} />
        {label}
      </div>
      <p className="mt-2 truncate text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}