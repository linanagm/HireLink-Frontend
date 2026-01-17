export default function InfoItem({ value, label }) {
	if (!value) value = "Not specified";
	return (
		<div className="text-center">
			<p className="font-semibold">{value}</p>
			<p className="text-gray-500 text-sm">{label}</p>
		</div>
	);
}
