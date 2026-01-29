// src/features/employer/jobs/hooks/useEmployerJob.js
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../lib/queryKeys";
import {
	createEmployerJob,
	listEmployerJobs,
	updateEmployerJob
} from "../../../../services/employer.service";
// export function useEmployerJobQuery(jobId, { enabled } = {}) {
// 	return useQuery({
// 		queryKey: ["employerJob", jobId],
// 		queryFn: async () => {
// 			const res = await getEmployerJob(jobId);
// 			return res?.data?.data ?? res?.data; // depending on your api() normalize
// 		},
// 		enabled: !!jobId && (enabled ?? true),
// 	});
// }

export function useCreateEmployerJobMutation() {
	return useMutation({
		mutationFn: async (payload) => {
			const res = await createEmployerJob(payload);
			return res?.data?.data ?? res?.data;
		},
	});
}

export function useUpdateEmployerJobMutation(jobId) {
	return useMutation({
		mutationFn: async (payload) => {
			const res = await updateEmployerJob(jobId, payload);
			return res?.data?.data ?? res?.data;
		},
	});
}



export function useEmployerJobsQuery() {
  return useQuery({
    queryKey: [queryKeys.employerJobs],
    queryFn: async () => {
      const res = await listEmployerJobs();
      if (!res?.ok) throw res?.error || new Error(res?.message || "Failed to load jobs");
      return res.data ?? [];
    },
    staleTime: 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
