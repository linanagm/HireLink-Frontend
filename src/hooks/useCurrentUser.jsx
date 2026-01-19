// src/hooks/useCurrentUser.js
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import { getUser } from "../services/auth.service";

export function useCurrentUser({ token, onUser, onLogout }) {
	return useQuery({
		queryKey: queryKeys.currentUser,
		queryFn: getUser,
		enabled: !!token,
		retry: false,
		onSuccess: (user) => {
			onUser?.(user);
		},
		onError: () => {
			onLogout?.();
		},
	});
}
