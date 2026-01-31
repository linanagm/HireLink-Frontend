import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeys } from "../../../lib/queryKeys";
import { listModerationUsers } from "../../../services/moderation.service";

export function useModerationUsers({ limit = 20, skip = 0 } = {}) {
	const params = useMemo(() => ({ limit, skip }), [limit, skip]);

	return useQuery({
		queryKey: queryKeys.moderationUsers(params),
		queryFn: () => listModerationUsers(params),
		keepPreviousData: true,
		staleTime: 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		retry: 1,

		placeholderData: (prev) => prev,
	});
}
