import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../lib/queryKeys";
import { listJobApplications } from "../../../../services/employer.service";

export function useEmployerRecentApplicationsQuery(
  jobs,
  { recentLimit = 5, jobsSample = 5 } = {}
) {
  return useQuery({
    queryKey: [
      queryKeys.employerRecentApps,
      { recentLimit, jobsSample, jobsCount: jobs?.length ?? 0 },
    ],
    enabled: Array.isArray(jobs) && jobs.length > 0,
    staleTime: 30 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const recentJobs = [...jobs]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, jobsSample);

      const chunks = await Promise.all(
        recentJobs.map(async (job) => {
          const res = await listJobApplications(job.id);
          const apps = res?.ok ? (res.data ?? []) : [];
          return apps.map((app) => ({
            ...app,
            jobTitle: job.title,
            jobId: job.id,
          }));
        })
      );

      const flat = chunks.flat();
      return flat
        .filter((a) => a?.createdAt)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, recentLimit);
    },
  });
}
