// src/hooks/queries/moderation/useModerationJobs.js
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import { listModerationJobs } from "../../../services/moderation.service";

export function useModerationJobs({ limit = 20, skip = 0 } = {}) {
	const params = { limit, skip };
	return useQuery({
		queryKey: queryKeys.moderationJobs(params),
		queryFn: () => listModerationJobs(params),
		keepPreviousData: true,
		staleTime: 20 * 1000,
	});
}
