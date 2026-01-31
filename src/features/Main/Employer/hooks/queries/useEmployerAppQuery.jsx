import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../lib/queryKeys";
import { listJobApplications } from "../../../../../services/employer.service";

export function useEmployerJobApplicationsQuery(jobId, { enabled } = {}) {
	const isEnabled = Boolean(jobId) && enabled;

	return useQuery({
		queryKey: [queryKeys.employerJobApplications, jobId],
		enabled: isEnabled,
		staleTime: 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: (prev) => prev ?? [],
		queryFn: async () => {
			const res = await listJobApplications(jobId);
			if (!res?.ok)
				throw new Error(res?.message || "Failed to load applications");
			return res.data ?? []; // array
		},
	});
}
