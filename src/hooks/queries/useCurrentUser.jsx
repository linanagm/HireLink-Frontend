import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import { getUser } from "../../services/auth.service";
/**
 * useCurrentUser hook to fetch the current user from the server.
 * @param {token} authentication token
 * @param {hasUser} whether the user is already fetched
 * @param {onUser} callback function to handle the fetched user
 * @param {onLogout} callback function to handle logout
 * @returns {object} the current user or null if not found
 */
export function useCurrentUser({ token, enabled = true, onUser, onLogout }) {
	return useQuery({
		queryKey: queryKeys.currentUser,
		queryFn: () => getUser(token),
		enabled: enabled,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		staleTime: 5 * 60 * 1000,
		onSuccess: (res) => onUser?.(res?.data ?? res),
		onError: () => onLogout?.(),
	});
}
