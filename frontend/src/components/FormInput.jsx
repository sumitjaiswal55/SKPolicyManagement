export function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
      />
    </label>
  );
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </span>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
      />
    </label>
  );
}