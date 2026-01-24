import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { queryKeys } from "../../../lib/queryKeys";
import { updateEmployerProfile } from "../../../services/employer.service";

// export function useUpdateEmployerProfile() {
// 	const qc = useQueryClient();

// 	return useMutation({
// 		mutationFn: updateEmployerProfile,
// 		onSuccess: () => {
// 			toast.success("Profile updated");
// 			qc.invalidateQueries({ queryKey: [queryKeys.employerProfile] });
// 		},
// 		onError: (err) => {
// 			toast.error(err?.message || "Update failed");
// 		},
// 	});
// }

export function useUpdateEmployerProfile() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: updateEmployerProfile,

		onSuccess: (res, payload) => {
			toast.success("Profile updated");

			// update cache
			qc.setQueryData([queryKeys.employerProfile], (old) => {
				if (!old) return old;

				const oldData = old.data ?? old;
				const employerProfile = oldData?.employerProfile ?? {};

				return {
					...old,
					data: {
						...oldData,
						employerProfile: {
							...employerProfile,
							...payload,
							updatedAt: new Date().toISOString(),
						},
					},
				};
			});

			qc.invalidateQueries({ queryKey: [queryKeys.employerProfile] });
		},

		onError: (err) => {
			toast.error(err?.message || "Update failed");
		},
	});
}
