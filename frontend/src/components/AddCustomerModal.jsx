import { useState } from "react";
import { X, UserPlus, User, Phone, Mail, MapPin, FileText } from "lucide-react";

export default function AddCustomerModal({
  open,
  onClose,
  onAdd,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    policyName: "",
    policyNumber: "",
  });

  const [error, setError] = useState("");

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Customer name is required.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    if (!form.policyName.trim()) {
      setError("Policy name is required.");
      return;
    }

    if (!form.policyNumber.trim()) {
      setError("Policy number is required.");
      return;
    }

    const newCustomer = {
      id: `CUS-${Date.now()}`,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      city: form.city.trim(),

      // Policy information
      policyName: form.policyName.trim(),
      policyNumber: form.policyNumber.trim(),

      policies: 1,
      status: "Active",
    };

    onAdd(newCustomer);

    setForm({
      name: "",
      phone: "",
      email: "",
      city: "",
      policyName: "",
      policyNumber: "",
    });

    setError("");
    onClose();
  }

  function handleClose() {
    setForm({
      name: "",
      phone: "",
      email: "",
      city: "",
      policyName: "",
      policyNumber: "",
    });

    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">

      <div className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl">

        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <UserPlus size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Add Customer
              </h2>

              <p className="text-xs text-slate-400">
                Add customer and policy details
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto"
        >
          <div className="space-y-5 px-5 py-5">

            {/* CUSTOMER DETAILS */}
            <div>

              <div className="mb-3 flex items-center gap-2">
                <User size={16} className="text-slate-500" />

                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">
                  Customer Details
                </h3>
              </div>

              <div className="space-y-3">

                {/* NAME */}
                <InputField
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  required
                  icon={<User size={16} />}
                />

                {/* PHONE */}
                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  icon={<Phone size={16} />}
                />

                {/* EMAIL */}
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  icon={<Mail size={16} />}
                />

                {/* CITY */}
                <InputField
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  icon={<MapPin size={16} />}
                />

              </div>
            </div>

            {/* POLICY DETAILS */}
            <div>

              <div className="mb-3 flex items-center gap-2">
                <FileText size={16} className="text-slate-500" />

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">
                    Policy Details
                  </h3>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Add the customer's policy information
                  </p>
                </div>

              </div>

              <div className="space-y-3">

                {/* POLICY NAME */}
                <InputField
                  label="Policy Name"
                  name="policyName"
                  value={form.policyName}
                  onChange={handleChange}
                  placeholder="e.g. LIC Jeevan Anand"
                  required
                  icon={<FileText size={16} />}
                />

                {/* POLICY NUMBER */}
                <InputField
                  label="Policy Number"
                  name="policyNumber"
                  value={form.policyNumber}
                  onChange={handleChange}
                  placeholder="Enter policy number"
                  required
                  icon={<FileText size={16} />}
                />

              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2.5">
                <p className="text-xs font-medium text-red-600">
                  {error}
                </p>
              </div>
            )}

          </div>

          {/* FOOTER */}
          <div className="flex shrink-0 gap-3 border-t border-slate-100 bg-white px-5 py-4">

            <button
              type="button"
              onClick={handleClose}
              className="h-11 flex-1 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-11 flex-1 rounded-xl bg-slate-900 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
            >
              Add Customer
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}


/* INPUT FIELD */

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon,
}) {
  return (
    <div>

      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div className="relative">

        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
        />

      </div>

    </div>
  );
}