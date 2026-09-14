import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Users,
  Phone,
  Mail,
  ChevronRight,
  MoreVertical,
  UserRound,
} from "lucide-react";

export default function Customers({
  customers = [],
  onCustomer,
  onAdd,
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        customer.name?.toLowerCase().includes(searchText) ||
        customer.phone?.toLowerCase().includes(searchText) ||
        customer.email?.toLowerCase().includes(searchText) ||
        customer.city?.toLowerCase().includes(searchText) ||
        customer.id?.toLowerCase().includes(searchText);

      const matchesStatus =
        status === "All" || customer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, status]);

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Users size={20} />
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Customers
                </h1>

                <p className="text-xs text-slate-500 sm:text-sm">
                  Manage your customers and their policies
                </p>
              </div>
            </div>

            <button
              onClick={onAdd}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 sm:w-auto"
            >
              <Plus size={18} className="mr-2" />
              Add Customer
            </button>

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* STATS */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

          <StatCard
            title="Total Customers"
            value={totalCustomers}
            icon={<Users size={18} />}
          />

          <StatCard
            title="Active"
            value={activeCustomers}
            icon={<UserRound size={18} />}
          />

          <div className="col-span-2 sm:col-span-1">
            <StatCard
              title="Inactive"
              value={inactiveCustomers}
              icon={<UserRound size={18} />}
            />
          </div>

        </div>

        {/* SEARCH */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

          <div className="flex flex-col gap-3 sm:flex-row">

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customer, phone, email..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-slate-400 focus:bg-white"
              />
            </div>

            <div className="flex rounded-xl bg-slate-100 p-1">

              {["All", "Active", "Inactive"].map((item) => (
                <button
                  key={item}
                  onClick={() => setStatus(item)}
                  className={`flex-1 rounded-lg px-4 py-2 text-xs font-semibold sm:flex-none ${
                    status === item
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

        </div>

        {/* LIST TITLE */}
        <div className="mt-5">
          <h2 className="text-sm font-bold text-slate-900">
            Customer List
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            {filteredCustomers.length} customer
            {filteredCustomers.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* EMPTY */}
        {filteredCustomers.length === 0 && (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Users size={25} className="text-slate-400" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900">
              No customers found
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {search
                ? "Try searching with another name or phone number."
                : "Start by adding your first customer."}
            </p>

            {!search && (
              <button
                onClick={onAdd}
                className="mt-5 inline-flex items-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white"
              >
                <Plus size={16} className="mr-2" />
                Add Customer
              </button>
            )}

          </div>
        )}

        {/* MOBILE CARDS */}
        {filteredCustomers.length > 0 && (
          <div className="mt-4 space-y-3 md:hidden">

            {filteredCustomers.map((customer) => (
              <CustomerMobileCard
                key={customer.id}
                customer={customer}
                onClick={() => onCustomer(customer)}
              />
            ))}

          </div>
        )}

        {/* DESKTOP TABLE */}
        {filteredCustomers.length > 0 && (
          <div className="mt-4 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[760px]">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">

                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-500">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-500">
                      Contact
                    </th>

                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-500">
                      Policies
                    </th>

                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-right text-[11px] font-bold uppercase text-slate-500">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      onClick={() => onCustomer(customer)}
                      className="cursor-pointer border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <Avatar name={customer.name} />

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {customer.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              {customer.id}
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="px-5 py-4">

                        <p className="text-sm text-slate-700">
                          {customer.phone || "—"}
                        </p>

                        <p className="text-xs text-slate-400">
                          {customer.email || "No email"}
                        </p>

                      </td>

                      <td className="px-5 py-4">

                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold">
                          {customer.policies || 0}
                        </span>

                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={customer.status} />
                      </td>

                      <td className="px-5 py-4 text-right">

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCustomer(customer);
                          }}
                          className="inline-flex items-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold"
                        >
                          View
                          <ChevronRight size={15} className="ml-1" />
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}


/* STAT CARD */

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        {icon}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}


/* AVATAR */

function Avatar({ name = "" }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
      {initials || "U"}
    </div>
  );
}


/* STATUS */

function StatusBadge({ status }) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />

      {status || "Unknown"}
    </span>
  );
}


/* MOBILE CARD */

function CustomerMobileCard({ customer, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-sm active:scale-[0.99]"
    >

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <Avatar name={customer.name} />

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {customer.name}
            </h3>

            <p className="text-[11px] text-slate-400">
              {customer.id}
            </p>
          </div>

        </div>

        <MoreVertical
          size={17}
          className="text-slate-400"
        />

      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">

        <div className="rounded-xl bg-slate-50 p-3">

          <div className="flex items-center gap-2">
            <Phone size={14} className="text-slate-400" />

            <span className="text-[10px] font-semibold uppercase text-slate-400">
              Phone
            </span>
          </div>

          <p className="mt-1 truncate text-xs font-semibold text-slate-700">
            {customer.phone || "Not available"}
          </p>

        </div>

        <div className="rounded-xl bg-slate-50 p-3">

          <div className="flex items-center gap-2">
            <Mail size={14} className="text-slate-400" />

            <span className="text-[10px] font-semibold uppercase text-slate-400">
              Email
            </span>
          </div>

          <p className="mt-1 truncate text-xs font-semibold text-slate-700">
            {customer.email || "Not available"}
          </p>

        </div>

      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">

        <div>
          <p className="text-[10px] uppercase text-slate-400">
            Policies
          </p>

          <p className="text-sm font-bold text-slate-800">
            {customer.policies || 0}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={customer.status} />
          <ChevronRight size={17} className="text-slate-400" />
        </div>

      </div>

    </div>
  );
}