import { Menu, Bell } from "lucide-react";

export default function MobileHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:hidden">
      <button
        onClick={onMenuClick}
        className="rounded-xl p-2 text-slate-700 hover:bg-slate-100"
      >
        <Menu size={22} />
      </button>

      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
          <span className="text-sm font-bold">P</span>
        </div>

        <span className="font-bold text-slate-900">PolicyDesk</span>
      </div>

      <button className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100">
        <Bell size={20} />

        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
      </button>
    </header>
  );
}