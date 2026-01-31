import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../lib/queryKeys";
import { getMyApplications } from "../../../../../../services/talent.service";
export const useTalentMyAppQuery = (jobId) =>
	useQuery({
		queryKey: queryKeys.MyApplications, // key واضح
		queryFn: () => getMyApplications(),
		enabled: !!jobId,

		staleTime: 5 * 10 * 1000,

		//
		refetchInterval: (data) => {
			const apps = data?.data ?? data;
			if (!apps) return 15_000;
			if (!Array.isArray(apps)) return 15_000; // ✅ حماية

			const hasPending = apps.some((a) => a.status === "PENDING");
			return hasPending ? 15_000 : false;
		},

		refetchIntervalInBackground: false, // مهم

		refetchOnWindowFocus: false,

		placeholderData: (prev) => prev,
	});
