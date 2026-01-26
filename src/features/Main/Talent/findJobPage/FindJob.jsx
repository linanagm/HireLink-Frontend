import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { JOBS_MODES } from "../../../../constants/apiPaths";
import JobCard from "./components/JobCard";
import Pagination from "./components/Pagination";
import TabButton from "./components/TabButton";
import useJobs from "./hooks/queries/useJobsMode";

const PAGE_SIZE = 10;
export const JOB_MODES = {
	RECENT: "recent",
	RECOMMENDED: "recommended",
};

export function normalizeJobsMode(value) {
	return value === JOB_MODES.RECOMMENDED
		? JOB_MODES.RECOMMENDED
		: JOB_MODES.RECENT;
}

/**
 * Find Jobs (Talent)
 *
 * Goals:
 * - Tabs switch between backend modes (recent vs recommended/best matches).
 * - Keep code DRY: one query, one list renderer, no duplicated logic.
 * - Easy to read: explicit mapping + small helpers.
 */
export default function JobList() {
	const [searcParams, setSearchParams] = useSearchParams();

	// read initial tab from URL (default recent)
	const tabFromUrl = searcParams.get("tab");
	const initialTab =
		tabFromUrl === "recommended" || tabFromUrl === "recent"
			? tabFromUrl
			: "recent";

	// UI tab state (what the user sees)

	const [tab, setTab] = useState(initialTab);
	const [page, setPage] = useState(1);

	// keep URL in sync with tab state
	useEffect(() => {
		setSearchParams(
			(prev) => {
				const next = new URLSearchParams(prev);
				next.set("tab", tab);
				return next;
			},
			{ replace: true },
		); // replace عشان ما يكدّس history
	}, [tab, setSearchParams]);

	// Backend mode derived from tab.
	// Why: keep the UI labels independent from backend query values.
	//const mode = tab === "best" ? "recommended" : "recent";

	// Pagination values
	const skip = (page - 1) * PAGE_SIZE;

	/**
	 * Query params are memoized to avoid unnecessary renders
	 * and to keep React Query key stable between renders.
	 *
	 * Important: tab/mode is included, so switching tabs triggers a new request.
	 */
	const queryParams = useMemo(
		() => ({
			limit: PAGE_SIZE,
			skip,
			mode: tab, // <-- this is the only thing that changes between tabs
		}),
		[skip, tab],
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

	/**
	 * Normalize jobs response shape.
	 * Why: your backend/axios wrappers sometimes return data in different nesting:
	 * - response.data.data
	 * - response.data
	 */
	const jobs = useMemo(() => {
		const raw = response?.data?.data ?? response?.data ?? [];
		return Array.isArray(raw) ? raw : [];
	}, [response]);

	/**
	 * Single tab switch handler.
	 * Why: DRY and consistent behavior:
	 * - switch tab
	 * - reset pagination to first page
	 */
	const onChangeTab = useCallback((nextTab) => {
		setTab(nextTab);
		setPage(1);
	}, []);

	// ------- UI states -------
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

	// Empty states depend on tab (because expectation differs)
	const emptyText =
		tab === JOBS_MODES.RECOMMENDED
			? "Please, add your skills and languages."
			: "No jobs available right now.";

	return (
		<>
			<Helmet>
				<title>Find Jobs</title>
			</Helmet>

			<div className="bg-gray-50 min-h-screen">
				{/* BANNER */}
				<div
					className="w-full h-96 bg-cover bg-center"
					style={{ backgroundImage: "url(/images/talent-findjob.svg)" }}
				/>

				{/* TABS */}
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
						Recommended for you
					</TabButton>

					{/* isFetching can be true when switching tabs or changing page */}
					{isFetching && (
						<span className="ml-auto text-sm text-gray-400">Refreshing...</span>
					)}
				</div>

				{/* JOB LIST */}
				<div className="px-10 mt-6 space-y-6">
					{jobs.map((job) => (
						<JobCard
							key={job.id}
							job={job}
							showMatch={tab === JOB_MODES.RECOMMENDED}
						/>
					))}

					{jobs.length === 0 && <p className="text-gray-500">{emptyText}</p>}
				</div>

				{/* PAGINATION */}
				<Pagination page={page} onPageChange={setPage} />
			</div>
		</>
	);
}
