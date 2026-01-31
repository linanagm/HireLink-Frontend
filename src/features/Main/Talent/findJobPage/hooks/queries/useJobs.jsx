import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAuth } from "../../../../../../hooks/useAuth";
import { queryKeys } from "../../../../../../lib/queryKeys";
import { getJobs } from "../../../../../../services/talent.service";
export default function useJobs({ queryParams }) {
	const { isAuthReady, isAuthenticated } = useAuth();
	const mode = queryParams?.mode ?? "recent";
	const limit = queryParams?.limit ?? 10;
	const skip = queryParams?.skip ?? 0;

	const q = (queryParams?.q ?? "").trim();

	const params = useMemo(
		() => ({ ...queryParams, mode, limit, skip, q }),

		[queryParams, mode, limit, skip, q],
	);

	return useQuery({
		queryKey: [...queryKeys.jobsByMode(mode), { limit, skip, q }],
		queryFn: () => getJobs(params),
		enabled: isAuthReady && isAuthenticated,

		staleTime: 5 * 60 * 1000,
		keepPreviousData: true,
		// avoid refetching just because tab refocused
		refetchOnWindowFocus: false,
		// optional safe-ish perf: avoid aggressive retries on search/list
		retry: 1,
	});
}
