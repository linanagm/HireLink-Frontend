// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";

// export default function JobProposal() {
// 	const location = useLocation();
// 	const job = location.state || {}; // البيانات المرسلة من الصفحة السابقة

// 	// ===== FORM STATES =====
// 	const [duration, setDuration] = useState("");
// 	const [hourlyRate, setHourlyRate] = useState(job?.hourlyRate || "");
// 	const [coverLetter, setCoverLetter] = useState("");
// 	const [attachmentName, setAttachmentName] = useState("");
// 	const [certificateName, setCertificateName] = useState("");

// 	// ===== HANDLE CANCEL (RESET FORM) =====
// 	const handleCancel = () => {
// 		setDuration("");
// 		setHourlyRate(job?.hourlyRate || "");
// 		setCoverLetter("");
// 		setAttachmentName("");
// 		setCertificateName("");
// 	};

// 	// ===== HANDLE FILE CHANGE =====
// 	const handleAttachmentChange = (e) => {
// 		if (e.target.files.length > 0) setAttachmentName(e.target.files[0].name);
// 		else setAttachmentName("");
// 	};

// 	const handleCertificateChange = (e) => {
// 		if (e.target.files.length > 0) setCertificateName(e.target.files[0].name);
// 		else setCertificateName("");
// 	};

// 	return (
// 		<div className="p-10 max-w-4xl mx-auto">
// 			{/* JOB DESCRIPTION BOX */}
// 			<div className="bg-white p-8 rounded-xl shadow-sm border mb-10">
// 				<h2 className="text-2xl font-bold mb-4">{job?.title || "Job Title"}</h2>
// 				<p className="text-gray-600 mb-6">
// 					{job?.description || "Job Description"}
// 				</p>

// 				<div className="grid grid-cols-4 gap-4 text-center mb-6">
// 					<div>
// 						<p className="font-semibold">Hourly</p>
// 						<p className="text-gray-500 text-sm">Payment Type</p>
// 					</div>
// 					<div>
// 						<p className="font-semibold">{job?.hourlyRate || "$0/hr"}</p>
// 						<p className="text-gray-500 text-sm">Budget</p>
// 					</div>
// 					<div>
// 						<p className="font-semibold">{job?.level || "Level"}</p>
// 						<p className="text-gray-500 text-sm">Experience Level</p>
// 					</div>
// 					<div>
// 						<p className="font-semibold">{job?.location || "Location"}</p>
// 						<p className="text-gray-500 text-sm">Location</p>
// 					</div>
// 				</div>

// 				{/* Responsibilities */}
// 				{job?.responsibilities && (
// 					<>
// 						<h4 className="font-semibold text-lg mb-2">Responsibilities:</h4>
// 						<ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
// 							{job.responsibilities.map((item, index) => (
// 								<li key={index}>{item}</li>
// 							))}
// 						</ul>
// 					</>
// 				)}

// 				{/* Skills */}
// 				{job?.skills && (
// 					<>
// 						<h4 className="font-semibold mb-2">Skills</h4>
// 						<div className="flex flex-wrap gap-2">
// 							{job.skills.map((skill, index) => (
// 								<span
// 									key={index}
// 									className="px-3 py-1 bg-gray-100 rounded-full text-sm"
// 								>
// 									{skill}
// 								</span>
// 							))}
// 						</div>
// 					</>
// 				)}
// 			</div>

// 			{/* TERMS / FORM BOX */}
// 			<div className="bg-white p-8 rounded-xl shadow-sm border">
// 				<h2 className="text-2xl font-bold mb-6">Terms & Proposal</h2>

// 				{/* Duration */}
// 				<label className="block mb-2 font-medium">
// 					How long will this project take?
// 				</label>
// 				<select
// 					value={duration}
// 					onChange={(e) => setDuration(e.target.value)}
// 					className="w-full border p-3 rounded-lg mb-6"
// 				>
// 					<option value="">Select Duration</option>
// 					<option value="1 week">1 week</option>
// 					<option value="1 month">1 month</option>
// 					<option value="3 months">3 months</option>
// 				</select>

// 				{/* Hourly Rate */}
// 				<label className="block mb-2 font-medium">Hourly Rate</label>
// 				<input
// 					type="number"
// 					value={hourlyRate}
// 					onChange={(e) => setHourlyRate(e.target.value)}
// 					placeholder="Hourly rate/hr"
// 					className="w-full border p-3 rounded-lg mb-6"
// 				/>

// 				{/* Cover Letter */}
// 				<label className="block mb-2 font-medium">Cover Letter</label>
// 				<textarea
// 					value={coverLetter}
// 					onChange={(e) => setCoverLetter(e.target.value)}
// 					rows="6"
// 					placeholder="Write your cover letter..."
// 					className="w-full border p-3 rounded-lg mb-6"
// 				></textarea>

