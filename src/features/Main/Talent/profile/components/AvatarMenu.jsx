export default function AvatarMenu({
	isOpen,
	onClose,
	hasAvatar,
	onPickFile,
	onDelete,
	onView,
	isBusy,
}) {
	if (!isOpen) return null;

	return (
		<div className="absolute right-0 top-full mt-2 w-48 rounded-xl border bg-white shadow-lg z-50">
			<button
				type="button"
				className="w-full text-left px-4 py-3 hover:bg-slate-50 disabled:opacity-60"
				onClick={() => {
					onPickFile?.(); // ✅ picker opens in ProfileHeaderCard
					// onClose called هناك بعد فتح picker (user activation safe)
				}}
				disabled={isBusy}
			>
				{hasAvatar ? "Replace photo" : "Upload photo"}
			</button>

			{hasAvatar && (
				<>
					<button
						type="button"
						className="w-full text-left px-4 py-3 hover:bg-slate-50 disabled:opacity-60"
						onClick={() => {
							onView?.();
							onClose?.();
						}}
						disabled={isBusy}
					>
						View photo
					</button>

					<button
						type="button"
						className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 disabled:opacity-60"
						onClick={() => {
							onDelete?.(); // confirm is handled in ProfileHeaderCard only
							// onClose already in onDeletePhoto
						}}
						disabled={isBusy}
					>
						Delete photo
					</button>
				</>
			)}
		</div>
	);
}
