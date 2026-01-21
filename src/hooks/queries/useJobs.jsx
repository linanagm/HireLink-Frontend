export default function useJobs() {
	return useQuery({
		queryKey: ["jobs", queryParams],
		queryFn: () => getJobs(queryParams),
		staleTime: 60 * 1000,
		keepPreviousData: true,
	});
}
