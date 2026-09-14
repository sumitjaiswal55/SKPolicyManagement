import { useState } from "react";
import Modal from "./Modal";
import { FormInput, FormSelect } from "./FormInput";

export default function RecordPaymentModal({
  open,
  onClose,
  onAdd,
  policies,
}) {
  const [form, setForm] = useState({
    policyId: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    method: "UPI",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    const updated = {
      ...form,
      [name]: value,
    };

    if (name === "policyId") {
      const policy = policies.find((p) => p.id === value);

      if (policy) {
        updated.amount = policy.premium;
      }
    }

    setForm(updated);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.policyId || !form.amount) return;

    const policy = policies.find(
      (p) => p.id === form.policyId
    );

    const payment = {
      id: `PAY-${Date.now().toString().slice(-5)}`,
      date: form.date,
      customer: policy?.customer || "Unknown",
      policy: form.policyId,
      amount: Number(form.amount),
      method: form.method,
      status: "Paid",
    };

    onAdd(payment);

    setForm({
      policyId: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      method: "UPI",
    });

    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Record Payment"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormSelect
          label="Policy"
          name="policyId"
          value={form.policyId}
          onChange={handleChange}
          required
          options={[
            {
              value: "",
              label: "Select Policy",
            },
            ...policies.map((policy) => ({
              value: policy.id,
              label: `${policy.id} — ${policy.customer}`,
            })),
          ]}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput
            label="Amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            type="number"
            placeholder="2500"
            required
          />

          <FormInput
            label="Payment Date"
            name="date"
            value={form.date}
            onChange={handleChange}
            type="date"
            required
          />

          <FormSelect
            label="Payment Method"
            name="method"
            value={form.method}
            onChange={handleChange}
            options={[
              { value: "UPI", label: "UPI" },
              { value: "Cash", label: "Cash" },
              { value: "Bank", label: "Bank Transfer" },
              { value: "Cheque", label: "Cheque" },
            ]}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
          >
            Save Payment
          </button>
        </div>
      </form>
    </Modal>
  );
}