import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../lib/queryKeys";
import { getJobs } from "../../../../../services/talent.service";

/**
 * A hook to fetch jobs from the server.
 *
 * @param {object} queryParams - Object containing the query parameters
 * to fetch the jobs. The object should contain the following properties:
 * limit - The number of jobs to fetch in each request
 * skip - The number of jobs to skip before fetching
 * mode - The mode of jobs to fetch. Can be either "recent" or "best"
 * @returns {object} - The result of the query
 */
export default function useJobs({ queryParams }) {
	return useQuery({
		queryKey: [queryKeys.jobs, queryParams],
		queryFn: () => getJobs(queryParams),
		staleTime: 60 * 1000,
		keepPreviousData: true,
	});
}
