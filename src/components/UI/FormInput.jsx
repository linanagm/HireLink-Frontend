

export default function FormInput({ label, name, type = "text", value, onChange, onBlur,  placeholder, required = false }) {


    return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-1 font-semibold">{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      />
    </div>
  );
}
