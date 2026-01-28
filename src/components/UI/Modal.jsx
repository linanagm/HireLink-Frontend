// export default function Modal({
// 	open,
// 	onClose,
// 	title,
// 	children,
// 	widthClass = "max-w-4xl",
// }) {
// 	if (!open) return null;

// 	return (
// 		<div className="fixed inset-0 z-[999]">
// 			<div className="absolute inset-0 bg-black/40" />
// 			<button
// 				type="button"
// 				className="absolute inset-0"
// 				onClick={onClose}
// 			></button>
// 			<div className="absolute inset-0 flex items-center justify-center p-4">
// 				<div
// 					className={`w-full ${widthClass} bg-white rounded-2xl shadow-xl border`}
// 				>
// 					<div className="p-4 border-b flex items-center justify-between">
// 						<h3 className="font-semibold text-gray-900">{title}</h3>
// 						<button
// 							type="button"
// 							onClick={onClose}
// 							className="text-gray-500 hover:text-gray-900"
// 						>
// 							✕
// 						</button>
// 					</div>
// 					<div className="p-4">{children}</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

export default function Modal({
	open,
	onClose,
	title,
	children,
	footer = null,
	widthClass = "max-w-2xl",
	zIndexClass = "z-[9999]",
	closeText = "Close",
	showHeaderClose = true, //  ✕ button
	showFooterClose = false, // Close button
}) {
	if (!open) return null;

	return (
		<div
			className={`fixed inset-0 ${zIndexClass} flex items-center justify-center p-4`}
		>
			{/* overlay */}
			<button
				type="button"
				className="absolute inset-0 bg-black/50"
				onClick={onClose}
				aria-label="Close"
			/>

			{/* dialog */}
			<div
				className={`relative z-10 w-full ${widthClass} bg-white rounded-2xl shadow-xl border`}
			>
				{/* header */}
				<div className="p-5 border-b flex items-center justify-between">
					<h3 className="font-bold text-slate-900">{title}</h3>

					{showHeaderClose ? (
						<button
							type="button"
							onClick={onClose}
							className="text-slate-500 hover:text-slate-900 text-lg leading-none"
							aria-label="Close"
						>
							✕
						</button>
					) : null}
				</div>

				{/* body */}
				<div className="p-5">{children}</div>

				{/* footer */}
				{footer || showFooterClose ? (
					<div className="p-5 border-t flex items-center justify-end gap-3">
						{showFooterClose ? (
							<button
								type="button"
								className="px-4 py-2 rounded-xl border hover:bg-slate-50 text-sm font-semibold"
								onClick={onClose}
							>
								{closeText}
							</button>
						) : null}

						{footer}
					</div>
				) : null}
			</div>
		</div>
	);
}
