import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../lib/queryKeys";
import {
	deleteTalentAvatar,
	getTalentAvatar,
	uploadTalentAvatar,
} from "../../../../../../services/talent.service";

export function useTalentAvatarQuery() {
	return useQuery({
		queryKey: queryKeys.talentAvatar,
		queryFn: getTalentAvatar,
	});
}

export function useUploadTalentAvatarMutation() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: uploadTalentAvatar,
		onSuccess: async () => {
			await Promise.all([
				qc.invalidateQueries({ queryKey: queryKeys.currentUser }),
				qc.invalidateQueries({ queryKey: queryKeys.talentProfile }),
				qc.invalidateQueries({ queryKey: queryKeys.talentAvatar }),
			]);
		},
	});
}

export function useDeleteTalentAvatarMutation() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: deleteTalentAvatar,
		onSuccess: async () => {
			await Promise.all([
				qc.invalidateQueries({ queryKey: queryKeys.currentUser }),
				qc.invalidateQueries({ queryKey: queryKeys.talentProfile }),
				qc.invalidateQueries({ queryKey: queryKeys.talentAvatar }),
			]);
		},
	});
}
