import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../lib/queryKeys";
import { listJobApplications } from "../../../../../services/employer.service";

export function useEmployerJobApplicationsQuery(jobId, { enabled } = {}) {
	return useQuery({
		queryKey: [queryKeys.employerJobApplications, jobId],
		enabled: !!jobId && (enabled ?? true),
		staleTime: 15 * 1000,
		refetchOnWindowFocus: false,
		queryFn: async () => {
			const res = await listJobApplications(jobId);
			if (!res?.ok)
				throw (
					res?.error || new Error(res?.message || "Failed to load applications")
				);
			return res.data ?? []; // array
		},
	});
}
