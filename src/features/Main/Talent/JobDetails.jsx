import React from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../../components/Main/Footer"; // تأكدي المسار

export default function JobDetail() {
	const { id } = useParams();

	// بيانات مؤقتة لحد ما توصلي ببيانات الـ Backend
	const jobs = [
		{
			id: "0",
			title: "UI/UX Designer for Mobile App",
			desc: "Looking for a creative UI/UX Designer to enhance user experience for our mobile application. Must possess strong design skills and experience with prototyping tools.",
			payment: "Hourly",
			budget: "$50/hr",
			workType: "Hybrid",
			level: "Intermediate",
			location: "Addis Ababa",
			responsibilities: [
				"Create wireframes, user flows, and high-fidelity prototypes",
				"Design intuitive interfaces that align with brand and user goals",
				"Collaborate closely with developers, PMs, and stakeholders",
				"Conduct user research and translate insights into actionable design decisions",
				"Ensure responsive and accessible mobile design",
			],
			skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
		},
		{
			id: "1",
			title: "Data Analyst for Marketing Team",
			desc: "We need a Data Analyst to help drive insights for marketing efforts and improve business decisions.",
			payment: "Monthly",
			budget: "$3000/month",
			workType: "Remote",
			level: "Senior",
			location: "London",
			responsibilities: [
				"Analyze marketing data and generate insights",
				"Create dashboards and reports for management",
				"Collaborate with marketing team to identify opportunities",
				"Perform data cleaning and validation",
				"Provide recommendations based on data analysis",
			],
			skills: ["SQL", "Tableau", "Data Mining", "Predictive Analytics"],
		},
	];

	const job = jobs.find((job) => job.id === id) || jobs[0]; // مؤقت لحد ما توصلي API

	return (
		<div className="bg-gray-50 min-h-screen flex flex-col">
			{/* المحتوى الرئيسي */}
			<div className="flex-grow px-10 pt-10">
				{/* BACK BUTTON */}
				<div className="mb-4">
					<Link
						to="/talent/findjob"
						className="text-purple-600 hover:underline"
					>
						← Back to Jobs
					</Link>
				</div>

				{/* MAIN CARD */}
				<div className="bg-white mx-auto max-w-4xl p-10 rounded-2xl shadow-sm border">
					{/* TITLE */}
					<h1 className="text-3xl font-bold mb-4">{job.title}</h1>
					<p className="text-gray-600 leading-relaxed mb-8">{job.desc}</p>

					{/* INFO ROW */}
					<div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
						<div>
							<p className="font-semibold">{job.payment}</p>
							<p className="text-gray-500 text-sm">Payment Type</p>
						</div>

						<div>
							<p className="font-semibold">{job.budget}</p>
							<p className="text-gray-500 text-sm">Budget</p>
						</div>

						<div>
							<p className="font-semibold">{job.workType}</p>
							<p className="text-gray-500 text-sm">Work Arrangement</p>
						</div>

						<div>
							<p className="font-semibold">{job.level}</p>
							<p className="text-gray-500 text-sm">Experience Level</p>
						</div>

						<div>
							<p className="font-semibold">{job.location}</p>
							<p className="text-gray-500 text-sm">Location</p>
						</div>
					</div>

					{/* RESPONSIBILITIES */}
					<h2 className="text-xl font-semibold mb-2">Responsibilities:</h2>
					<ul className="list-disc ml-6 space-y-1 mb-8 text-gray-700">
						{job.responsibilities.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>

					{/* SKILLS */}
					<h2 className="text-xl font-semibold mb-2">Skills</h2>
					<div className="flex flex-wrap gap-2 mb-8">
						{job.skills.map((skill, i) => (
							<span
								key={i}
								className="px-3 py-1 text-sm bg-gray-100 rounded-full"
							>
								{skill}
							</span>
						))}
					</div>

					<div className="text-center">
						<Link
							to={`/talent/jobs/${job.id}/proposal`}
							state={job} // ← هنا بنبعت كل بيانات الوظيفة
							className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 duration-200 inline-block"
						>
							Apply Now
						</Link>
					</div>
				</div>
			</div>

			{/* Footer */}
		</div>
	);
}
