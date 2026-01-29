import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../lib/queryKeys";
import { updateEmployerApplicationStatus } from "../../../../../services/employer.service";

export function useUpdateEmployerApplicationStatus() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async ({ applicationId, status }) => {
			const res = await updateEmployerApplicationStatus(applicationId, status);
			if (!res?.ok)
				throw (
					res?.error || new Error(res?.message || "Failed to update status")
				);
			return res.data ?? res;
		},
		onSuccess: (_data, vars) => {
			qc.invalidateQueries({
				queryKey: [queryKeys.employerApplication, vars.applicationId],
			});
			qc.invalidateQueries({ queryKey: [queryKeys.employerJobs] });
			qc.invalidateQueries({ queryKey: [queryKeys.employerRecentApps] });
		},
	});
}
