import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../lib/queryKeys";
import { getJobById } from "../../../../../../services/talent.service";

export function useTalentJobQuery(jobId, { enabled = true } = {}) {
	const isEnabled = Boolean(jobId) && enabled;

	return useQuery({
		queryKey: [queryKeys.jobDetails, jobId],
		enabled: isEnabled,

		queryFn: () => getJobById(jobId),
		staleTime: 5 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		retry: false,
		placeholderData: (prev) => prev,
	});
}
