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
	return useQuery({
		queryKey: queryKeys.currentUser,
		queryFn: () => getUser(token),
		enabled,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		staleTime: 5 * 60 * 1000,
		onSuccess: (res) => {
			//	onUser?.(res?.data ?? res)
			if (res?.ok) onUser?.(res?.data);
			else onLogout?.(); //if failed /me
		},
		onError: () => {
			onLogout?.();
		},
	});
}
