import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import { deleteModerationUser } from "../../../services/moderation.service";

export function useDeleteUser() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (userId) => deleteModerationUser(userId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["moderation", "users"] });
			qc.invalidateQueries({ queryKey: queryKeys.moderationStats });
		},
	});
}
