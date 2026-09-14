import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  RefreshCw,
  BarChart3,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "customers", label: "Customers", icon: Users },
  { id: "policies", label: "Policies", icon: FileText },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "renewals", label: "Renewals", icon: RefreshCw },
  { id: "reports", label: "Reports", icon: BarChart3 },
];

export default function Sidebar({
  open,
  onClose,
  onNavigate,
  currentPage,
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <FileText size={20} />
            </div>

            <div>
              <h1 className="text-[17px] font-bold text-slate-900">
                PolicyDesk
              </h1>
              <p className="text-[11px] text-slate-400">
                Policy Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 px-3 py-5">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active =
                currentPage === item.id ||
                (item.id === "customers" &&
                  currentPage === "customer-details") ||
                (item.id === "policies" &&
                  currentPage === "policy-details");

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-100 p-3">
          <button
            onClick={() => onNavigate("settings")}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
              currentPage === "settings"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Settings size={18} />
            Settings
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 hover:bg-red-50">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}