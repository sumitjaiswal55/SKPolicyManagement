import { useState } from "react";
import Modal from "./Modal";
import { FormInput, FormSelect } from "./FormInput";

function calculateNextDate(startDate, frequency) {
  if (!startDate) return "";

  const date = new Date(startDate);

  if (frequency === "Monthly") {
    date.setMonth(date.getMonth() + 1);
  }

  if (frequency === "Quarterly") {
    date.setMonth(date.getMonth() + 3);
  }

  if (frequency === "Half-yearly") {
    date.setMonth(date.getMonth() + 6);
  }

  if (frequency === "Yearly") {
    date.setFullYear(date.getFullYear() + 1);
  }

  return date.toISOString().split("T")[0];
}

const initialForm = {
  customerId: "",
  company: "",
  plan: "",
  type: "Life Insurance",
  premium: "",
  frequency: "Monthly",
  startDate: "",
  nextDue: "",
  maturity: "",
  sumAssured: "",
};

export default function AddPolicyModal({
  open,
  onClose,
  onAdd,
  customers,
}) {
  const [form, setForm] = useState(initialForm);

  function handleChange(e) {
    const { name, value } = e.target;

    const updated = {
      ...form,
      [name]: value,
    };

    if (name === "startDate" || name === "frequency") {
      updated.nextDue = calculateNextDate(
        name === "startDate" ? value : form.startDate,
        name === "frequency" ? value : form.frequency
      );
    }

    setForm(updated);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.customerId ||
      !form.company ||
      !form.plan ||
      !form.premium ||
      !form.startDate
    ) {
      return;
    }

    const customer = customers.find(
      (item) => item.id === form.customerId
    );

    const policy = {
      id: `POL-${Date.now().toString().slice(-5)}`,
      customerId: form.customerId,
      customer: customer?.name || "Unknown",
      company: form.company,
      plan: form.plan,
      type: form.type,
      premium: Number(form.premium),
      frequency: form.frequency,
      startDate: form.startDate,
      nextDue: form.nextDue,
      maturity: form.maturity || "-",
      sumAssured: Number(form.sumAssured || 0),
      status: "Active",
    };

    onAdd(policy);

    setForm(initialForm);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Policy"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormSelect
            label="Customer"
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            required
            options={[
              {
                value: "",
                label: "Select Customer",
              },
              ...customers.map((customer) => ({
                value: customer.id,
                label: customer.name,
              })),
            ]}
          />

          <FormInput
            label="Insurance Company"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="ABC Life Insurance"
            required
          />

          <FormInput
            label="Plan Name"
            name="plan"
            value={form.plan}
            onChange={handleChange}
            placeholder="Secure Life Plus"
            required
          />

          <FormSelect
            label="Policy Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={[
              {
                value: "Life Insurance",
                label: "Life Insurance",
              },
              {
                value: "Health Insurance",
                label: "Health Insurance",
              },
              {
                value: "Term Insurance",
                label: "Term Insurance",
              },
              {
                value: "Motor Insurance",
                label: "Motor Insurance",
              },
              {
                value: "Other",
                label: "Other",
              },
            ]}
          />

          <FormInput
            label="Premium Amount"
            name="premium"
            value={form.premium}
            onChange={handleChange}
            placeholder="2500"
            type="number"
            required
          />

          <FormSelect
            label="Payment Frequency"
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            options={[
              { value: "Monthly", label: "Monthly" },
              { value: "Quarterly", label: "Quarterly" },
              { value: "Half-yearly", label: "Half-yearly" },
              { value: "Yearly", label: "Yearly" },
            ]}
          />

          <FormInput
            label="Start Date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            type="date"
            required
          />

          <FormInput
            label="Next Premium Date"
            name="nextDue"
            value={form.nextDue}
            onChange={handleChange}
            type="date"
          />

          <FormInput
            label="Maturity Date"
            name="maturity"
            value={form.maturity}
            onChange={handleChange}
            type="date"
          />

          <FormInput
            label="Sum Assured"
            name="sumAssured"
            value={form.sumAssured}
            onChange={handleChange}
            placeholder="2500000"
            type="number"
          />
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500">
            Next premium will be calculated automatically based on frequency.
          </p>

          {form.nextDue && (
            <p className="mt-2 text-sm font-bold text-slate-800">
              Next Due: {form.nextDue}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Save Policy
          </button>
        </div>
      </form>
    </Modal>
  );
}