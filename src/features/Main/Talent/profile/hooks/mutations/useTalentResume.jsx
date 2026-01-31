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
		staleTime: 5 * 60 * 1000, // الكاش يفضل "fresh" 5 دقايق
		gcTime: 30 * 60 * 1000, // احتفظ بالكاش 30 دقيقة (لو v4 اسمها cacheTime)
		refetchOnWindowFocus: false, // ما تعيدش fetch لمجرد الرجوع للتاب
		refetchOnReconnect: false, // ما تعيدش fetch مع كل reconnect
		refetchOnMount: false, // لو الكاش موجود، ما تعيدش fetch عند mount
		retry: false, // resume غالبًا لو فشل مش محتاج retries مزعجة
		placeholderData: (prev) => prev, // يمنع flicker لو فيه بيانات سابق
	});
}

// export function useUploadTalentResumeMutation() {
// 	const qc = useQueryClient();
// 	return useMutation({
// 		mutationFn: uploadTalentResume,
// 		onSuccess: () => {
// 			qc.invalidateQueries({ queryKey: queryKeys.talentResume });
// 			qc.invalidateQueries({ queryKey: queryKeys.talentProfile });
// 		},
// 	});
// }
export function useUploadTalentResumeMutation() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: uploadTalentResume,

		onSuccess: async (res) => {
			const nextResume = res?.data?.resumeUrl ?? res?.payload ?? null;

			if (nextResume) {
				qc.setQueryData(queryKeys.talentResume, nextResume);
			} else {
				await qc.invalidateQueries({ queryKey: queryKeys.talentResume });
			}

			await qc.invalidateQueries({
				queryKey: queryKeys.talentProfile,
				refetchType: "inactive",
			});
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
