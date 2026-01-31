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

export function useUploadTalentResumeMutation() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: uploadTalentResume,
		onSuccess: async (res) => {
			// 1) Update cache immediately with SAME SHAPE the query returns
			qc.setQueryData(queryKeys.talentResume, res);

			// 2) Refresh profile if needed (don’t block UI)
			qc.invalidateQueries({
				queryKey: queryKeys.talentProfile,
				refetchType: "active",
			});

			// 3) Optional: if you want to be extra-safe, refetch resume when page is open
			qc.invalidateQueries({
				queryKey: queryKeys.talentResume,
				refetchType: "active",
			});
		},
	});
}

export function useDeleteTalentResumeMutation() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: deleteTalentResume,
		onSuccess: async () => {
			// Put a value with the SAME SHAPE
			qc.setQueryData(queryKeys.talentResume, (old) => ({
				...(old ?? { ok: true, message: "resume deleted" }),
				ok: true,
				data: null,
			}));

			qc.invalidateQueries({
				queryKey: queryKeys.talentProfile,
				refetchType: "active",
			});
			qc.invalidateQueries({
				queryKey: queryKeys.talentResume,
				refetchType: "active",
			});
		},
	});
}
