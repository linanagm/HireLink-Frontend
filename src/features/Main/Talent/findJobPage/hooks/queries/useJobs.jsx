import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../lib/queryKeys";
import { getJobs } from "../../../../../../services/talent.service";

export default function useJobs({ queryParams }) {
	const mode = queryParams?.mode ?? "recent";
	const limit = queryParams?.limit ?? 10;
	const skip = queryParams?.skip ?? 0;
	const q = queryParams?.q ?? "";

	return useQuery({
		queryKey: [...queryKeys.jobsByMode(mode), { limit, skip, q }],
		queryFn: () => getJobs({ ...queryParams, mode, limit, skip, q }),
		staleTime: 60 * 1000,
		keepPreviousData: true,
	});
}
