import { Link } from "react-router-dom";
import { prettyEnum } from "../../../../../utils/formatter";

/**
 * JobCard
 * Dedicated component keeps JobList clean and readable.
 */
export default function JobCard({ job, showMatch }) {
	return (
		<Link to={`/talent/jobs/${job.id}`}>
			<div className="bg-white p-6 mb-6 rounded-l shadow-sm border hover:shadow-md cursor-pointer">
				<div className="flex flex-wrap gap-2 mb-4 p-2">
					{/* Only render chips when data exists (avoid empty Chip) */}
					{job.hoursPerWeek ? (
						<div className="text-slate-700 text-sm  text-opacity-80 font-sans">
							{`${job.hoursPerWeek} hrs/week`} .
						</div>
					) : null}

					{job.salary != null ? (
						<div className="text-slate-700 text-sm  text-opacity-80 font-sans">
							{`${job.salary}/month`} .
						</div>
					) : null}
					{job.location ? (
						<div className="text-slate-700 text-sm  text-opacity-80 font-sans">
							{prettyEnum(job.location)} . {prettyEnum(job.jobType)} .
						</div>
					) : null}
					{job.experienceLevel ? (
						<div className="text-slate-700 text-sm  text-opacity-80 font-sans">
							{`${prettyEnum(job.experienceLevel)} Level`}
						</div>
					) : null}

					{/* If backend returns a match score, show it only on Best Matches tab -> future work*/}
					{showMatch && job.matchScore != null ? (
						<div className="text-slate-700 text-sm  text-opacity-80 font-sans">{`Match: ${job.matchScore}`}</div>
					) : null}
				</div>

				<h2 className="text-black font-semibold mb-2 text-3xl font-sans text-opacity-75 text-center">
					{job.title || "Untitled job"}
				</h2>

				<div className="text-gray-600  p-2">
					{job.description || job.desc || ""}
				</div>

				{/* tags */}
				{Array.isArray(job.requiredSkills) && job.requiredSkills.length > 0 ? (
					<div className="flex flex-wrap gap-2 mt-3">
						{job.requiredSkills.map((skill, i) => (
							<span
								key={`${job.id}-tag-${i}`}
								className="px-3 py-2 text-black text-opacity-80 bg-gray-100 rounded-full"
							>
								{skill.name}
							</span>
						))}
					</div>
				) : null}
			</div>
		</Link>
	);
}
