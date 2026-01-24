/**
 * Field component that renders a text field with a label, value, onChange handler, and placeholder prop.
 * @param {string} label - The label of the field.
 * @param {string} value - The value of the field.
 * @param {function} onChange - The function to call when the value of the field changes.
 * @param {string} placeholder - The placeholder text to display when the field is empty.
 */
export default function Field({ label, value, onChange, placeholder }) {
	return (
		<div>
			<p className="text-sm font-semibold text-gray-900">{label}</p>
			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="mt-2 w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-purple-200"
				placeholder={placeholder}
			/>
		</div>
	);
}
