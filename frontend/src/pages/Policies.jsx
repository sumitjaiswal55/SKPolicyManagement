import { useMemo, useState } from "react";
import { Eye, Plus } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";

export default function Policies({ policies, onPolicy, onAdd }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return policies.filter((policy) => {
      const matchesSearch =
        `${policy.id} ${policy.customer} ${policy.company} ${policy.plan}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Active" && policy.status === "Active") ||
        (filter === "Due Soon" && policy.status === "Due");

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
        <PageHeader
  title="Policies"
  description="Track and manage all insurance policies."
  action={
    <>
      <Plus size={17} className="mr-2 inline" />
      Add Policy
    </>
  }
  onAction={onAdd}
/>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search policy, customer or plan..."
          />

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {["All", "Active", "Due Soon"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold ${
                  filter === item
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-xs text-slate-400">
                  <th className="px-6 py-4">Policy</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Premium</th>
                  <th className="px-6 py-4">Next Due</th>
                  <th className="px-6 py-4">Status</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {filtered.map((policy) => (
                  <tr
                    key={policy.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {policy.id}
                      </p>
                      <p className="text-xs text-slate-400">
                        {policy.plan}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      {policy.customer}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {policy.type}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold">
                      ₹{policy.premium.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {policy.nextDue}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={policy.status} />
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => onPolicy(policy)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-slate-100 lg:hidden">
            {filtered.map((policy) => (
              <button
                key={policy.id}
                onClick={() => onPolicy(policy)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
                  P
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {policy.customer}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-400">
                        {policy.id} · {policy.plan}
                      </p>
                    </div>

                    <StatusBadge status={policy.status} />
                  </div>

                  <div className="mt-2 flex justify-between">
                    <span className="text-xs text-slate-400">
                      Due {policy.nextDue}
                    </span>
                    <span className="text-sm font-bold text-slate-700">
                      ₹{policy.premium.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}