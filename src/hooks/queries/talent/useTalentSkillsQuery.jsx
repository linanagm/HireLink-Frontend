import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import { getTalentSkills } from "../../../services/talent.service";
import { useAuth } from "../../useAuth";

export function useTalentSkillsQuery() {
	const { currentUser, isAuthenticated, isAuthReady } = useAuth();
	const isTalent = currentUser?.role === "TALENT";

	return useQuery({
		queryKey: queryKeys.talentSkills,
		queryFn: async () => {
			const res = await getTalentSkills();
			if (!res?.ok) throw new Error(res?.message || "Failed to load skills");
			return res;
		},
		enabled: Boolean(isAuthReady && isAuthenticated && isTalent),
		retry: false,
		refetchOnWindowFocus: false,
	});
}
