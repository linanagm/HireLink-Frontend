import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../..//lib/queryKeys";
import { listEmployerJobs } from "../../../services/employer.service";

export function useEmployerRecentApplicants({ limit = 5 } = {}) {
	return useQuery({
		queryKey: [queryKeys.employerRecentApplicants, { limit }],
		queryFn: () => listEmployerJobs({ limit }),
		staleTime: 30 * 1000,
		keepPreviousData: true,
	});
}
