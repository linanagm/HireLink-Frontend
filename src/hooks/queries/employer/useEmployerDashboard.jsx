import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import {
	listEmployerJobs,
	listJobApplications,
} from "../../../services/employer.service";

const norm = (v) => String(v || "").toUpperCase();

export function useEmployerDashboard({
	summaryLimit = 5,
	recentLimit = 5,
} = {}) {
	return useQuery({
		queryKey: [queryKeys.employerDashboard, { summaryLimit, recentLimit }],
		staleTime: 30 * 1000,
		queryFn: async () => {
			const jobsRes = await listEmployerJobs();
			if (!jobsRes.ok)
				throw (
					jobsRes.error || new Error(jobsRes.message || "Failed to load jobs")
				);

			const jobs = jobsRes.data ?? [];

			// applications per job
			const appsByJob = await Promise.all(
				jobs.map(async (job) => {
					const res = await listJobApplications(job.id);
					const apps = res.ok ? (res.data ?? []) : [];
					return { jobId: job.id, jobTitle: job.title, job, apps };
				}),
			);

			// stats
			const totalJobs = jobs.length;
			const activeOpenJobs = jobs.filter(
				(j) => norm(j.jobStatus) === "OPEN",
			).length;

			const totalApplications = appsByJob.reduce(
				(sum, x) => sum + (x.apps?.length ?? 0),
				0,
			);

			// map jobId -> applicationsCount
			const appsCountByJobId = new Map(
				appsByJob.map((x) => [x.jobId, x.apps.length]),
			);

			// job summary
			const jobSummary = [...jobs]
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
				.slice(0, summaryLimit)
				.map((j) => ({
					id: j.id,
					title: j.title,
					postedOn: j.createdAt,
					jobStatus: j.jobStatus,
					applicationsCount: appsCountByJobId.get(j.id) ?? 0,
				}));

			// recent applications (across all jobs)
			const allApps = appsByJob.flatMap((x) =>
				(x.apps ?? []).map((app) => ({
					...app,
					jobTitle: x.jobTitle,
					jobId: x.jobId,
				})),
			);

			const recentApplications = allApps
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
				.slice(0, recentLimit);

			return {
				stats: { totalJobs, activeOpenJobs, totalApplications },
				jobSummary,
				recentApplications,
				jobs, // full list (for modal)
				appsByJob, // for applications modal
			};
		},
	});
}
