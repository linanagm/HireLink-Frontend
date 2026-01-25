export default function Modal({ open, title, children, onClose, footer }) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50">
			<button
				type="button"
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
			/>
			<div className="absolute inset-0 flex items-center justify-center p-4">
				<div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl border border-gray-200">
					<div className="flex items-center justify-between px-5 py-4 border-b">
						<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
						<button
							type="button"
							onClick={onClose}
							className="w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600"
							aria-label="Close modal"
						>
							✕
						</button>
					</div>

					<div className="px-5 py-4">{children}</div>

					{footer ? (
						<div className="px-5 py-4 border-t bg-gray-50 rounded-b-2xl">
							{footer}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
