export default function InfoItem({ value, label }) {
	if (!value) value = "Not specified";
	return (
		<div className="text-center border border-gray-200  border-l-0 border-b-0 border-t-0">
			<p className=" text-l">{value}</p>
			<p className="text-gray-500 text-sm text-thin">{label}</p>
		</div>
	);
}
