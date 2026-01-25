import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import { getModerationStats } from "../../../services/moderation.service";

const normalizeStats = (res) => {
	const raw = res?.data ?? res; // حسب wrapper بتاعك
	const s = raw?.data ?? raw;

	const pick = (v) =>
		typeof v === "object" ? (v?.total ?? v?.count ?? 0) : (v ?? 0);

	return {
		users: pick(s?.users),
		jobs: pick(s?.jobs),
		activeUsers: pick(s?.activeUsers ?? s?.users?.active),
		inactiveUsers: pick(s?.inactiveUsers ?? s?.users?.inactive),
	};
};

export function useModerationStats() {
	return useQuery({
		queryKey: queryKeys.moderationStats,
		queryFn: async () => {
			const res = await getModerationStats();
			if (!res.ok) throw new Error(res.message || "Unauthorized");
			return res.data;
		},
		select: normalizeStats,
		staleTime: 30 * 1000,
	});
}
