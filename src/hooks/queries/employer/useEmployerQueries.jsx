import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeys } from "../../../lib/queryKeys";
import {
	getEmployerProfile,
	listEmployerJobs,
	listJobApplications,
} from "../../../services/employer.service";

/**
 * Hook to fetch employer's jobs with derived data (stats and job summary)
 * const { data, error, isLoading } = useEmployerDashboardJobs();
 */
export function useEmployerDashboardJobs() {
	const jobsQ = useQuery({
		queryKey: [queryKeys.employerJobs],
		queryFn: async () => {
			const res = await listEmployerJobs();
			if (!res.ok)
				throw res.error || new Error(res.message || "Failed to load jobs");
			return res;
		},
		staleTime: 60 * 1000,
	});

	const jobs = jobsQ.data?.data ?? [];

	const derived = useMemo(() => {
		const totalJobPosts = jobs.length;
		const activeJobs = jobs.filter((j) => Boolean(j.publishedAt)).length;

		const jobSummary = [...jobs]
			.sort(
				(a, b) =>
					new Date(b.publishedAt || b.createdAt) -
					new Date(a.publishedAt || a.createdAt),
			)
			.slice(0, 5)
			.map((j) => ({
				id: j.id,
				title: j.title,
				postedOn: j.publishedAt || j.createdAt,
				location: j.location,
				jobType: j.jobType,
				experienceLevel: j.experienceLevel,
				applicantsCount: null,
				viewsCount: null,
				status: j.publishedAt ? "Open" : "Draft",
			}));

		return {
			stats: { totalJobPosts, activeJobs, applicationsReceived: null },
			jobSummary,
		};
	}, [jobs]);

	return { ...jobsQ, jobs, derived };
}

/**
 * Hook to fetch employer's dashboard aggregated data (stats, job summary, and recent applicants)
 *
 * @param {Object} options - An object containing the following properties:
 *   - summaryLimit: The number of jobs to fetch for the job summary.
 *   - recentLimit: The number of recent applicants to fetch.
 * @returns {Object} An object containing the query data, the derived data (stats, job summary, and recent applicants), and the query status.
 * @example
 *
 * const { data, error, isLoading } = useEmployerDashboardAggregated({
 *   summaryLimit: 5,
 *   recentLimit: 5,
 * });
 */
export function useEmployerDashboardAggregated({
	summaryLimit = 5,
	recentLimit = 5,
} = {}) {
	return useQuery({
		queryKey: [
			queryKeys.employerDashboardAggregated,
			{ summaryLimit, recentLimit },
		],
		staleTime: 30 * 1000,
		queryFn: async () => {
			// 1) Jobs
			const jobsRes = await listEmployerJobs();
			if (!jobsRes.ok)
				throw (
					jobsRes.error || new Error(jobsRes.message || "Failed to load jobs")
				);

			const jobs = jobsRes.data ?? [];

			// 2) Fetch applications for each job
			const appsByJob = await Promise.all(
				jobs.map(async (job) => {
					const res = await listJobApplications(job.id);
					const apps = res.ok ? res.data : [];
					return { jobId: job.id, jobTitle: job.title, apps };
				}),
			);

			// 3) Stats
			const totalJobPosts = jobs.length;
			const activeJobs = jobs.filter((j) => Boolean(j.publishedAt)).length;

			const applicationsReceived = appsByJob.reduce(
				(sum, x) => sum + (x.apps?.length ?? 0),
				0,
			);

			// 4) Applicants count per job
			const applicantsCountByJobId = new Map(
				appsByJob.map((x) => [x.jobId, x.apps?.length ?? 0]),
			);

			// 5) Job summary (summaryLimit)
			const jobSummary = [...jobs]
				.sort(
					(a, b) =>
						new Date(b.publishedAt || b.createdAt) -
						new Date(a.publishedAt || a.createdAt),
				)
				.slice(0, summaryLimit)
				.map((j) => ({
					id: j.id,
					title: j.title,
					postedOn: j.publishedAt || j.createdAt,
					status: j.publishedAt ? "Open" : "Draft",
					applicantsCount: applicantsCountByJobId.get(j.id) ?? 0,
				}));

			const allApps = appsByJob.flatMap((x) =>
				(x.apps ?? []).map((app) => ({
					...app,
					jobTitle: x.jobTitle,
				})),
			);

			const recentApplicants = allApps
				.filter((a) => a?.createdAt)
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
				.slice(0, recentLimit);

			return {
				stats: { totalJobPosts, activeJobs, applicationsReceived },
				jobSummary,
				recentApplicants,
			};
		},
	});
}

/**
 * Hook to fetch employer's profile with derived data (stats and job summary)
 * const { data, error, isLoading } = useEmployerProfileQuery();
 */

export function useEmployerProfileQuery() {
	return useQuery({
		queryKey: [queryKeys.employerProfile],
		queryFn: getEmployerProfile,
		staleTime: 60 * 1000,
		retry: false,
		refetchOnWindowFocus: false,
	});
}

/**
 * Hook to update employer's profile with derived data (stats and job summary)
 * const { mutate: updateProfile } = useUpdateEmployerProfile();
 * updateProfile(profileData).then(() => {
 *   // Handle success
 * }).catch((error) => {
 *   // Handle error
 * });
 */
