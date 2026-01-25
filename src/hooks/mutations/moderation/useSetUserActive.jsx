// src/hooks/mutations/moderation/useSetUserActive.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import { setModerationUserActive } from "../../../services/moderation.service";

export function useSetUserActive() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, isActive }) =>
			setModerationUserActive(userId, { isActive }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["moderation", "users"] });
			qc.invalidateQueries({ queryKey: queryKeys.moderationStats });
		},
	});
}
