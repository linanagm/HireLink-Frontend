import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function JobList() {
	const [tab, setTab] = useState("recent"); // "recent" أو "best"

	const jobs = [
		{
			id: "0",
			title: "UI/UX Designer for Mobile App",
			desc: "Looking for a creative UI/UX Designer to enhance user experience for our mobile application.",
			tags: ["Figma", "User Research", "Wireframing", "Prototyping"],
			location: "Addis Ababa",
		},
		{
			id: "1",
			title: "Data Analyst for Marketing Team",
			desc: "We need a Data Analyst to help drive insights for marketing efforts.",
			tags: ["SQL", "Tableau", "Data Mining", "Predictive Analytics"],
			location: "London",
		},
		{
			id: "2",
			title: "SEO Specialist for Website Optimization",
			desc: "An experienced SEO Specialist is required to optimize our website.",
			tags: ["SEO", "Backlinking", "Analytics"],
			location: "New York",
		},
		{
			id: "3",
			title: "Content Writer for Blog Development",
			desc: "Looking for a talented Content Writer to create engaging blog posts.",
			tags: ["Writing", "Blogging", "Content Strategy"],
			location: "Paris",
		},
	];

	const userSkills = ["SEO", "SQL", "Figma"]; // سكيلز المستخدم
	const userInterests = ["Marketing", "Design"]; // اهتمامات المستخدم

	// حساب score لكل وظيفة
	const scoredJobs = jobs.map((job) => {
		let score = 0;

		// حساب نقاط السكيلز
		job.tags.forEach((tag) => {
			if (userSkills.includes(tag)) score += 1;
		});

		// حساب نقاط الاهتمامات من عنوان الوظيفة
		userInterests.forEach((interest) => {
			if (job.title.toLowerCase().includes(interest.toLowerCase())) score += 1;
		});

		return { ...job, score };
	});

	// فلترة وترتيب Best Matches
	const bestMatches = scoredJobs
		.filter((job) => job.score > 0)
		.sort((a, b) => b.score - a.score);

	const displayedJobs = tab === "recent" ? jobs : bestMatches;

	return (
		<div className="bg-gray-50 min-h-screen">
			{/* BANNER */}
			<div
				className="w-full h-96 bg-cover bg-center"
				style={{ backgroundImage: "url(/images/talent-findjob.svg)" }}
			></div>

			{/* TABS */}
			<div className="mt-6 px-10 flex gap-6 border-b pb-2 text-gray-600">
				<button
					type="button"
					className={`pb-1 ${tab === "recent" ? "text-purple-600 border-b-2 border-purple-600" : ""}`}
					onClick={() => setTab("recent")}
				>
					Most Recent
				</button>
				<button
					type="button"
					className={`pb-1 ${tab === "best" ? "text-purple-600 border-b-2 border-purple-600" : ""}`}
					onClick={() => setTab("best")}
				>
					Best Matches
				</button>
			</div>

			{/* JOB LIST */}
			<div className="px-10 mt-6 space-y-6">
				{displayedJobs.map((job) => (
					<Link key={job.id} to={`/jobs/${job.id}`}>
						<div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md cursor-pointer">
							<h2 className="text-black font-semibold mb-2">{job.title}</h2>
							<p className="text-gray-600 mb-4">{job.desc}</p>
							<div className="flex flex-wrap gap-2 mb-4">
								{job.tags.map((tag, i) => (
									<span
										key={i}
										className="px-3 py-1 text-black bg-gray-100 rounded-full"
									>
										{tag}
									</span>
								))}
							</div>
							<p className="text-gray-500 text-sm">{job.location}</p>
						</div>
					</Link>
				))}
				{displayedJobs.length === 0 && tab === "best" && (
					<p className="text-gray-500">No matching jobs found.</p>
				)}
			</div>

			{/* PAGINATION */}
			<div className="flex justify-center gap-3 mt-8 mb-10">
				{[1, 2, 3, 4, 5].map((num) => (
					<button
						type="button"
						key={num}
						className={`w-8 h-8 flex items-center justify-center rounded-full ${num === 1 ? "bg-purple-600 text-white" : "bg-white border"}`}
					>
						{num}
					</button>
				))}
			</div>
		</div>
	);
}
