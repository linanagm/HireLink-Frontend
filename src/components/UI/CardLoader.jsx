export default function CardOverlay({
	loading,
	children,
	label = "Loading...",
	blur = "sm", // "sm" | "md"
	dimClassName = "opacity-60",
}) {
	const blurClass = blur === "md" ? "blur-md" : "blur-sm";

	return (
		<div className="relative">
			{/* content */}
			<div
				className={
					loading ? `${dimClassName} ${blurClass} pointer-events-none` : ""
				}
			>
				{children}
			</div>

			{/* overlay */}
			{loading && (
				<div className="absolute inset-0 flex items-center justify-center rounded-2xl">
					<div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-gray-200 shadow-sm">
						<i className="fa-solid fa-spinner animate-spin text-purple-600 text-sm" />
						<span className="text-xl font-medium text-green-600">{label}</span>
					</div>
				</div>
			)}
		</div>
	);
}
