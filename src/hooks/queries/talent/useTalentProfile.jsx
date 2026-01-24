import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import { getTalentProfile } from "../../../services/talent.service";
import { useAuth } from "../../useAuth";

export function useTalentProfileQuery() {
	const { currentUser, isAuthReady, isAuthenticated } = useAuth();
	const isTalent = currentUser?.role === "TALENT";

	return useQuery({
		queryKey: queryKeys.talentProfile,
		queryFn: async () => {
			const res = await getTalentProfile();
			if (!res.ok) throw new Error(res.message) || "Failed to load profile";
			return res;
		},
		enabled: Boolean(isAuthReady && isAuthenticated && isTalent),
		retry: false,
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000,
	});
}
