import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import { getUser } from "../../services/auth.service";

/**
 * Hook to fetch the current user from the backend.
 *
 * @param {Object} options - Options object.
 * @param {string} options.token - The user's authentication token.
 * @param {boolean} options.enabled - Whether to enable the query. Defaults to true.
 * @param {function} options.onUser - A function to call on success with the user data as an argument.
 * @param {function} options.onLogout - A function to call on 401 error with no arguments.
 * @returns {UseQueryResult} The result object of the useQuery hook.
 */
export function useCurrentUser({ token, enabled = true, onUser, onLogout }) {
	const isEnabled = Boolean(enabled && token); // ✅ أهم سطر: ممنوع request بدون token

	return useQuery({
		queryKey: queryKeys.currentUser,
		queryFn: () => getUser(token),
		enabled: isEnabled,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		placeholderData: (prev) => prev,

		staleTime: 5 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
		onSuccess: (res) => {
			if (res?.ok) onUser?.(res?.data);
			else onLogout?.();
		},
		onError: () => {
			const status = err?.response?.status;
			if (status === 401 || status === 403) onLogout?.();
		},
	});
}
