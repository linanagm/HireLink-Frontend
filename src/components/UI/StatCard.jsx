/**
 * A component that displays a statistic with a label.
 * @param {string} value - The value of the statistic.
 * @param {string} label - The label of the statistic.
 * @returns {JSX.Element} - The JSX element for the stat card component.
 */
export default function StatCard({ value, label }) {
	return (
		<div className="text-center">
			<p className="text-xl font-bold text-slate-700">{value}</p>
			<p className="text-sm text-gray-600">{label}</p>
		</div>
	);
}
