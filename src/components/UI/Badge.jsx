export default function Badge({ children, tone = "gray" }) {
	const tones = {
		gray: "bg-gray-100 text-gray-700 border-gray-200",
		green: "bg-green-50 text-green-700 border-green-200",
		yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
	};
	return (
		<span
			className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border ${tones[tone]}`}
		>
			{children}
		</span>
	);
}
