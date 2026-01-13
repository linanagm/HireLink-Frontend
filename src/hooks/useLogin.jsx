// src/hooks/useLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, login as loginApi } from "../services/auth.service";
import {
	getAvatarUrl,
	getCurrent,
	updateProfile,
	uploadAvatar,
} from "../services/talent.service";
import { clearDraft, loadDraft } from "../utils/Helpers/profile.helper";
import { useAuth } from "./useAuth";

function base64ToFile(base64, filename = "avatar.png") {
	const arr = base64.split(",");
	const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8 = new Uint8Array(n);
	while (n--) u8[n] = bstr.charCodeAt(n);
	return new File([u8], filename, { type: mime });
}

export function useLogin() {
	const navigate = useNavigate();
	const { saveLogin, setUser } = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [apiError, setApiError] = useState("");

	const navigateByRole = (role) => {
		if (role === "TALENT") return navigate("/talent/findjob");
		if (role === "EMPLOYER") return navigate("/employer/dashboard");
		return navigate("/");
	};

	const syncTalentDraft = async () => {
		const draft = loadDraft();
		if (!draft) return;

		if (draft.profile && Object.keys(draft.profile).length) {
			await updateProfile(draft.profile);
		}

		if (draft.avatarBase64) {
			const file = base64ToFile(draft.avatarBase64, "avatar.png");
			await uploadAvatar(file);
		}

		clearDraft();
	};

	// const doLogin = async ({ email, password }, rememberMe) => {
	// 	setIsLoading(true);
	// 	setApiError("");

	// 	try {
	// 		// 1) login
	// 		const response = await loginApi({ email, password });
	// 		if (!response?.ok) {
	// 			throw new Error(response?.message || "Login failed");
	// 		}

	// 		const token = response?.data?.token;
	// 		if (!token) throw new Error("Unexpected server response (token missing)");

	// 		// 2) save token
	// 		saveLogin(token, rememberMe);

	// 		// 3) get user role
	// 		const meRes = await getUser(token);
	// 		console.log("uselogin meres: ", meRes);

	// 		if (!meRes?.ok) throw new Error(meRes?.message || "Failed to fetch user");

	// 		// 4) talent: sync draft then refresh
	// 		if (meRes.data?.role === "TALENT") {
	// 			await syncTalentDraft();

	// 			const updated = await getCurrent();
	// 			const updatedUser = updated?.data?.data;

	// 			let avatarUrl = null;
	// 			try {
	// 				const av = await getAvatarUrl(80, 80);
	// 				avatarUrl = av?.data?.data?.avatar;
	// 			} catch {}

	// 			setUser({ ...updatedUser, avatarUrl });
	// 			return navigateByRole(updatedUser?.role);
	// 		}

	// 		// other roles
	// 		setUser(meRes.data);
	// 		return navigateByRole(meRes.data?.role);
	// 	} catch (err) {
	// 		setApiError(err?.message || "Something went wrong. Try again.");
	// 		throw err;
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	const doLogin = async ({ email, password }, rememberMe) => {
		/**
		 * LOGIN ALGORITHM
		 * 1) Authenticate user (email/password) -> get token
		 * 2) Persist token (localStorage or sessionStorage)
		 * 3) Fetch "me" (/auth/profile) to know role + basic identity
		 * 4) If role = TALENT:
		 *    4.1) Sync local draft (profile + avatar) to server (optional)
		 *    4.2) Fetch fresh talent profile (/talent/profile)
		 *    4.3) (Optional) Fetch avatar URL (/talent/avatar?width&height)
		 *    4.4) Store final user in AuthContext
		 *    4.5) Navigate based on role
		 * 5) Else (EMPLOYER/ADMIN/etc):
		 *    5.1) Store "me" data in AuthContext
		 *    5.2) Navigate based on role
		 */

		setIsLoading(true);
		setApiError("");

		try {
			// 1) LOGIN -> TOKEN
			const loginRes = await loginApi({ email, password });
			if (!loginRes?.ok) throw new Error(loginRes?.message || "Login failed");

			const token = loginRes?.data?.token;
			if (!token) throw new Error("Token missing from login response");

			// 2)) SAVE TOKEN (single source of truth for authentication)
			saveLogin(token, rememberMe);

			// 3) GET ME (role + identity)
			// NOTE: Prefer not passing token manually unless your service requires it.
			// If your axios interceptor reads token from storage, just call getUser().
			const meRes = await getUser(token);
			if (!meRes?.ok)
				throw new Error(meRes?.message || "Failed to fetch current user");

			const me = meRes?.data; // { id, email, role, ... }
			const role = me?.role;

			// 4) TALENT FLOW
			if (role === "TALENT") {
				// 4.1) Sync local draft (optional). If it fails, we still continue login.
				try {
					await syncTalentDraft();
				} catch (e) {
					// draft sync should not block login
					console.warn("Draft sync failed:", e);
				}

				// 4.2) Fetch latest talent profile (server is source of truth)
				const profileRes = await getCurrent();
				const talentProfile = profileRes?.data?.data;

				if (!talentProfile) {
					// fallback to "me" data at least, instead of saving broken object
					setUser(me);
					return navigateByRole(role);
				}

				// 4.3) Optional avatar URL (never break login if it fails)
				let avatarUrl;
				try {
					const avatarRes = await getAvatarUrl(80, 80);
					// adjust path depending on your API response shape
					avatarUrl = avatarRes?.data?.data?.avatar;
				} catch (e) {
					console.warn("Avatar fetch failed:", e);
				}

				// 4.4) Store final user in context
				setUser({ ...talentProfile, avatarUrl });

				// 4.5) Navigate
				return navigateByRole(talentProfile?.role || role);
			}

			// 5) OTHER ROLES FLOW
			setUser(me);
			return navigateByRole(role);
		} catch (err) {
			setApiError(err?.message || "Something went wrong. Try again.");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return { doLogin, isLoading, apiError };
}
