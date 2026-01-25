export default function Modal({
	open,
	onClose,
	title,
	children,
	widthClass = "max-w-4xl",
}) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-[999]">
			<div className="absolute inset-0 bg-black/40" />
			<button
				type="button"
				className="absolute inset-0"
				onClick={onClose}
			></button>
			<div className="absolute inset-0 flex items-center justify-center p-4">
				<div
					className={`w-full ${widthClass} bg-white rounded-2xl shadow-xl border`}
				>
					<div className="p-4 border-b flex items-center justify-between">
						<h3 className="font-semibold text-gray-900">{title}</h3>
						<button
							type="button"
							onClick={onClose}
							className="text-gray-500 hover:text-gray-900"
						>
							✕
						</button>
					</div>
					<div className="p-4">{children}</div>
				</div>
			</div>
		</div>
	);
}
