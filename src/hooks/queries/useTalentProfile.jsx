import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import { getTalentProfile } from "../../services/talent.service";
import { useAuth } from "../useAuth";

export function useTalentProfileQuery() {
	const { currentUser, isAuthenticated } = useAuth();
	const isTalent = currentUser?.role === "TALENT";

	return useQuery({
		queryKey: queryKeys.talentProfile,
		queryFn: () => getTalentProfile(),
		enabled: isAuthenticated && isTalent,
		retry: false,
		refetchOnWindowFocus: false,
		onSuccess: () => {
			if (!res.ok) throw new Error(res.message);
		},
	});
}
