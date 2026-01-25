import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import { deleteModerationJob } from "../../../services/moderation.service";

export function useDeleteJob() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (jobId) => deleteModerationJob(jobId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["moderation", "jobs"] });
			qc.invalidateQueries({ queryKey: queryKeys.moderationStats });
		},
	});
}
