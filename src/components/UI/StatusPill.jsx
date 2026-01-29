
const norm = (v) => String(v || "").toUpperCase();

export default function StatusPill({ status }) {
	const s = norm(status);
	let cls = "bg-gray-100 text-gray-700";
	if (s === "OPEN") cls = "bg-green-50 text-green-700";
	if (s === "CLOSED") cls = "bg-red-50 text-red-700";
	return (
		<span
			className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${cls}`}
		>
			{status || "—"}
		</span>
	);
}
