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

export function useLogin() {
	const navigate = useNavigate();
	const { saveLogin, setUser } = useAuth();
	const qc = useQueryClient();
	//const { currentUser } = useAuth();
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

	const doLogin = async ({ email, password }, rememberMe) => {
		setIsLoading(true);
		setApiError("");

		try {
			// 1) LOGIN -> TOKEN
			const loginRes = await loginApi({ email, password });
			if (!loginRes?.ok) throw new Error(loginRes?.message || "Login failed");

			const token = loginRes?.data?.token;
			if (!token) throw new Error("Token missing from login response");

			// 2) SAVE TOKEN (so next requests include Authorization header)
			saveLogin(token, rememberMe);

			// 3) FETCH SERVER CURRENT USER ONCE (source of truth)
			const me = await qc.fetchQuery({
				queryKey: queryKeys.currentUser,
				queryFn: () => getUser(token),
			});

			const role = me?.role || me?.data?.role;
			if (!role) throw new Error("Role missing from current user response");

			// 4) Build final user (TALENT enrich)
			let finalUser = me?.data ?? me;

			if (role === "TALENT") {
				let talentProfile = null;
				try {
					const profileRes = await getTalentProfile();
					talentProfile =
						profileRes?.data?.data ||
						profileRes?.data?.data?.data ||
						profileRes?.data?.data?.profile;
				} catch {}

				let avatarUrl;
				try {
					const avatarRes = await getTalentAvatar(80, 80);
					avatarUrl = avatarRes?.data?.data?.avatar;
				} catch {}

				if (talentProfile && typeof talentProfile === "object") {
					finalUser = { ...talentProfile, avatarUrl };
				} else {
					finalUser = { ...(me?.data ?? me), avatarUrl };
				}
			}

			console.log("final user: \n", finalUser);

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
