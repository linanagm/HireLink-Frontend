import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeys } from "../../../../../../lib/queryKeys";
import { getJobs } from "../../../../../../services/talent.service";

export default function useJobs({ queryParams }) {
	const mode = queryParams?.mode ?? "recent";
	const limit = queryParams?.limit ?? 10;
	const skip = queryParams?.skip ?? 0;
	//const q = queryParams?.q ?? "";
	// normalize q to avoid cache fragmentation by whitespace
	const q = (queryParams?.q ?? "").trim();
	// stabilize params object to reduce unnecessary object churn
	const params = useMemo(
		() => ({ ...queryParams, mode, limit, skip, q }),
		// important: include queryParams reference; if parent recreates it,
		// this still updates correctly, but we keep the computed object consistent.
		[queryParams, mode, limit, skip, q],
	);

	return useQuery({
		queryKey: [...queryKeys.jobsByMode(mode), { limit, skip, q }],
		queryFn: () => getJobs(params),
		staleTime: 60 * 1000,
		keepPreviousData: true,
		// avoid refetching just because tab refocused
		refetchOnWindowFocus: false,
		// optional safe-ish perf: avoid aggressive retries on search/list
		retry: 1,
	});
}
