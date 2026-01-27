import { useRef } from "react";

function formatBytes(bytes = 0) {
	if (!bytes) return "";
	const units = ["B", "KB", "MB", "GB"];
	let i = 0;
	let n = bytes;
	while (n >= 1024 && i < units.length - 1) {
		n /= 1024;
		i++;
	}
	return `${n.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export default function ResumeCard({
	resumeUrl,
	resumeName,
	resumeSize,
	isUploading,
	onUpload,
	onDelete,
}) {
	const ref = useRef(null);

	const pick = () => ref.current?.click();

	return (
		<section className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-bold text-slate-900">Resume</h3>

				<input
					ref={ref}
					type="file"
					accept=".pdf,.doc,.docx"
					className="hidden"
					onChange={(e) => {
						const file = e.target.files?.[0];
						if (file) onUpload(file);
						e.target.value = "";
					}}
				/>
			</div>

			{!resumeUrl ? (
				<button
					type="button"
					onClick={pick}
					disabled={isUploading}
					className="mt-4 w-40 h-28 rounded-2xl border border-violet-200 bg-violet-50 hover:bg-violet-100 flex flex-col items-center justify-center gap-2 disabled:opacity-60"
				>
					<div className="w-10 h-10 rounded-xl bg-white border border-violet-200 flex items-center justify-center">
						<span className="text-violet-700 font-bold">📄</span>
					</div>
					<span className="text-sm font-semibold text-violet-800">
						{isUploading ? "Uploading..." : "Add Resume"}
					</span>
				</button>
			) : (
				<div className="mt-4 rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-4">
					<div className="flex items-center gap-3 min-w-0">
						<div className="w-10 h-10 rounded-xl bg-slate-50 border flex items-center justify-center">
							<span>📎</span>
						</div>
						<div className="min-w-0">
							<div className="font-semibold text-slate-900 truncate">
								{resumeName || "Resume file"}
							</div>
							<div className="text-xs text-slate-500">
								{resumeSize ? formatBytes(resumeSize) : "Ready to open"}
							</div>
						</div>
					</div>

					<div className="flex items-center gap-2 shrink-0">
						<a
							href={resumeUrl}
							target="_blank"
							rel="noreferrer"
							className="px-3 py-2 rounded-xl border hover:bg-slate-50 text-sm font-semibold"
						>
							Open
						</a>

						<button
							type="button"
							onClick={pick}
							disabled={isUploading}
							className="px-3 py-2 rounded-xl border hover:bg-slate-50 text-sm font-semibold disabled:opacity-60"
						>
							Replace
						</button>

						<button
							type="button"
							onClick={() => {
								const ok = window.confirm("Delete your resume?");
								if (ok) onDelete?.();
							}}
							className="px-3 py-2 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 text-sm font-semibold"
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</section>
	);
}
