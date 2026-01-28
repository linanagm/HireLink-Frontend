import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../lib/queryKeys";
import {
	deleteTalentResume,
	uploadTalentResume,
} from "../../../../../services/talent.service";

// export function useTalentResumeQuery() {
// 	return useQuery({
// 		queryKey: queryKeys.talentResume,
// 		queryFn: getTalentResume,
// 	});
// }

export function useUploadTalentResumeMutation() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: uploadTalentResume,
		onSuccess: () => {
			//qc.invalidateQueries({ queryKey: queryKeys.talentResume });
			qc.invalidateQueries({ queryKey: queryKeys.talentProfile });
		},
	});
}

export function useDeleteTalentResumeMutation() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: deleteTalentResume,
		onSuccess: async () => {
			await Promise.all([
				//qc.invalidateQueries({ queryKey: queryKeys.talentResume }),
				qc.invalidateQueries({ queryKey: queryKeys.talentProfile }),
			]);
		},
	});
}
