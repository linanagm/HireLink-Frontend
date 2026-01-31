import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../lib/queryKeys";
import {
	getEmployerJob,
	listEmployerJobs,
} from "../../../../../services/employer.service";

// Keep return shape the same as before
function unwrapData(res) {
	// supports res.data.data or res.data
	return res?.data?.data ?? res?.data;
}

function toError(res, fallback) {
	return new Error(res?.message || res?.error || fallback);
}
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
		placeholderData: (prev) => prev ?? [], //prevents UI flicker
	});
}

export function useEmployerJobQuery(jobId, { enabled } = {}) {
	const isEnabled = Boolean(jobId) && (enabled ?? true);

	return useQuery({
		queryKey: [queryKeys.employerJob, jobId],
		enabled: isEnabled,
		refetchOnWindowFocus: false,
		//performance: don't refetch job details too aggressively
		staleTime: 5 * 60 * 1000,
		// keeo last job while switvhing IDs to avoid flicker
		placeholderData: (prev) => prev ?? [],
		queryFn: async () => {
			const res = await getEmployerJob(jobId);

			if (!res?.ok) throw toError(res, "Failed to load job");

			//
			return unwrapData(res);
		},
	});
}
