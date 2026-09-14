export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "bg-slate-100",
  iconColor = "text-slate-700",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}