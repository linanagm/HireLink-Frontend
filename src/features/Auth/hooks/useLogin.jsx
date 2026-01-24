import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { queryKeys } from "../../../lib/queryKeys";
import { getUser, login as loginApi } from "../../../services/auth.service";
import {
	getTalentAvatar,
	getTalentProfile,
} from "../../../services/talent.service";

/**
 * Hook to access the login functionality.
 *
 * @param {email} The user's email address.
 * @param {password} The user's password.
 * @param {rememberMe} A boolean indicating whether to remember the user.
 * @returns {Object} An object containing three properties: doLogin, isLoading, apiError.
 */
export function useLogin() {
	const navigate = useNavigate();
	const { saveLogin, setUser } = useAuth();
	const qc = useQueryClient();
	const [isLoading, setIsLoading] = useState(false);
	const [apiError, setApiError] = useState("");

	const navigateByRole = (role) => {
		if (role === "TALENT")
			return navigate("/talent/findjob", { replace: true });
		if (role === "EMPLOYER")
			return navigate("/employer/dashboard", { replace: true });
		if (role === "ADMIN" || role === "MODERATOR")
			return navigate("/admin/dashboard", { replace: true });
		return navigate("/", { replace: true });
	};

	/**
	 * Logs a user in with the given email and password.
	 * Saves the token and final user data on success.
	 * Navigates to the appropriate dashboard based on the user's role.
	 *
	 * @param {Object} data - The user's email and password.
	 * @param {boolean} rememberMe - Whether to remember the user.
	 * @returns {Promise<void>} A promise that resolves once the login process is complete.
	 */
	const doLogin = async ({ email, password }, rememberMe) => {
		setIsLoading(true);
		setApiError("");

		try {
			// 1) Call login API to get access token
			const loginRes = await loginApi({ email, password });
			console.log("login response: ", loginRes);

			if (!loginRes?.ok) throw new Error(loginRes?.message || "Login failed");

			const token = loginRes?.data?.token;
			if (!token) throw new Error("Token missing from login response");

			// 2) SAVE TOKEN (so next requests include Authorization header)
			// This allows axios to send Authorization header automatically

			saveLogin(token, rememberMe);

			// 3) FETCH SERVER CURRENT USER ONCE (source of truth)
			// Using fetchQuery so it runs immediately

			const me = await qc.fetchQuery({
				queryKey: queryKeys.currentUser,
				queryFn: () => getUser(token),
			});

			// Extract role
			const role = me?.role || me?.data?.role;
			if (!role) throw new Error("Role missing from current user response");

			// 4) Build user object
			let finalUser = me?.data ?? me;

			// 5) If user is TALENT, fetch extra data (profile + avatar)

			if (role === "TALENT") {
				let talentProfile = null;
				try {
					// Try to fetch talent profile
					const profileRes = await getTalentProfile();
					talentProfile =
						profileRes?.data?.data ||
						profileRes?.data?.data?.data ||
						profileRes?.data?.data?.profile;
				} catch {}

				let avatarUrl;
				try {
					// Try to fetch talent avatar
					const avatarRes = await getTalentAvatar(80, 80);
					avatarUrl = avatarRes?.data?.data?.avatar;
				} catch {}
				//if profile exists,use it as main user object
				if (talentProfile && typeof talentProfile === "object") {
					finalUser = { ...talentProfile, avatarUrl };
				} else {
					//otherwise use main user object -> fallback to basic user
					finalUser = { ...(me?.data ?? me), avatarUrl };
				}
			}

			// 5) SET USER ONCE
			setUser(finalUser);

			// 6) NAVIGATE ONCE
			return navigateByRole(finalUser?.role || role);
		} catch (err) {
			setApiError(err?.message || "Something went wrong. Try again.");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return { doLogin, isLoading, apiError };
}
