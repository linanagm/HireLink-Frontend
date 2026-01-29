import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../lib/queryKeys";
import { getEmployerProfile } from "../../../../../services/employer.service";

export function useEmployerProfileQuery() {
	return useQuery({
		queryKey: [queryKeys.employerProfile],
		queryFn: getEmployerProfile,
		staleTime: 60 * 1000,
		retry: false,
		refetchOnWindowFocus: false,
	});
}
