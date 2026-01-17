import React, { useState } from "react";
import { Link } from "react-router-dom";

const applicationsData = [
	{
		title: "UI/UX Designer for Mobile App",
		company: "BoldTech Inc.",
		date: "March 15, 2025",
		status: "Under Review",
		statusColor: "text-blue-600",
	},
	{
		title: "Frontend Developer for E-commerce Site",
		company: "ShopSphere Ltd.",
		date: "April 10, 2025",
		status: "Interview Scheduled",
		statusColor: "text-purple-600",
	},
	{
		title: "Product Designer for SaaS Platform",
		company: "CloudNest Solutions",
		date: "March 25, 2025",
		status: "Pending",
		statusColor: "text-yellow-600",
	},
	{
		title: "Graphic Designer for Marketing Campaign",
		company: "Creative Minds Co.",
		date: "April 5, 2025",
		status: "Accepted",
		statusColor: "text-green-600",
	},
	{
		title: "Frontend Developer for Fintech App",
		company: "FinanceHub Inc.",
		date: "April 15, 2025",
		status: "Accepted",
		statusColor: "text-green-600",
	},
	{
		title: "Data Analyst for Retail Analytics",
		company: "Insightful Data Corp.",
		date: "March 30, 2025",
		status: "Rejected",
		statusColor: "text-red-600",
	},
];

export default function App() {
	const [statusFilter, setStatusFilter] = useState("");
	const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

	const statusOptions = [
		"Under Review",
		"Interview Scheduled",
		"Pending",
		"Accepted",
		"Rejected",
	];

	const filteredApplications = statusFilter
		? applicationsData.filter((job) => job.status === statusFilter)
		: applicationsData;

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Filters */}
			<div className="px-10 mt-6 flex gap-4 relative">
				<div className="relative">
					<button
						type="button"
						className="bg-white border px-4 py-2 rounded-md whitespace-nowrap"
						onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
					>
						{statusFilter || "Status"}
					</button>

					{statusDropdownOpen && (
						<div className="absolute mt-1 bg-white border rounded-md shadow-lg z-10">
							{statusOptions.map((status, idx) => (
								<div
									key={idx}
									className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
									onClick={() => {
										setStatusFilter(status);
										setStatusDropdownOpen(false);
									}}
								>
									{status}
								</div>
							))}
							<div
								className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 whitespace-nowrap"
								onClick={() => {
									setStatusFilter("");
									setStatusDropdownOpen(false);
								}}
							>
								Clear
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Applications List */}
			<div className="px-10 mt-6 space-y-5">
				{filteredApplications.map((job, idx) => (
					<div
						key={idx}
						className="bg-purple-100 rounded-xl p-6 flex justify-between items-start"
					>
						<div>
							<h2 className="font-semibold text-lg">{job.title}</h2>
							<p className="text-gray-600">{job.company}</p>
							<p className="text-gray-500">{job.date}</p>

							<span
								className={`mt-2 inline-block font-semibold ${job.statusColor}`}
							>
								● {job.status}
							</span>
						</div>

						<Link
							to={`/jobs/${idx}`}
							className="bg-purple-600 text-white px-4 py-2 rounded-lg inline-block"
						>
							View Details
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
