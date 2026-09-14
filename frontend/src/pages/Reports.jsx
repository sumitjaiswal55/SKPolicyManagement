import {
  ArrowUpRight,
  FileDown,
  IndianRupee,
  TrendingUp,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

const months = [
  ["Apr", 42],
  ["May", 58],
  ["Jun", 48],
  ["Jul", 72],
  ["Aug", 82],
  ["Sep", 100],
];

export default function Reports() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="Reports"
          description="Understand your business performance and collections."
          action={
            <>
              <FileDown size={16} className="mr-2 inline" />
              Export Report
            </>
          }
        />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Card title="Total Business" value="₹4.82L" icon={IndianRupee} />
          <Card title="New Policies" value="24" icon={TrendingUp} />
          <Card title="Renewals" value="61" icon={ArrowUpRight} />
          <Card title="Pending" value="₹42.5K" icon={IndianRupee} />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold text-slate-900">
              Monthly Premium Collection
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Collection trend
            </p>

            <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
              {months.map(([month, value]) => (
                <div
                  key={month}
                  className="flex h-full flex-1 flex-col justify-end"
                >
                  <div
                    className={`rounded-t-lg ${
                      month === "Sep" ? "bg-slate-900" : "bg-slate-100"
                    }`}
                    style={{ height: `${value}%` }}
                  />

                  <p className="mt-2 text-center text-[10px] text-slate-400">
                    {month}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold text-slate-900">
              Policy Distribution
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Current portfolio
            </p>

            <div className="mt-7 space-y-5">
              <Distribution
                label="Life Insurance"
                value="52%"
                width="52%"
              />

              <Distribution
                label="Health Insurance"
                value="28%"
                width="28%"
              />

              <Distribution
                label="Term Insurance"
                value="15%"
                width="15%"
              />

              <Distribution
                label="Other"
                value="5%"
                width="5%"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Card({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <Icon size={19} className="text-slate-500" />
      <p className="mt-4 text-xs text-slate-400">{title}</p>
      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Distribution({ label, value, width }) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-bold text-slate-800">{value}</span>
      </div>

      <div className="mt-2 h-2 rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-slate-900"
          style={{ width }}
        />
      </div>
    </div>
  );
}