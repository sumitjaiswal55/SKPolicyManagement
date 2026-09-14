import { useMemo, useState } from "react";
import { CreditCard, IndianRupee } from "lucide-react";
import { payments } from "../data/mockData";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";

export default function Payments({payments}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      payments.filter((p) =>
        `${p.customer} ${p.policy} ${p.method}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  const total = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="Payments"
          description="Track premium collections and payment history."
          action="Record Payment"
        />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          <SmallCard
            title="Total Collected"
            value={`₹${total.toLocaleString("en-IN")}`}
            icon={IndianRupee}
          />

          <SmallCard
            title="Transactions"
            value={payments.length}
            icon={CreditCard}
          />

          <div className="hidden lg:block">
            <SmallCard
              title="This Month"
              value="₹4.82L"
              icon={IndianRupee}
            />
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search customer or policy..."
          />
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden lg:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-xs text-slate-400">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Policy</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                      {payment.customer}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {payment.policy}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">
                      ₹{payment.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={payment.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-slate-100 lg:hidden">
            {filtered.map((payment) => (
              <div key={payment.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {payment.customer}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {payment.policy} · {payment.date}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-slate-800">
                    ₹{payment.amount.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {payment.method}
                  </span>
                  <StatusBadge status={payment.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function SmallCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">{title}</p>
          <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">
          <Icon size={18} className="text-slate-600" />
        </div>
      </div>
    </div>
  );
}