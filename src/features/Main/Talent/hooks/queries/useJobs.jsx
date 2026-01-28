import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../../../hooks/useAuth";
import { queryKeys } from "../../../../../lib/queryKeys";
import { getJobs } from "../../../../../services/talent.service";

export default function useJobs({ queryParams }) {
	const { currentUser, isAuthReady, isAuthenticated } = useAuth();
	const isTalent = currentUser?.role === "TALENT";
	const mode = queryParams?.mode ?? "recent";
	const limit = queryParams?.limit ?? 10;
	const skip = queryParams?.skip ?? 0;
	const q = queryParams?.q ?? "";

	return useQuery({
		//queryKey: [...queryKeys.jobsByMode(mode), { limit, skip, q }],
		queryKey: [...queryKeys.jobsByMode(mode), limit, skip, q],

		//queryFn: () => getJobs({ ...queryParams, mode, limit, skip, q }),
		queryFn: () => getJobs({ mode, limit, skip, q }),
		enabled: Boolean(isAuthReady && isAuthenticated && isTalent),
		refetchOnWindowFocus: false,
		retry: 1,

		staleTime: 60 * 1000,
		keepPreviousData: true,
	});
}
