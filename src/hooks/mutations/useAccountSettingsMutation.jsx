import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
	logoutRes as logout,
	logoutAll,
	requestPasswordReset,
} from "../../services/auth.service";
import { useAuth } from "../useAuth";

export function useAccountSecurityMutations() {
	const qc = useQueryClient();
	const { logout: authLogout, currentUser } = useAuth();

	const logoutMutation = useMutation({
		mutationFn: logout,
		onSuccess: async () => {
			await qc.cancelQueries();
			authLogout?.();
			qc.clear();
			toast.success("Signed out");
		},
		onError: (err) => toast.error(err?.message || "Failed to sign out"),
	});

	const logoutAllMutation = useMutation({
		mutationFn: logoutAll,
		onSuccess: async () => {
			authLogout?.();
			qc.clear();
			toast.success("Signed out from all devices");
		},
		onError: (err) =>
			toast.error(err?.message || "Failed to sign out from all devices"),
	});

	const resetPasswordMutation = useMutation({
		mutationFn: () => requestPasswordReset(currentUser?.email),
		onSuccess: () => toast.success("Password reset email sent"),
		onError: (err) => toast.error(err?.message || "Failed to send reset email"),
	});

	return {
		logoutMutation,
		logoutAllMutation,
		resetPasswordMutation,
	};
}
