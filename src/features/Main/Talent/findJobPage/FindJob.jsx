import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { JOB_MODES, normalizeJobsMode } from "../../../../constants/jobs";
import useJobs from "../hooks/queries/useJobs";
import JobCard from "./components/JobCard";
import Pagination from "./components/Pagination";
import TabButton from "./components/TabButton";

const PAGE_SIZE = 10;
export default function JobList() {
	const [searchParams, setSearchParams] = useSearchParams();

	// URL state
	const tabFromUrl = searchParams.get("tab");
	const qFromUrl = searchParams.get("q") ?? "";
	const q = qFromUrl.trim(); // safe string

	// UI state
	const initialTab = normalizeJobsMode(tabFromUrl);
	const [tab, setTab] = useState(initialTab);
	const [page, setPage] = useState(1);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <>
	useEffect(() => {
		if (!q) return;

		if (tab !== JOB_MODES.RECENT) {
			setTab(JOB_MODES.RECENT);
			setPage(1);
		}

		const next = new URLSearchParams(searchParams);
		if (next.get("tab") !== JOB_MODES.RECENT) {
			next.set("tab", JOB_MODES.RECENT);
			setSearchParams(next, { replace: true });
		}
	}, [q]);

	// Keep URL tab in sync with state (when NOT searching)
	// biome-ignore lint/correctness/useExhaustiveDependencies: <>
	useEffect(() => {
		if (q) return; // don't fight the effect above
		const next = new URLSearchParams(searchParams);
		next.set("tab", tab);
		setSearchParams(next, { replace: true });
	}, [tab, q]);

	const skip = (page - 1) * PAGE_SIZE;

	// IMPORTANT:
	// If q exists, we search within RECENT jobs only (frontend filtering),
	// so request recent from backend even if tab was something else.
	const effectiveMode = q ? JOB_MODES.RECENT : tab;

	const queryParams = useMemo(
		() => ({
			limit: PAGE_SIZE,
			skip,
			mode: effectiveMode,
		}),
		[skip, effectiveMode],
	);

	const {
		data: response,
		isLoading,
		isError,
		error,
		isFetching,
	} = useJobs({
		queryParams,
	});

	const jobs = useMemo(() => {
		const raw = response?.data?.data ?? response?.data ?? [];
		return Array.isArray(raw) ? raw : [];
	}, [response]);

	// Frontend search filtering (no backend q)
	const filteredJobs = useMemo(() => {
		const s = q.toLowerCase();
		if (!s) return jobs;

		return jobs.filter((job) => {
			const title = (job.title ?? "").toLowerCase();
			const desc = (job.description ?? "").toLowerCase();
			const company = (
				job.employer?.companyName ??
				job.companyName ??
				""
			).toLowerCase();
			const jobType = (job.jobType ?? "").toLowerCase();
			const experienceLevel = (job.experienceLevel ?? "").toLowerCase();
			const salary = (job.salary ?? "").toLowerCase();
			const location = (job.location ?? "").toLowerCase();
			const hoursPerWeek = (job.hoursPerWeek ?? "").toLowerCase();
			const requiredSkills = job.requiredSkills ?? [];
			const requiredLanguages = job.requiredLanguages ?? [];
			return title.includes(s) || desc.includes(s) || company.includes(s);
		});
	}, [jobs, q]);
	console.log("jobs");

	const onChangeTab = useCallback(
		(nextTab) => {
			if (q) return; // block switching while searching (keeps UX predictable)
			setTab(nextTab);
			setPage(1);
		},
		[q],
	);

	const emptyText =
		effectiveMode === JOB_MODES.RECOMMENDED
			? "Please, add your skills and languages."
			: "No jobs available right now.";

	// ... keep your loading/error UI the same

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<p className="text-gray-600">Loading jobs...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<p className="text-red-600">
					Failed to load jobs: {error?.message || "Unknown error"}
				</p>
			</div>
		);
	}

	return (
		<>
			<Helmet>
				<title>Find Jobs</title>
			</Helmet>

			<div className="bg-gray-50 min-h-screen">
				<div
					className="w-full h-96 bg-cover bg-center"
					style={{ backgroundImage: "url(/images/talent-findjob.svg)" }}
				/>

				<div className="mt-6 px-10 flex items-center gap-6 border-b pb-2 text-gray-600">
					<TabButton
						active={tab === JOB_MODES.RECENT}
						onClick={() => onChangeTab(JOB_MODES.RECENT)}
					>
						Most recent
					</TabButton>

					<TabButton
						active={tab === JOB_MODES.RECOMMENDED}
						onClick={() => onChangeTab(JOB_MODES.RECOMMENDED)}
					>
						Recommended Jobs
					</TabButton>

					{isFetching && (
						<span className="ml-auto text-sm text-gray-400">Refreshing...</span>
					)}
				</div>

				<div className="px-10 mt-6 space-y-6">
					{filteredJobs.map((job) => (
						<JobCard
							key={job.id}
							job={job}
							showMatch={tab === JOB_MODES.RECOMMENDED}
						/>
					))}
					{filteredJobs.length === 0 && (
						<p className="text-gray-500">{emptyText}</p>
					)}
				</div>

				<Pagination page={page} onPageChange={setPage} />
			</div>
		</>
	);
}
