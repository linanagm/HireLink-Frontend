export default function StatCard({ label, value }) {
	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
			<p className="text-sm text-gray-600">{label}</p>
			<p className="mt-2 text-2xl font-bold text-gray-900">{value ?? "-"}</p>
		</div>
	);
}
