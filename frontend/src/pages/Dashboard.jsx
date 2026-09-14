import {
  Users,
  FileText,
  CreditCard,
  RefreshCw,
  Plus,
  ArrowUpRight,
  ArrowRight,
  CalendarDays,
  IndianRupee,
  UserPlus,
} from "lucide-react";

export default function Dashboard({
  customers = [],
  policies = [],
  payments = [],
  onAddCustomer,
  onCustomer,
  onPolicy,
  onNavigate,
}) {
  /* --------------------------------
     BASIC STATS
  -------------------------------- */

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) =>
      !customer.status || customer.status === "Active"
  ).length;

  const totalPolicies = policies.length;

  const activePolicies = policies.filter(
    (policy) =>
      !policy.status || policy.status === "Active"
  ).length;

  /* --------------------------------
     PREMIUM / PAYMENT
  -------------------------------- */

  const totalPremium = policies.reduce(
    (total, policy) =>
      total + Number(
        policy.premiumAmount ||
        policy.premium ||
        policy.amount ||
        0
      ),
    0
  );

  const totalPayments = payments.reduce(
    (total, payment) =>
      total + Number(
        payment.amount ||
        payment.premiumAmount ||
        0
      ),
    0
  );

  /* --------------------------------
     UPCOMING RENEWALS
  -------------------------------- */

  const today = new Date();

  const upcomingRenewals = policies
    .filter((policy) => policy.nextPremiumDate)
    .map((policy) => {
      const date = new Date(policy.nextPremiumDate);

      const diff =
        Math.ceil(
          (date - today) /
            (1000 * 60 * 60 * 24)
        );

      return {
        ...policy,
        daysLeft: diff,
        renewalDate: date,
      };
    })
    .filter(
      (policy) =>
        policy.daysLeft >= 0 &&
        policy.daysLeft <= 30
    )
    .sort(
      (a, b) =>
        a.renewalDate - b.renewalDate
    )
    .slice(0, 5);

  /* --------------------------------
     RECENT CUSTOMERS
  -------------------------------- */

  const recentCustomers = customers
    .slice()
    .reverse()
    .slice(0, 5);

  /* --------------------------------
     FORMAT MONEY
  -------------------------------- */

  function formatMoney(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  /* --------------------------------
     FORMAT DATE
  -------------------------------- */

  function formatDate(date) {
    if (!date) return "—";

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
      return "—";
    }

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  /* --------------------------------
     DAYS TEXT
  -------------------------------- */

  function getDaysText(days) {
    if (days === 0) {
      return "Due today";
    }

    if (days === 1) {
      return "Tomorrow";
    }

    return `${days} days`;
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =================================
          HEADER
      ================================= */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Overview
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your customers, policies and renewals.
              </p>
            </div>

            {/* ADD CUSTOMER */}
            <button
              onClick={onAddCustomer}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98] sm:w-auto"
            >
              <Plus size={18} className="mr-2" />
              Add Customer
            </button>

          </div>

        </div>
      </div>


      {/* =================================
          MAIN CONTENT
      ================================= */}

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* =================================
            STAT CARDS
        ================================= */}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

          <StatCard
            title="Total Customers"
            value={totalCustomers}
            subtitle={`${activeCustomers} active`}
            icon={<Users size={19} />}
            onClick={() => onNavigate?.("customers")}
          />

          <StatCard
            title="Total Policies"
            value={totalPolicies}
            subtitle={`${activePolicies} active`}
            icon={<FileText size={19} />}
            onClick={() => onNavigate?.("policies")}
          />

          <StatCard
            title="Premium Value"
            value={formatMoney(totalPremium)}
            subtitle="Total policy premium"
            icon={<IndianRupee size={19} />}
            onClick={() => onNavigate?.("policies")}
          />

          <StatCard
            title="Payments"
            value={formatMoney(totalPayments)}
            subtitle={`${payments.length} recorded`}
            icon={<CreditCard size={19} />}
            onClick={() => onNavigate?.("payments")}
          />

        </div>


        {/* =================================
            QUICK ACTIONS
        ================================= */}

        <div className="mt-5">

          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Quick Actions
              </h2>

              <p className="text-xs text-slate-500">
                Frequently used actions
              </p>
            </div>
          </div>


          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

            <QuickAction
              icon={<UserPlus size={18} />}
              title="Add Customer"
              subtitle="Create customer"
              onClick={onAddCustomer}
            />

            <QuickAction
              icon={<Users size={18} />}
              title="Customers"
              subtitle="View customers"
              onClick={() => onNavigate?.("customers")}
            />

            <QuickAction
              icon={<FileText size={18} />}
              title="Policies"
              subtitle="View policies"
              onClick={() => onNavigate?.("policies")}
            />

            <QuickAction
              icon={<RefreshCw size={18} />}
              title="Renewals"
              subtitle="Upcoming renewals"
              onClick={() => onNavigate?.("renewals")}
            />

          </div>

        </div>


        {/* =================================
            TWO COLUMN SECTION
        ================================= */}

        <div className="mt-5 grid gap-5 lg:grid-cols-2">


          {/* =================================
              UPCOMING RENEWALS
          ================================= */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Upcoming Renewals
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Next 30 days
                </p>
              </div>

              <button
                onClick={() => onNavigate?.("renewals")}
                className="flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                View all
                <ArrowRight
                  size={14}
                  className="ml-1"
                />
              </button>

            </div>


            {upcomingRenewals.length === 0 ? (

              <EmptyState
                icon={<CalendarDays size={22} />}
                title="No upcoming renewals"
                text="There are no renewals scheduled in the next 30 days."
              />

            ) : (

              <div className="divide-y divide-slate-100">

                {upcomingRenewals.map((policy) => (

                  <button
                    key={policy.id}
                    onClick={() => onPolicy?.(policy)}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-slate-50"
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <RefreshCw size={17} />
                    </div>


                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-semibold text-slate-900">
                        {policy.policyName ||
                          policy.name ||
                          "Policy"}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {policy.customerName ||
                          "Customer"}
                      </p>

                    </div>


                    <div className="text-right">

                      <p
                        className={`text-xs font-bold ${
                          policy.daysLeft <= 3
                            ? "text-red-600"
                            : policy.daysLeft <= 7
                            ? "text-amber-600"
                            : "text-slate-700"
                        }`}
                      >
                        {getDaysText(
                          policy.daysLeft
                        )}
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {formatDate(
                          policy.nextPremiumDate
                        )}
                      </p>

                    </div>

                    <Chevron />

                  </button>

                ))}

              </div>

            )}

          </section>


          {/* =================================
              RECENT CUSTOMERS
          ================================= */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Recent Customers
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Recently added customers
                </p>
              </div>

              <button
                onClick={() => onNavigate?.("customers")}
                className="flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                View all
                <ArrowRight
                  size={14}
                  className="ml-1"
                />
              </button>

            </div>


            {recentCustomers.length === 0 ? (

              <EmptyState
                icon={<Users size={22} />}
                title="No customers yet"
                text="Add your first customer to get started."
                action={
                  <button
                    onClick={onAddCustomer}
                    className="mt-3 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
                  >
                    Add Customer
                  </button>
                }
              />

            ) : (

              <div className="divide-y divide-slate-100">

                {recentCustomers.map((customer) => (

                  <button
                    key={customer.id}
                    onClick={() =>
                      onCustomer?.(customer)
                    }
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-slate-50"
                  >

                    <Avatar
                      name={customer.name}
                    />

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-semibold text-slate-900">
                        {customer.name}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {customer.phone ||
                          "No phone number"}
                      </p>

                    </div>


                    <div className="text-right">

                      <p className="text-xs font-semibold text-slate-700">
                        {customer.policies || 0}{" "}
                        {customer.policies === 1
                          ? "Policy"
                          : "Policies"}
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {customer.city || ""}
                      </p>

                    </div>

                    <Chevron />

                  </button>

                ))}

              </div>

            )}

          </section>

        </div>


        {/* =================================
            BOTTOM SUMMARY
        ================================= */}

        <div className="mt-5 grid gap-3 sm:grid-cols-3">

          <SummaryCard
            icon={<FileText size={18} />}
            title="Active Policies"
            value={activePolicies}
            onClick={() => onNavigate?.("policies")}
          />

          <SummaryCard
            icon={<RefreshCw size={18} />}
            title="Renewals Due"
            value={upcomingRenewals.length}
            onClick={() => onNavigate?.("renewals")}
          />

          <SummaryCard
            icon={<CreditCard size={18} />}
            title="Recorded Payments"
            value={payments.length}
            onClick={() => onNavigate?.("payments")}
          />

        </div>

      </div>

    </main>
  );
}


