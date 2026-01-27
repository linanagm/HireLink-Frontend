import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../../../../hooks/useAuth";
import { useUploadAvatar } from "../../../../../hooks/useUploadAvatar";
import { queryKeys } from "../../../../../lib/queryKeys";
import {
	deleteTalentAvatar,
	uploadTalentAvatar,
} from "../../../../../services/talent.service";
import { buildAvatarUrl } from "../../../../../utils/Helpers/avatar";
import AvatarMenu from "./AvatarMenu";

function AvatarModal({ open, src, onClose }) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center">
			<button
				type="button"
				className="absolute inset-0 bg-black/50"
				onClick={onClose}
				aria-label="Close"
			/>
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

export default function ProfileHeaderCard({
	name,
	location,
	avatarPublicId,
	completion,
}) {
	const qc = useQueryClient();
	const { updateCurrentUser } = useAuth();

	const [menuOpen, setMenuOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const avatarUrl = useMemo(() => {
		return avatarPublicId ? buildAvatarUrl(avatarPublicId) : null;
	}, [avatarPublicId]);

	// ✅ Upload Hook (input controlled هنا فقط)
	const uploadAvatar = useUploadAvatar({
		uploadFn: uploadTalentAvatar,
		fieldName: "avatar",
		invalidateKeys: [
			queryKeys.currentUser,
			queryKeys.talentProfile,
			// queryKeys.talentAvatar(), // لو عندك فعلا
		],
		getPublicId: (res) =>
			res?.data?.talentProfile?.avatarPublicId ??
			res?.data?.avatarPublicId ??
			null,
	});

	// ✅ Delete mutation
	const deleteAvatar = useMutation({
		mutationFn: deleteTalentAvatar,
		onSuccess: async (res) => {
			if (res?.ok === false) throw new Error(res?.message || "Delete failed");

			// 1) Update Auth context immediately (Navbar reads this)
			updateCurrentUser((prev) => ({
				...prev,
				avatarUrl: null,

				// ✅ لو navbar بيستخدم publicId بدل url
				talentProfile: prev?.talentProfile
					? { ...prev.talentProfile, avatarPublicId: null }
					: prev?.talentProfile,
				employerProfile: prev?.employerProfile
					? { ...prev.employerProfile, logoPublicId: null }
					: prev?.employerProfile,
			}));

			// 2) Invalidate related queries
			await Promise.all([
				qc.invalidateQueries({ queryKey: queryKeys.currentUser }),
				qc.invalidateQueries({ queryKey: queryKeys.talentProfile }),
				qc.invalidateQueries({ queryKey: queryKeys.talentAvatar }),
			]);

			toast.success("Photo deleted");
		},
		onError: (e) => toast.error(e?.message || "Delete failed"),
	});

	// ✅ v4/v5 compatible busy flags
	const uploadBusy =
		uploadAvatar?.avatarMutation?.isPending ??
		uploadAvatar?.avatarMutation?.isLoading ??
		false;

	const deleteBusy =
		deleteAvatar?.isPending ?? deleteAvatar?.isLoading ?? false;

	const isBusy = uploadBusy || deleteBusy;

	const hasAvatar = !!avatarPublicId;

	// IMPORTANT: user activation safe
	const onUploadOrReplace = () => {
		if (isBusy) return;
		// open picker FIRST (direct click)
		uploadAvatar.onPickAvatar();
		// then close menu
		setMenuOpen(false);
	};

	const onSeePhoto = () => {
		if (!avatarUrl) return;
		setIsModalOpen(true);
		setMenuOpen(false);
	};

	const onDeletePhoto = () => {
		if (isBusy) return;
		setMenuOpen(false);

		const ok = window.confirm("Delete your profile photo?");
		if (!ok) return;

		deleteAvatar.mutate();
	};

	return (
		<section className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between">
			{/* ✅ THE ONLY file input */}
			<input
				ref={uploadAvatar.fileRef}
				type="file"
				accept="image/*"
				className="hidden"
				onChange={uploadAvatar.onAvatarChange}
			/>

			<AvatarModal
				open={isModalOpen}
				src={avatarUrl}
				onClose={() => setIsModalOpen(false)}
			/>

			<div className="flex items-center gap-4">
				<div className="relative">
					<button
						type="button"
						onClick={() => setMenuOpen((v) => !v)}
						className="w-20 h-20 rounded-full overflow-hidden border border-slate-200 bg-slate-50 shadow-md shadow-stone-300"
						title="Profile photo"
						disabled={isBusy}
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
						hasAvatar={hasAvatar}
						isBusy={isBusy}
						onPickFile={onUploadOrReplace} // open picker (no file param)
						onDelete={onDeletePhoto} // delete (confirm هنا فقط)
						onView={onSeePhoto} // open modal
					/>
				</div>

				<div>
					<div className="font-bold text-slate-900">{name || "Your name"}</div>
					<div className="text-sm text-slate-500">{location || "Location"}</div>

					{uploadAvatar.avatarError ? (
						<div className="text-xs text-red-600 mt-1">
							{uploadAvatar.avatarError}
						</div>
					) : null}
				</div>
			</div>

			<div className="text-sm font-semibold text-violet-700">
				Profile {completion ?? 0}% Complete
			</div>
		</section>
	);
}
