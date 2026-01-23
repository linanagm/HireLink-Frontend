import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Chip from "../../../components/UI/Chip";
import { getJobs } from "../../../services/talent.service";

const PAGE_SIZE = 10;

/**
 * JobList component
 *
 * This component renders a list of job postings based on the selected tab.
 * If the "recent" tab is selected, it renders a list of the most recent job postings.
 * If the "best" tab is selected, it renders a list of job postings that best match the user's skills and interests.
 *
 */
export default function JobList() {
	const [tab, setTab] = useState("recent"); // "recent" | "best"
	const [page, setPage] = useState(1);

	const skip = (page - 1) * PAGE_SIZE;

	const queryParams = useMemo(
		() => ({ limit: PAGE_SIZE, skip, mode: "recent" }),
		[skip],
	);

	const {
		data: response,
		isLoading,
		isError,
		error,
		isFetching,
	} = useQuery({
		queryKey: ["jobs", queryParams],
		queryFn: () => getJobs(queryParams),
		staleTime: 60 * 1000,
		keepPreviousData: true,
	});

	const jobs = response?.data?.data ?? response?.data ?? [];
	const safeJobs = Array.isArray(jobs) ? jobs : [];

	// dummy data
	const userSkills = ["SEO", "SQL", "Figma"];
	const userInterests = ["Marketing", "Design"];

	const bestMatches = useMemo(() => {
		const scored = safeJobs.map((job) => {
			let score = 0;

			const title = (job.title ?? "").toLowerCase();
			const desc = (job.description ?? job.desc ?? "").toLowerCase();
			const responsibilities = Array.isArray(job.responsibilities)
				? job.responsibilities.join(" ").toLowerCase()
				: "";

			// skills matching (title/desc/responsibilities)
			userSkills.forEach((skill) => {
				const s = skill.toLowerCase();
				if (title.includes(s)) score += 2;
				if (desc.includes(s)) score += 1;
				if (responsibilities.includes(s)) score += 1;
			});

			// interests matching (title)
			userInterests.forEach((interest) => {
				const i = interest.toLowerCase();
				if (title.includes(i)) score += 2;
			});

			return { ...job, score };
		});

		return scored.filter((j) => j.score > 0).sort((a, b) => b.score - a.score);
	}, [safeJobs]);

	const displayedJobs = tab === "recent" ? safeJobs : bestMatches;

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
				{/* BANNER */}
				<div
					className="w-full h-96 bg-cover bg-center"
					style={{ backgroundImage: "url(/images/talent-findjob.svg)" }}
				/>

				{/* TABS */}
				<div className="mt-6 px-10 flex items-center gap-6 border-b pb-2 text-gray-600">
					<button
						type="button"
						className={`pb-1 ${
							tab === "recent"
								? "text-purple-600 border-b-2 border-purple-600"
								: ""
						}`}
						onClick={() => {
							setTab("recent");
							setPage(1);
						}}
					>
						Most Recent
					</button>

					<button
						type="button"
						className={`pb-1 ${
							tab === "best"
								? "text-purple-600 border-b-2 border-purple-600"
								: ""
						}`}
						onClick={() => {
							setTab("best");
							setPage(1);
						}}
					>
						Best Matches
					</button>

					{isFetching && (
						<span className="ml-auto text-sm text-gray-400">Refreshing...</span>
					)}
				</div>

				{/* JOB LIST */}
				<div className="px-10 mt-6 space-y-6 ">
					{displayedJobs.map((job) => (
						<Link key={job.id} to={`/talent/jobs/${job.id}`}>
							<div className="bg-white p-6 mb-6 rounded-l shadow-sm border hover:shadow-md cursor-pointer ">
								<div className="flex flex-wrap gap-2 mb-4">
									<Chip>
										{job.hoursPerWeek ? `${job.hoursPerWeek} hrs/week` : null}
									</Chip>
									<Chip>{job.salary}</Chip>
									<Chip>{job.location}</Chip>
									<Chip>{job.experienceLevel}</Chip>
									{tab === "best" ? <Chip>{`Match: ${job.score}`}</Chip> : null}
								</div>

								<h2 className="text-black font-semibold mb-2 text-center">
									{job.title || "Untitled job"}
								</h2>

								<p className="text-gray-600 mb-2">
									{job.description || job.desc || ""}
								</p>

								{/*  tags  */}
								{Array.isArray(job.tags) && job.tags.length > 0 ? (
									<div className="flex flex-wrap gap-2 mt-3">
										{job.tags.map((tag, i) => (
											<span
												key={`${job.id}-tag-${i}`}
												className="px-3 py-1 text-black bg-gray-100 rounded-full"
											>
												{tag}
											</span>
										))}
									</div>
								) : null}
							</div>
						</Link>
					))}

					{tab === "best" && displayedJobs.length === 0 && (
						<p className="text-gray-500">No matching jobs found.</p>
					)}

					{tab === "recent" && safeJobs.length === 0 && (
						<p className="text-gray-500">No jobs available right now.</p>
					)}
				</div>

				{/* PAGINATION */}
				<div className="flex justify-center gap-3 mt-8 mb-10">
					{[1, 2, 3, 4, 5].map((num) => (
						<button
							type="button"
							key={num}
							onClick={() => setPage(num)}
							className={`w-8 h-8 flex items-center justify-center rounded-full ${
								num === page ? "bg-purple-600 text-white" : "bg-white border"
							}`}
						>
							{num}
						</button>
					))}
				</div>
			</div>
		</>
	);
}
