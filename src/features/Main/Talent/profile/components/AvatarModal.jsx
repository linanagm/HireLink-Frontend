export default function AvatarModal({ open, src, onClose }) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center">
			{/* overlay */}
			<button
				type="button"
				className="absolute inset-0 bg-black/50"
				onClick={onClose}
				aria-label="Close"
			/>

			{/* modal content */}
			<div className="relative z-10 bg-white rounded-2xl p-4 shadow-xl max-w-[520px] w-[92%]">
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-bold text-slate-900">Profile photo</h3>
					<button
						type="button"
						onClick={onClose}
						className="px-3 py-1 rounded-xl border hover:bg-slate-50 text-sm font-semibold"
					>
						Close
					</button>
				</div>

				<div className="rounded-2xl overflow-hidden border bg-slate-50">
					<img
						src={src}
						alt="Profile"
						className="w-full h-auto object-contain"
					/>
				</div>
			</div>
		</div>
	);
}
