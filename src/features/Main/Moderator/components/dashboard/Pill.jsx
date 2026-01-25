import { cx } from "../../../../../utils/formatter";

export default function Pill({ children, tone = "gray" }) {
	const tones = {
		gray: "bg-gray-100 text-gray-700",
		green: "bg-green-100 text-green-700",
		red: "bg-red-100 text-red-700",
		purple: "bg-purple-100 text-purple-700",
		blue: "bg-blue-100 text-blue-700",
	};
	return (
		<span
			className={cx(
				"px-2 py-1 text-xs font-medium rounded-full",
				tones[tone] || tones.gray,
			)}
		>
			{children}
		</span>
	);
}
