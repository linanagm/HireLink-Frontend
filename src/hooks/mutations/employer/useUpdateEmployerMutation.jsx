import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { queryKeys } from "../../../lib/queryKeys";
import { updateEmployerProfile } from "../../../services/employer.service";

export function useUpdateEmployerProfile() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: updateEmployerProfile,
		onSuccess: () => {
			toast.success("Profile updated");
			qc.invalidateQueries({ queryKey: [queryKeys.employerProfile] });
		},
		onError: (err) => {
			toast.error(err?.message || "Update failed");
		},
	});
}
