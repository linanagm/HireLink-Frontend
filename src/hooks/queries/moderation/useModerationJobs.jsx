import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeys } from "../../../lib/queryKeys";
import { listModerationJobs } from "../../../services/moderation.service";

export function useModerationJobs({ limit = 20, skip = 0 } = {}) {
	const params = useMemo(() => ({ limit, skip }), [limit, skip]);

	return useQuery({
		queryKey: queryKeys.moderationJobs(params),
		queryFn: () => listModerationJobs(params),
		keepPreviousData: true,
		staleTime: 20 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		retry: 1,
		placeholderData: (prev) => prev,
	});
}
