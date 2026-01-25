// src/features/employer/jobs/hooks/useEmployerJob.js
import { useMutation, useQuery } from "@tanstack/react-query";
import {
	createEmployerJob,
	getEmployerJob,
	updateEmployerJob,
} from "../../../services/employer.service";

export function useEmployerJobQuery(jobId, { enabled } = {}) {
	return useQuery({
		queryKey: ["employerJob", jobId],
		queryFn: async () => {
			const res = await getEmployerJob(jobId);
			return res?.data?.data ?? res?.data; // depending on your api() normalize
		},
		enabled: !!jobId && (enabled ?? true),
	});
}

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
