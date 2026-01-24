/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FieldError from "../../../components/UI/FieldError";
import InfoItem from "../../../components/UI/InfoItem";
import { applyToJob, getJobById } from "../../../services/talent.service";
import { proposalSchema } from "../../../utils/validation/jobs.validators";

/**
 * JobProposal component
 *
 * This component is used to display a job proposal and its details.
 * It also allows the user to submit a proposal for the job.
 *
 * The component receives the job id as a parameter and fetches the job data from the server.
 * It then displays the job details and allows the user to edit the proposal terms.
 *
 * The user can then submit the proposal and the component will handle the submission process.
 *
 * @param {string} id - The id of the job.
 * @returns {JSX.Element} - The JSX element for the job proposal component.
 */
export default function JobProposal() {
	const { id } = useParams();

	const navigate = useNavigate();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["job", id],
		queryFn: () => getJobById(id),
		enabled: !!id,
	});

	const job = data?.data?.data ?? data?.data ?? null;

	const paymentType = useMemo(() => (job?.salary ? "Salary" : "Hourly"), [job]);

	const budget = useMemo(() => job?.salary ?? null, [job]);
	const handleApply = async (values) => {
		const payload = {
			coverLetter: values.coverLetter,
			resumeUrl: values.resumeUrl,
		};

		const res = await applyToJob(id, payload);
		console.log("apply payload:", { id, payload, res });

		if (res?.ok) navigate(`/talent/applications`);
	};

	const formik = useFormik({
		initialValues: {
			duration: "",
			hourlyRate: "",
			coverLetter: "",
			resumeUrl: "",
		},
		onSubmit: handleApply,
		validationSchema: proposalSchema,
	});

	if (isLoading) return <div className="px-10 py-10">Loading...</div>;
	if (isError)
		return <div className="px-10 py-10 text-red-600">{error?.message}</div>;
	if (!job) return <div className="px-10 py-10">Job not found</div>;

	return (
		<div className="px-10 py-10">
			{/* JOB DESCRIPTION (read-only) */}
			<div className="bg-white mx-auto max-w-4xl p-10 rounded-2xl shadow-sm border">
				<h2 className="text-2xl font-bold mb-6">Job Description</h2>

				<h3 className="text-xl font-semibold mb-3">{job.title}</h3>
				<p className="text-gray-600 leading-relaxed mb-8">{job.description}</p>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
					<InfoItem value={paymentType} label="Payment Type" />
					<InfoItem value={budget} label="Budget" />
					<InfoItem value={job.experienceLevel} label="Experience Level" />
					<InfoItem value={job.location} label="Location" />
				</div>

				<h4 className="text-lg font-semibold mb-2">Responsibilities:</h4>
				{Array.isArray(job.responsibilities) &&
				job.responsibilities.length > 0 ? (
					<ul className="list-disc ml-6 space-y-1 mb-8 text-gray-700">
						{job.responsibilities.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500 mb-8">No responsibilities listed.</p>
				)}

				{Array.isArray(job.skills) && job.skills.length > 0 ? (
					<>
						<h4 className="text-lg font-semibold mb-2">Skills</h4>
						<div className="flex flex-wrap gap-2">
							{job.skills.map((skill, i) => (
								<span
									key={i}
									className="px-3 py-1 text-sm bg-gray-100 rounded-full"
								>
									{skill}
								</span>
							))}
						</div>
					</>
				) : null}
			</div>

			{/* TERMS (editable) */}
			<form
				onSubmit={formik.handleSubmit}
				className="bg-white mx-auto max-w-4xl p-10 rounded-2xl shadow-sm border mt-8"
			>
				<h2 className="text-2xl font-bold mb-6">Terms</h2>

				<div className="space-y-6">
					<div>
						<label
							htmlFor="duration"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							How long will this project take?
						</label>
						<select
							id="duration"
							name="duration"
							className="w-full max-w-sm border rounded-lg px-3 py-2"
							value={formik.values.duration}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						>
							<option value="">Select Duration</option>
							<option value="1_WEEK">1 week</option>
							<option value="2_WEEKS">2 weeks</option>
							<option value="1_MONTH">1 month</option>
							<option value="3_MONTHS">3 months</option>
						</select>
						<FieldError
							touched={formik.touched.duration}
							error={formik.errors.duration}
						/>
					</div>

					<div>
						<label
							htmlFor="hourlyRate"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Hourly rate
						</label>
						<input
							id="hourlyRate"
							name="hourlyRate"
							className="w-full max-w-sm border rounded-lg px-3 py-2"
							placeholder="Hourly rate/hr"
							value={formik.values.hourlyRate}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<FieldError
							touched={formik.touched.hourlyRate}
							error={formik.errors.hourlyRate}
						/>
					</div>

					<div>
						<label
							htmlFor="coverLetter"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Cover Letter
						</label>
						<textarea
							id="coverLetter"
							name="coverLetter"
							className="w-full border rounded-lg px-3 py-2 min-h-[140px]"
							value={formik.values.coverLetter}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<FieldError
							touched={formik.touched.coverLetter}
							error={formik.errors.coverLetter}
						/>
					</div>

					<div>
						<label
							htmlFor="resumeUrl"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Resume Url
						</label>
						<textarea
							id="resumeUrl"
							name="resumeUrl"
							className="w-full border rounded-lg px-3 py-2 min-h-[110px]"
							value={formik.values.resumeUrl}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<FieldError
							touched={formik.touched.resumeUrl}
							error={formik.errors.resumeUrl}
						/>
					</div>
				</div>

				<div className="flex gap-4 mt-10">
					<button
						type="submit"
						className="px-8 py-3 bg-fuchsia-800 text-white rounded-xl hover:bg-fuchsia-600 duration-500"
					>
						Submit Proposal
					</button>

					<button
						type="button"
						onClick={() => navigate(-1)}
						className="px-8 py-3 border rounded-xl text-gray-700 border-fuchsia-600 hover:bg-fuchsia-700 hover:text-white  duration-200"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}