/* =================================
   STAT CARD
================================= */

function StatCard({
  title,
  value,
  subtitle,
  icon,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          {icon}
        </div>

        <ArrowUpRight
          size={16}
          className="text-slate-300 transition group-hover:text-slate-600"
        />

      </div>

      <p className="mt-4 text-xs font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 truncate text-[10px] text-slate-400">
        {subtitle}
      </p>

    </button>
  );
}


/* =================================
   QUICK ACTION
================================= */

function QuickAction({
  icon,
  title,
  subtitle,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md active:scale-[0.98]"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="truncate text-xs font-bold text-slate-900">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[10px] text-slate-400">
          {subtitle}
        </p>

      </div>

    </button>
  );
}


/* =================================
   SUMMARY CARD
================================= */

function SummaryCard({
  icon,
  title,
  value,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:shadow-md"
    >

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        {icon}
      </div>

      <div>

        <p className="text-[11px] text-slate-500">
          {title}
        </p>

        <p className="mt-0.5 text-lg font-bold text-slate-900">
          {value}
        </p>

      </div>

    </button>
  );
}


/* =================================
   AVATAR
================================= */

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


/* =================================
   EMPTY STATE
================================= */

function EmptyState({
  icon,
  title,
  text,
  action,
}) {
  return (
    <div className="px-5 py-10 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        {icon}
      </div>

      <h3 className="mt-3 text-sm font-bold text-slate-900">
        {title}
      </h3>

      <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-400">
        {text}
      </p>

      {action}

    </div>
  );
}


/* =================================
   CHEVRON
================================= */

function Chevron() {
  return (
    <ArrowRight
      size={15}
      className="shrink-0 text-slate-300"
    />
  );
}