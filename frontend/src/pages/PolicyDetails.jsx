import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
} from "lucide-react";
import { payments } from "../data/mockData";
import StatusBadge from "../components/StatusBadge";

export default function PolicyDetails({ policy, onBack, onPayment }) {
  if (!policy) return null;

  const history = payments.filter((payment) => payment.policy === policy.id);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1200px] p-4 sm:p-6 lg:p-8">
        <button
          onClick={onBack}
          className="mb-5 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Policies
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <IndianRupee size={23} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  {policy.id}
                </h1>
                <StatusBadge status={policy.status} />
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {policy.customer} · {policy.plan}
              </p>

              <p className="mt-1 text-xs text-slate-400">{policy.company}</p>
            </div>

            <button
              onClick={onPayment}
              className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
            >
              Record Payment
            </button>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Metric
              label="Premium"
              value={`₹${policy.premium.toLocaleString("en-IN")}`}
            />
            <Metric label="Frequency" value={policy.frequency} />
            <Metric label="Next Premium" value={policy.nextDue} />
            <Metric
              label="Sum Assured"
              value={`₹${policy.sumAssured.toLocaleString("en-IN")}`}
            />
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold text-slate-900">Policy Information</h2>

            <div className="mt-5 space-y-4">
              <Row label="Policy Number" value={policy.id} />
              <Row label="Plan Name" value={policy.plan} />
              <Row label="Insurance Company" value={policy.company} />
              <Row label="Policy Type" value={policy.type} />
              <Row label="Start Date" value={policy.startDate} />
              <Row label="Maturity Date" value={policy.maturity} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Payment History
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Recent premium payments
                </p>
              </div>

              <CheckCircle2 className="text-emerald-500" size={21} />
            </div>

            <div className="mt-5 space-y-3">
              {history.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                    <CalendarDays size={16} className="text-slate-500" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700">
                      {payment.date}
                    </p>
                    <p className="text-xs text-slate-400">{payment.method}</p>
                  </div>

                  <p className="text-sm font-bold text-slate-800">
                    ₹{payment.amount.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}

              {!history.length && (
                <div className="py-8 text-center text-sm text-slate-400">
                  No payment history.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-50 pb-3">
      <span className="text-xs text-slate-400">{label}</span>
      <span className="text-right text-sm font-medium text-slate-700">
        {value}
      </span>
    </div>
  );
}
