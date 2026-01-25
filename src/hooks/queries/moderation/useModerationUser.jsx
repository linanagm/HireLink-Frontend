import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import { listModerationUsers } from "../../../services/moderation.service";

export function useModerationUsers({ limit = 20, skip = 0 } = {}) {
	const params = { limit, skip };
	return useQuery({
		queryKey: queryKeys.moderationUsers(params),
		queryFn: () => listModerationUsers(params),
		keepPreviousData: true,
		staleTime: 20 * 1000,
	});
}
