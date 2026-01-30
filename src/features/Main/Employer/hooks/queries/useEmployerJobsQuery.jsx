import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../lib/queryKeys";
import {
	getEmployerJob,
	listEmployerJobs,
} from "../../../../../services/employer.service";

export function useEmployerJobsQuery() {
	return useQuery({
		queryKey: [queryKeys.employerJobs],

		queryFn: async () => {
			const res = await listEmployerJobs();
			if (!res?.ok)
				throw res?.error || new Error(res?.message || "Failed to load jobs");
			return res.data ?? [];
		},
		staleTime: 60 * 1000,
		retry: 1,
		refetchOnWindowFocus: false,
	});
}

export function useEmployerJobQuery(jobId, { enabled } = {}) {
	return useQuery({
		queryKey: ["employerJob", jobId],
		enabled: !!jobId && (enabled ?? true),
		refetchOnWindowFocus: false,
		queryFn: async () => {
			const res = await getEmployerJob(jobId);

			if (!res?.ok) {
				throw res?.error || new Error(res?.message || "Failed to load job");
			}

			//
			return res?.data?.data ?? res?.data;
		},
	});
}
