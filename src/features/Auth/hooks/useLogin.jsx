import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { queryKeys } from "../../../lib/queryKeys";
import { getUser, login as loginApi } from "../../../services/auth.service";

// handle login process and navigation
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

			saveLogin(token, rememberMe);

			// 3) FETCH USER DATA
			const meRes = await qc.fetchQuery({
				queryKey: queryKeys.currentUser,
				queryFn: () => getUser(),
			});

			if (!meRes?.ok) throw new Error(meRes?.message || "Failed to load user");

			const me = meRes.data;
			const role = me?.role;

			// 4) Build user object
			console.log("me:", me, role);

			// 5) SET USER ONCE
			setUser(me);

			// 6) NAVIGATE ONCE
			return navigateByRole(me.role);
		} catch (err) {
			setApiError(err?.message || "Something went wrong. Try again.");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return { doLogin, isLoading, apiError };
}
