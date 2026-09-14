import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  Clock3,
  MessageCircle,
} from "lucide-react";
import { policies } from "../data/mockData";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

const renewals = [
  {
    ...policies[1],
    dueLabel: "Today",
    priority: "Overdue",
  },
  {
    ...policies[2],
    dueLabel: "8 days",
    priority: "Due Soon",
  },
  {
    ...policies[0],
    dueLabel: "29 days",
    priority: "Upcoming",
  },
  {
    ...policies[3],
    dueLabel: "25 days",
    priority: "Upcoming",
  },
];

export default function Renewals() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1300px] p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="Renewals"
          description="Stay on top of upcoming and overdue premium payments."
        />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Summary
            icon={AlertCircle}
            title="Overdue"
            value="4"
            className="text-red-600"
          />

          <Summary
            icon={Clock3}
            title="Due Today"
            value="2"
            className="text-amber-600"
          />

          <Summary
            icon={CalendarClock}
            title="Next 7 Days"
            value="6"
            className="text-blue-600"
          />

          <Summary
            icon={CheckCircle2}
            title="Renewed"
            value="82%"
            className="text-emerald-600"
          />
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-semibold text-slate-900">
              Premium Follow-ups
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Customers that require attention
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {renewals.map((item) => (
              <div key={item.id} className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                    <Clock3 size={19} className="text-slate-500" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-800">
                        {item.customer}
                      </p>

                      <StatusBadge
                        status={
                          item.priority === "Overdue"
                            ? "Overdue"
                            : item.priority === "Due Soon"
                            ? "Due"
                            : "Active"
                        }
                      />
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.id} · {item.plan}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      ₹{item.premium.toLocaleString("en-IN")}
                    </p>

                    <p
                      className={`mt-1 text-xs font-semibold ${
                        item.priority === "Overdue"
                          ? "text-red-500"
                          : "text-slate-400"
                      }`}
                    >
                      {item.dueLabel}
                    </p>
                  </div>

                  <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                    <MessageCircle size={15} />
                    Remind
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function Summary({ icon: Icon, title, value, className }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <Icon size={19} className={className} />
      <p className="mt-4 text-xs text-slate-400">{title}</p>
      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}