/**
 * useLogin
 *
 * This hook handles everything related to logging a user in.
 * The idea is to keep all login logic in one place
 * instead of spreading it across components.
 *
 * Flow:
 * - Send email & password to the login API.
 * - If login succeeds, save the auth token
 *   (localStorage or sessionStorage based on "remember me").
 * - Fetch the current user to know their role.
 *
 * If the user is a TALENT:
 * - Fetch the full talent profile from the server.
 * - Try to fetch the avatar URL (failure here should not block login).
 * - Store the final user object in AuthContext.
 *
 * If the user is not a TALENT:
 * - Just store the basic user data from /auth/profile.
 *
 * Finally:
 * - Redirect the user to the correct page based on their role.
 *
 * The hook also exposes:
 * - isLoading → for disabling buttons / showing loaders.
 * - apiError → for showing login errors in the UI.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, login as loginApi } from "../services/auth.service";
import { getAvatarUrl, getCurrent } from "../services/talent.service";
import { useAuth } from "./useAuth";

export function useLogin() {
	const navigate = useNavigate();
	const { saveLogin, setUser } = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [apiError, setApiError] = useState("");

	const navigateByRole = (role) => {
		if (role === "TALENT") return navigate("/talent/findjob");
		if (role === "EMPLOYER") return navigate("/employer/dashboard");
		if (role === "ADMIN" || role === "MODERATOR")
			return navigate("/admin/dashboard");
		return navigate("/");
	};

	const doLogin = async ({ email, password }, rememberMe) => {
		setIsLoading(true);
		setApiError("");

		try {
			// 1) LOGIN -> TOKEN
			const loginRes = await loginApi({ email, password });
			if (!loginRes?.ok) throw new Error(loginRes?.message || "Login failed");

			const token = loginRes?.data?.token;
			if (!token) throw new Error("Token missing from login response");

			// 2) SAVE TOKEN
			saveLogin(token, rememberMe);

			// 3) GET ME (/auth/profile)
			const meRes = await getUser(token);
			if (!meRes?.ok)
				throw new Error(meRes?.message || "Failed to fetch current user");

			const me = meRes?.data; // { id, email, role, ... }
			const role = me?.role;

			// 4) TALENT: GET FULL PROFILE (server is source of truth)
			if (role === "TALENT") {
				let talentProfile = null;

				try {
					const profileRes = await getCurrent();

					talentProfile =
						profileRes?.data?.data ||
						profileRes?.data?.data?.data ||
						profileRes?.data?.data?.profile;
				} catch (e) {
					console.warn("Talent profile fetch failed:", e);
				}

				// Optional avatar URL (don’t break login)
				let avatarUrl;
				try {
					const avatarRes = await getAvatarUrl(80, 80);
					avatarUrl = avatarRes?.data?.data?.avatar;
				} catch (e) {
					console.warn("Avatar fetch failed:", e);
				}

				const finalUser =
					talentProfile && typeof talentProfile === "object"
						? { ...talentProfile, avatarUrl }
						: { ...me, avatarUrl };

				setUser(finalUser);
				return navigateByRole(finalUser?.role || role);
			}

			// 5) OTHER ROLES
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
