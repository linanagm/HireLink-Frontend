import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import { deleteEmployerJob } from "../../../services/employer.service";

/**
 * Hook to delete a job by its ID.
 *
 * @returns {Object} An object containing the delete mutation function, and the onSuccess callback function which will invalidate the employer's dashboard aggregated data and jobs list.
 * @example
 *
 * const { mutate: deleteJob } = useDeleteEmployerJob();
 *
 * deleteJob(jobId).then(() => {
 *   // Handle success
 * }).catch((error) => {
 *   // Handle error
 * });
 */
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
			// خلي الداشبورد و jobs list يتعملهم refresh
			qc.invalidateQueries({
				queryKey: [queryKeys.employerDashboardAggregated],
			});
			qc.invalidateQueries({ queryKey: [queryKeys.employerJobs] });
		},
	});
}
