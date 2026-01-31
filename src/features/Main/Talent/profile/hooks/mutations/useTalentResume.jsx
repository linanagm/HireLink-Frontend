import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../lib/queryKeys";
import {
	deleteTalentResume,
	getTalentResume,
	uploadTalentResume,
} from "../../../../../../services/talent.service";

export function useTalentResumeQuery() {
	return useQuery({
		queryKey: queryKeys.talentResume,
		queryFn: getTalentResume,
		// performance
		staleTime: 5 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		retry: false,
		placeholderData: (prev) => prev,
	});
}

export function useUploadTalentResumeMutation() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: uploadTalentResume,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: queryKeys.talentResume });
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
				qc.invalidateQueries({ queryKey: queryKeys.talentResume }),
				qc.invalidateQueries({ queryKey: queryKeys.talentProfile }),
			]);
		},
	});
}
