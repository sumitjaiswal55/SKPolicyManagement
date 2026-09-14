export default function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-600",
    Paid: "bg-emerald-50 text-emerald-600",
    Due: "bg-amber-50 text-amber-600",
    Pending: "bg-amber-50 text-amber-600",
    Overdue: "bg-red-50 text-red-600",
    Matured: "bg-slate-100 text-slate-600",
    Cancelled: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}