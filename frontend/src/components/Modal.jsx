import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[calc(92vh-70px)] overflow-y-auto p-5 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}