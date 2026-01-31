import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { queryKeys } from "../../../../../lib/queryKeys";
import { updateEmployerProfile } from "../../../../../services/employer.service";

// export function useUpdateEmployerProfile() {
// 	const qc = useQueryClient();

// 	return useMutation({
// 		mutationFn: updateEmployerProfile,

// 		onSuccess: (payload) => {
// 			toast.success("Profile updated");

// 			// update cache
// 			qc.setQueryData([queryKeys.employerProfile], (old) => {
// 				if (!old) return old;

// 				const oldData = old.data ?? old;
// 				const employerProfile = oldData?.employerProfile ?? {};

// 				return {
// 					...old,
// 					data: {
// 						...oldData,
// 						employerProfile: {
// 							...employerProfile,
// 							...payload,
// 							updatedAt: new Date().toISOString(),
// 						},
// 					},
// 				};
// 			});

// 			qc.invalidateQueries({ queryKey: [queryKeys.employerProfile] });
// 		},

// 		onError: (err) => {
// 			toast.error(err?.message || "Update failed");
// 		},
// 	});
// }

export function useUpdateEmployerProfile() {
	const qc = useQueryClient();
	const qk = [queryKeys.employerProfile];

	return useMutation({
		mutationFn: updateEmployerProfile,

		// Optimistic update (instant UI)
		onMutate: async (patch) => {
			await qc.cancelQueries({ queryKey: qk });

			const previous = qc.getQueryData(qk);

			qc.setQueryData(qk, (old) => {
				if (!old) return old;

				const oldData = old.data ?? old;
				const employerProfile = oldData?.employerProfile ?? {};

				return {
					...old,
					data: {
						...oldData,
						employerProfile: {
							...employerProfile,
							...patch,
							updatedAt: new Date().toISOString(),
						},
					},
				};
			});

			return { previous };
		},

		onError: (err, _patch, ctx) => {
			if (ctx?.previous) qc.setQueryData(qk, ctx.previous);
			toast.error(err?.message || "Update failed");
		},

		onSuccess: (res) => {
			toast.success("Profile updated");

			// Prefer server as source of truth
			const serverPayload = res?.data ?? res;

			qc.setQueryData(qk, (old) => {
				if (!old) return old;

				const oldData = old.data ?? old;
				const employerProfile = oldData?.employerProfile ?? {};

				return {
					...old,
					data: {
						...oldData,
						employerProfile: {
							...employerProfile,
							...(serverPayload?.employerProfile ?? serverPayload ?? {}),
						},
					},
				};
			});

			// OPTIONAL: only if your backend adds extra computed fields
			// qc.invalidateQueries({ queryKey: qk, exact: true });
		},
	});
}
