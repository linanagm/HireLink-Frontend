import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import InfoItem from "../../../components/UI/InfoItem";
import Loading from "../../../components/UI/Loading";
import { getJobById } from "../../../services/talent.service";
import { prettyEnum } from "../../../utils/helpers";

export default function JobDetails() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["job", id],
		queryFn: () => getJobById(id),
		enabled: !!id,
	});

	// عدلي حسب API عندكم
	const job = data?.data?.data ?? data?.data ?? null;
	console.log("job from job proposal: \n", job);

	if (isLoading) return <Loading />;
	if (isError)
		return <div className="px-10 py-10 text-red-600">{error?.message}</div>;
	if (!job) return <div className="px-10 py-10">Job not found</div>;

	const paymentType = job.salary ? "Salary" : "Hourly"; // placeholder منطقي
	const budget =
		job.salary ?? (job.hoursPerWeek ? `${job.hoursPerWeek} hrs/week` : null);
	const workArrangement = prettyEnum(job.jobType);
	const experienceLevel = prettyEnum(job.experienceLevel);
	const location = job.location;

	const responsibilities = Array.isArray(job.responsibilities)
		? job.responsibilities
		: [];
	const skills = Array.isArray(job.skills)
		? job.skills
		: Array.isArray(job.tags)
			? job.tags
			: [];

	return (
		<div className="px-10 py-10">
			{/* Back */}
			<button
				type="button"
				onClick={() => navigate(-1)}
				className="text-purple-600 hover:underline mb-6"
			>
				← Back to Jobs
			</button>

			{/* MAIN CARD */}
			<div className="bg-white mx-auto max-w-4xl p-10 rounded-2xl shadow-sm border">
				{/* TITLE */}
				<div className="flex items-start justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold mb-4">{job.title}</h1>
						<p className="text-gray-600 leading-relaxed mb-8">
							{job.description}
						</p>
					</div>

					{/* Heart placeholder */}
					<button type="button" className="text-gray-400 hover:text-purple-600">
						♡
					</button>
				</div>

				{/* INFO ROW */}
				<div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
					<InfoItem value={paymentType} label="Payment Type" />
					<InfoItem value={budget} label="Budget" />
					<InfoItem value={workArrangement} label="Work Arrangement" />
					<InfoItem value={experienceLevel} label="Experience Level" />
					<InfoItem value={location} label="Location" />
				</div>

				{/* RESPONSIBILITIES */}
				<h2 className="text-xl font-semibold mb-2">Responsibilities:</h2>
				{responsibilities.length > 0 ? (
					<ul className="list-disc ml-6 space-y-1 mb-8 text-gray-700">
						{responsibilities.map((item, id) => (
							<li key={id}>{item}</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500 mb-8">No responsibilities listed.</p>
				)}

				{/* SKILLS */}
				<h2 className="text-xl font-semibold mb-2">Skills</h2>
				{skills.length > 0 ? (
					<div className="flex flex-wrap gap-2 mb-8">
						{skills.map((skill, id) => (
							<span
								key={id}
								className="px-3 py-1 text-sm bg-gray-100 rounded-full"
							>
								{skill}
							</span>
						))}
					</div>
				) : (
					<p className="text-gray-500 mb-8">No skills listed.</p>
				)}

				<div className="text-center">
					<Link
						to={`/talent/jobs/${id}/apply`}
						className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 duration-200 inline-block"
					>
						Apply Now
					</Link>
				</div>
			</div>
		</div>
	);
}
