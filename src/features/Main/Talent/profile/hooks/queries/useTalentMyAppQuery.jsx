import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../../../../hooks/useAuth";
import { queryKeys } from "../../../../../../lib/queryKeys";
import { getMyApplications } from "../../../../../../services/talent.service";
export function useTalentMyAppQuery() {
	const { currentUser, isAuthReady, isAuthenticated } = useAuth();
	const isTalent = currentUser?.role === "TALENT";
	return useQuery({
		queryKey: queryKeys.MyApplications,
		queryFn: ({ signal }) => getMyApplications({ signal }),

		enabled: Boolean(isAuthReady && isAuthenticated && isTalent),

		staleTime: 5 * 10 * 1000,

		gcTime: 30 * 60 * 1000,
		refetchOnMount: false,
		refetchOnReconnect: false,

		refetchOnWindowFocus: false,
		retry: false,
		placeholderData: (prev) => prev,
	});
}
