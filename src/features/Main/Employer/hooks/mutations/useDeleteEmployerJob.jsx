import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../lib/queryKeys";
import {
	createEmployerJob,
	deleteEmployerJob,
	updateEmployerJob,
} from "../../../../../services/employer.service";

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

export function useDeleteEmployerJob() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async (jobId) => {
			const res = await deleteEmployerJob(jobId);
			if (!res.ok)
				throw res.error || new Error(res.message || "Failed to delete job");
			return res;
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [queryKeys.employerDashboardAggregated],
			});
			qc.invalidateQueries({ queryKey: [queryKeys.employerJobs] });
		},
	});
}
