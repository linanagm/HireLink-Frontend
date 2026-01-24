import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { validateImageFile } from "../utils/Helpers/avatar";
import { useAuth } from "./useAuth";

/**
 * useUploadAvatar
 * ----------------
 * A reusable hook to upload a profile image (avatar or logo).
 * It handles:
 * - opening the file picker
 * - validating the image
 * - uploading the image
 * - showing loading & error states
 * - refreshing data after upload
 */
export function useUploadAvatar({
	// Function that sends the image to the backend
	uploadFn,
	invalidateKeys,
	// Image validation rules
	validationOptions = {
		allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
		maxSizeMB: 5,
	},
} = {}) {
	/**
	 * React Query client
	 * Used to refresh (invalidate) cached data after upload
	 */
	const qc = useQueryClient();
	//const invalidateKeys = ["currentUser"];
	/**
	 * Current user
	 * Used to refresh (invalidate) cached data after upload
	 */
	const { updateCurrentUser } = useAuth();

	/**
	 * Reference to the hidden <input type="file" />
	 * We click it manually when the user presses the pencil button
	 */
	const fileRef = useRef(null);

	/**
	 * Stores validation or upload errors
	 * Example: "Image size must be less than 5 MB"
	 */
	const [error, setError] = useState("");

	/**
	 * Mutation responsible for uploading the image
	 * React Query gives us:
	 * - isPending  -> upload in progress
	 * - isError    -> upload failed
	 * - error      -> error message
	 */
	const mutation = useMutation({
		/**
		 * This function runs when we call mutate() or mutateAsync()
		 * It prepares the FormData and sends it to the backend
		 */
		mutationFn: async (file) => {
			const formData = new FormData();

			// Attach the file using the same name expected by multer
			formData.append("avatar", file);

			// Send FormData to the backend
			return uploadFn(formData);
		},

		/**
		 * Runs after a successful upload
		 * We refresh any related data (profile, navbar user, etc.)
		 */
		onSuccess: async (res) => {
			// Step 1:
			// Tell React Query that the "current user" data is outdated
			// This allows any component using this query to refresh if needed

			for (const key in invalidateKeys) {
				await qc.invalidateQueries({ queryKey: invalidateKeys[key] });
			}
			//await qc.invalidateQueries({ queryKey: queryKeys.currentUser });

			// Step 2:
			// If the backend returns the new avatar public ID,
			// we update the Auth state directly.
			// This makes the navbar update immediately without waiting for a refetch.
			const newPublicId = res?.data?.talentProfile.avatarPublicId;
			console.log("useavatar res", res, newPublicId);

			if (newPublicId) {
				updateCurrentUser((prev) => ({
					...prev, // keep all existing user data
					talentProfile: {
						...prev?.talentProfile, // keep old profile data
						avatarPublicId: newPublicId, // replace only the avatar image
					},
				}));
				console.log("updated user useUploade", updateCurrentUser);
			}
		},

		/**
		 * Runs if the upload fails
		 * We store the error message to show it in the UI
		 */
		onError: (err) => {
			setError(err?.message || "Failed to upload image");
		},
	});

	/**
	 * Called when the user clicks the pencil icon
	 * Opens the file picker
	 */
	const onPickAvatar = useCallback(() => {
		setError(""); // clear old errors
		fileRef.current?.click(); // open file selector
	}, []);

	/**
	 * Called when the user selects a file
	 * Validates the image, then uploads it
	 */
	const onAvatarChange = useCallback(
		async (e) => {
			// Get the selected file
			const file = e.target.files?.[0];

			// Reset input value so selecting the same file again works
			e.target.value = "";

			if (!file) return;

			setError(""); // clear previous errors

			/**
			 * Validate the image:
			 * - file type (jpg/png)
			 * - file size
			 */
			const validation = validateImageFile(file, validationOptions);
			if (!validation.ok) {
				setError(validation.message);
				return;
			}

			// Upload the image
			await mutation.mutateAsync(file);
		},
		[mutation, validationOptions],
	);

	/**
	 * Values returned from the hook
	 * These are used inside the component (UI)
	 */
	return {
		fileRef, // ref for <input type="file" />
		onPickAvatar, // open file picker
		onAvatarChange, // handle selected file

		avatarError: error,
		setAvatarError: setError,

		// Full mutation object (isPending, isError, error, reset, etc.)
		avatarMutation: mutation,
	};
}