// 				{/* Attach File */}
// 				<label className="block mb-2 font-medium">Attach File</label>
// 				<input type="file" onChange={handleAttachmentChange} className="mb-2" />
// 				{attachmentName && (
// 					<p className="text-gray-500 mb-4">Selected: {attachmentName}</p>
// 				)}

// 				{/* Certificate */}
// 				<label className="block mb-2 font-medium">Certificate</label>
// 				<input
// 					type="file"
// 					onChange={handleCertificateChange}
// 					className="mb-2"
// 				/>
// 				{certificateName && (
// 					<p className="text-gray-500 mb-4">Selected: {certificateName}</p>
// 				)}

// 				{/* BUTTONS */}
// 				<div className="flex gap-4 mt-8">
// 					<button
// 						type="button"
// 						className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
// 					>
// 						Submit Proposal
// 					</button>

// 					<button
// 						type="button"
// 						onClick={handleCancel}
// 						className="px-6 py-3 border border-red-500 text-red-500 rounded-xl hover:bg-red-50"
// 					>
// 						Cancel
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfoItem from "../../../components/UI/InfoItem";
import { getJobById } from "../../../services/talent.service";

// function InfoItem({ value, label }) {
//   if (!value) value = "Not specified";
//   return (
//     <div className="text-center">
//       <p className="font-semibold">{value}</p>
//       <p className="text-gray-500 text-sm">{label}</p>
//     </div>
//   );
// }

export default function JobProposal() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["job", id],
		queryFn: () => getJobById(id),
		enabled: !!id,
	});

	// عدلي حسب API عندكم
	const job = data?.data?.data ?? data?.data ?? null;

	// form state (later: replace with Formik/Yup)
	const [duration, setDuration] = useState("");
	const [hourlyRate, setHourlyRate] = useState("");
	const [coverLetter, setCoverLetter] = useState("");
	const [attachment, setAttachment] = useState(null);
	const [certificate, setCertificate] = useState(null);

	const paymentType = useMemo(() => (job?.salary ? "Salary" : "Hourly"), [job]);
	const budget = useMemo(() => job?.salary ?? null, [job]);

	if (isLoading) return <div className="px-10 py-10">Loading...</div>;
	if (isError)
		return <div className="px-10 py-10 text-red-600">{error?.message}</div>;
	if (!job) return <div className="px-10 py-10">Job not found</div>;

	const onSubmit = (e) => {
		e.preventDefault();

		// هنا هتبقي API call: create proposal/apply
		// مثال payload:
		// { jobId: id, duration, hourlyRate, coverLetter, attachment, certificate }

		console.log("SUBMIT PROPOSAL", {
			jobId: id,
			duration,
			hourlyRate,
			coverLetter,
			attachment,
			certificate,
		});

		// navigate somewhere after success
		// navigate("/talent/myapplications");
	};

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
				onSubmit={onSubmit}
				className="bg-white mx-auto max-w-4xl p-10 rounded-2xl shadow-sm border mt-8"
			>
				<h2 className="text-2xl font-bold mb-6">Terms</h2>

				<div className="space-y-6">
					<div>
						<label
							htmlFor=""
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							How long will this project take?
						</label>
						<select
							className="w-full max-w-sm border rounded-lg px-3 py-2"
							value={duration}
							onChange={(e) => setDuration(e.target.value)}
						>
							<option value="">Select Duration</option>
							<option value="1_WEEK">1 week</option>
							<option value="2_WEEKS">2 weeks</option>
							<option value="1_MONTH">1 month</option>
							<option value="3_MONTHS">3 months</option>
						</select>
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
							className="w-full max-w-sm border rounded-lg px-3 py-2"
							placeholder="Hourly rate/hr"
							value={hourlyRate}
							onChange={(e) => setHourlyRate(e.target.value)}
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
							className="w-full border rounded-lg px-3 py-2 min-h-[140px]"
							value={coverLetter}
							onChange={(e) => setCoverLetter(e.target.value)}
						/>
						<div className="mt-3">
							<label className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-slate-50 duration-300 text-sm">
								<span>
									<i class="fa-solid fa-link text-fuchsia-600"></i>
								</span>{" "}
								Attach File
								<input
									type="file"
									className="hidden"
									onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
								/>
							</label>
							{attachment ? (
								<p className="text-xs text-gray-500 mt-2">{attachment.name}</p>
							) : null}
						</div>
					</div>

					<div>
						<label
							htmlFor="Certificate"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Certificate
						</label>
						<textarea className="w-full border rounded-lg px-3 py-2 min-h-[110px]" />
						<div className="mt-3">
							<label className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-slate-50 duration-300 text-sm">
								<span>
									<i class="fa-solid fa-link text-fuchsia-600"></i>
								</span>{" "}
								Upload
								<input
									type="file"
									className="hidden"
									onChange={(e) => setCertificate(e.target.files?.[0] ?? null)}
								/>
							</label>
							{certificate ? (
								<p className="text-xs text-gray-500 mt-2">{certificate.name}</p>
							) : null}
						</div>
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
