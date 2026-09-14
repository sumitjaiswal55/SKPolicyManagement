import {
  Users,
  FileText,
  IndianRupee,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Clock3,
  CheckCircle2,
  MoreHorizontal,
} from "lucide-react";

import StatCard from "../components/StatCard";

const upcomingPayments = [
  {
    name: "Amit Sharma",
    policy: "Health Secure Plus",
    amount: "₹8,000",
    due: "Today",
    urgent: true,
  },
  {
    name: "Rajesh Kumar",
    policy: "Secure Life Plus",
    amount: "₹2,500",
    due: "2 days",
  },
  {
    name: "Priya Singh",
    policy: "Family Protection",
    amount: "₹3,500",
    due: "5 days",
  },
  {
    name: "Rohit Verma",
    policy: "Term Life Plan",
    amount: "₹4,200",
    due: "8 days",
  },
];

const recentPolicies = [
  {
    id: "POL-10248",
    customer: "Neha Gupta",
    type: "Life Insurance",
    premium: "₹3,200",
    status: "Active",
  },
  {
    id: "POL-10247",
    customer: "Vikas Singh",
    type: "Health Insurance",
    premium: "₹7,500",
    status: "Active",
  },
  {
    id: "POL-10246",
    customer: "Anjali Sharma",
    type: "Term Insurance",
    premium: "₹2,800",
    status: "Active",
  },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Sunday, 13 September 2026
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Good afternoon 👋
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Here's what's happening with your business today.
            </p>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:w-auto">
            <FileText size={17} />
            Add New Policy
          </button>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          <StatCard
            title="Total Customers"
            value="248"
            subtitle="+12 this month"
            icon={Users}
          />

          <StatCard
            title="Active Policies"
            value="316"
            subtitle="+8 this month"
            icon={FileText}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />

          <StatCard
            title="Premium Collected"
            value="₹4.82L"
            subtitle="+14.8% vs last month"
            icon={IndianRupee}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />

          <StatCard
            title="Upcoming Dues"
            value="12"
            subtitle="Next 7 days"
            icon={AlertCircle}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
        </section>

        {/* Main grid */}
        <section className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
          {/* Business Overview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Business Overview
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Premium collection for the last 6 months
                </p>
              </div>

              <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600">
                Last 6 months
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">
                  ₹4,82,500
                </span>

                <span className="mb-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight size={14} />
                  14.8%
                </span>
              </div>

              {/* Fake chart for frontend */}
              <div className="mt-7 flex h-48 items-end gap-2 sm:gap-4">
                {[42, 58, 48, 72, 64, 88, 76, 94, 82, 100, 92, 108].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="group flex h-full flex-1 items-end"
                    >
                      <div
                        style={{ height: `${height}%` }}
                        className={`w-full rounded-t-lg transition ${
                          index === 11
                            ? "bg-slate-900"
                            : "bg-slate-100 group-hover:bg-slate-200"
                        }`}
                      />
                    </div>
                  )
                )}
              </div>

              <div className="mt-3 flex justify-between text-[10px] text-slate-400 sm:text-xs">
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
              </div>
            </div>
          </div>

          {/* Upcoming */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Upcoming Premiums
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Payments requiring attention
                </p>
              </div>

              <button className="text-xs font-semibold text-slate-700 hover:underline">
                View all
              </button>
            </div>

            <div className="mt-5 space-y-2">
              {upcomingPayments.map((payment) => (
                <div
                  key={payment.name}
                  className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      payment.urgent
                        ? "bg-red-50 text-red-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Clock3 size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {payment.name}
                    </p>

                    <p className="truncate text-xs text-slate-400">
                      {payment.policy}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">
                      {payment.amount}
                    </p>

                    <p
                      className={`text-[11px] font-medium ${
                        payment.urgent
                          ? "text-red-500"
                          : "text-slate-400"
                      }`}
                    >
                      {payment.due}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom section */}
        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.75fr]">
          {/* Recent policies */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Recent Policies
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Recently added policies
                </p>
              </div>

              <button className="text-xs font-semibold text-slate-700 hover:underline">
                View all
              </button>
            </div>

            {/* Mobile cards */}
            <div className="mt-5 space-y-3 lg:hidden">
              {recentPolicies.map((policy) => (
                <div
                  key={policy.id}
                  className="rounded-xl border border-slate-100 p-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {policy.customer}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {policy.id} · {policy.type}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                      {policy.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-bold text-slate-800">
                    {policy.premium}
                  </p>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="mt-5 hidden overflow-x-auto lg:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-400">
                    <th className="pb-3 font-medium">Policy</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Premium</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {recentPolicies.map((policy) => (
                    <tr
                      key={policy.id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-4 text-xs font-semibold text-slate-700">
                        {policy.id}
                      </td>

                      <td className="py-4 text-sm font-medium text-slate-800">
                        {policy.customer}
                      </td>

                      <td className="py-4 text-xs text-slate-500">
                        {policy.type}
                      </td>

                      <td className="py-4 text-sm font-semibold text-slate-800">
                        {policy.premium}
                      </td>

                      <td className="py-4">
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                          {policy.status}
                        </span>
                      </td>

                      <td className="py-4 text-right">
                        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                          <MoreHorizontal size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h3 className="font-semibold text-slate-900">
              Renewal Summary
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Current policy renewal status
            </p>

            <div className="mt-6 space-y-5">
              <SummaryRow
                icon={CheckCircle2}
                label="Paid / Renewed"
                value="82%"
                width="82%"
                iconClass="bg-emerald-50 text-emerald-600"
                barClass="bg-emerald-500"
              />

              <SummaryRow
                icon={Clock3}
                label="Due Soon"
                value="11%"
                width="11%"
                iconClass="bg-amber-50 text-amber-600"
                barClass="bg-amber-500"
              />

              <SummaryRow
                icon={AlertCircle}
                label="Overdue"
                value="7%"
                width="7%"
                iconClass="bg-red-50 text-red-600"
                barClass="bg-red-500"
              />
            </div>

            <div className="mt-7 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <CalendarDays size={18} className="text-slate-500" />

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Next important date
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    15 September 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  width,
  iconClass,
  barClass,
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon size={17} />
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <span className="text-xs font-medium text-slate-600">
              {label}
            </span>

            <span className="text-xs font-bold text-slate-800">
              {value}
            </span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              style={{ width }}
              className={`h-full rounded-full ${barClass}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}