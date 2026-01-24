import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { buildAvatarUrl, validateImageFile } from "../utils/Helpers/avatar";
import { useAuth } from "./useAuth";

/**
 * useUploadAvatar (safe version)
 * - No crashing on missing fields
 * - Updates currentUser.avatarUrl instantly after upload
 * - Works with normalized API responses { ok, data, message, status }
 */
export function useUploadAvatar({
	uploadFn,
	invalidateKeys = [], // ✅ array of queryKeys
	validationOptions = {
		allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
		maxSizeMB: 5,
	},

	getPublicId,
} = {}) {
	const qc = useQueryClient();
	const { updateCurrentUser } = useAuth();

	const fileRef = useRef(null);
	const [error, setError] = useState("");

	const mutation = useMutation({
		mutationFn: async (file) => {
			const formData = new FormData();
			formData.append("avatar", file);
			return uploadFn(formData);
		},

		onSuccess: async (res) => {
			// 1) If you're using normalized API, check ok first
			if (res && res.ok === false) {
				setError(res.message || "Failed to upload image");
				return;
			}

			// 2) Invalidate related queries (safe)
			await Promise.all(
				invalidateKeys.map((key) => qc.invalidateQueries({ queryKey: key })),
			);

			// 3) Extract publicId safely
			let publicId = null;

			if (typeof getPublicId === "function") {
				publicId = getPublicId(res);
			} else {
				publicId =
					res?.data?.talentProfile?.avatarPublicId ||
					res?.data?.employerProfile?.logoPublicId ||
					res?.data?.avatarPublicId ||
					null;
			}
			const avatarUrl = publicId
				? `${buildAvatarUrl(publicId)}?v=${Date.now()}`
				: null;

			if (avatarUrl) {
				updateCurrentUser((prev) => ({ ...prev, avatarUrl }));
			}
		},

		onError: (err) => {
			setError(err?.message || "Failed to upload image");
		},
	});

	const onPickAvatar = useCallback(() => {
		setError("");
		fileRef.current?.click();
	}, []);

	const onAvatarChange = useCallback(
		async (e) => {
			const file = e.target.files?.[0];
			e.target.value = "";
			if (!file) return;

			setError("");

			const validation = validateImageFile(file, validationOptions);
			if (!validation.ok) {
				setError(validation.message);
				return;
			}

			await mutation.mutateAsync(file);
		},
		[mutation, validationOptions],
	);

	return {
		fileRef,
		onPickAvatar,
		onAvatarChange,

		avatarError: error,
		setAvatarError: setError,

		avatarMutation: mutation,
	};
}
