import { useState } from "react";
import AvatarMenu from "./AvatarMenu";

export default function ProfileHeaderCard({
	name,
	location,
	avatarUrl,
	completion,
	onUploadAvatar,
	onDeleteAvatar,
	isAvatarBusy,
}) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<section className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between">
			<div className="flex items-center gap-4">
				<div className="relative">
					<button
						type="button"
						onClick={() => setMenuOpen((v) => !v)}
						className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 bg-slate-50"
						title="Profile photo"
					>
						{avatarUrl ? (
							<img
								src={avatarUrl}
								alt="avatar"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center text-slate-400">
								<span className="text-xl">👤</span>
							</div>
						)}
					</button>

					<AvatarMenu
						isOpen={menuOpen}
						onClose={() => setMenuOpen(false)}
						hasAvatar={!!avatarUrl}
						isBusy={isAvatarBusy}
						onPickFile={onUploadAvatar}
						onDelete={onDeleteAvatar}
						onView={() => avatarUrl && window.open(avatarUrl, "_blank")}
					/>
				</div>

				<div>
					<div className="font-bold text-slate-900">{name || "Your name"}</div>
					<div className="text-sm text-slate-500">{location || "Location"}</div>
				</div>
			</div>

			<div className="text-sm font-semibold text-violet-700">
				Profile {completion}% Complete
			</div>
		</section>
	);
}
