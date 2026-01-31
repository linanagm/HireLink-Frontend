import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../lib/queryKeys";
import { getJobById } from "../../../../../../services/talent.service";

export function useTalentJobQuery(jobId, { enabled = true } = {}) {
	return useQuery({
		queryKey: [queryKeys.jobDetails, jobId],
		enabled: Boolean(jobId) && enabled,
		staleTime: 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: (prev) => prev,
		queryFn: () => getJobById(jobId),
	});
}
