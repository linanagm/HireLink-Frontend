// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export default function App() {
// 	const [statusFilter, setStatusFilter] = useState("");
// 	const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

// 	const statusOptions = [
// 		"Under Review",
// 		"Interview Scheduled",
// 		"Pending",
// 		"Accepted",
// 		"Rejected",
// 	];

// 	const filteredApplications = statusFilter
// 		? applicationsData.filter((job) => job.status === statusFilter)
// 		: applicationsData;

// 	return (
// 		<div className="min-h-screen bg-gray-100">
// 			{/* Filters */}
// 			<div className="px-10 mt-6 flex gap-4 relative">
// 				<div className="relative">
// 					<button
// 						type="button"
// 						className="bg-white border px-4 py-2 rounded-md whitespace-nowrap"
// 						onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
// 					>
// 						{statusFilter || "Status"}
// 					</button>

// 					{statusDropdownOpen && (
// 						<div className="absolute mt-1 bg-white border rounded-md shadow-lg z-10">
// 							{statusOptions.map((status, idx) => (
// 								<div
// 									key={idx}
// 									className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
// 									onClick={() => {
// 										setStatusFilter(status);
// 										setStatusDropdownOpen(false);
// 									}}
// 								>
// 									{status}
// 								</div>
// 							))}
// 							<div
// 								className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 whitespace-nowrap"
// 								onClick={() => {
// 									setStatusFilter("");
// 									setStatusDropdownOpen(false);
// 								}}
// 							>
// 								Clear
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			</div>

// 			{/* Applications List */}
// 			<div className="px-10 mt-6 space-y-5">
// 				{filteredApplications.map((job, idx) => (
// 					<div
// 						key={idx}
// 						className="bg-purple-100 rounded-xl p-6 flex justify-between items-start"
// 					>
// 						<div>
// 							<h2 className="font-semibold text-lg">{job.title}</h2>
// 							<p className="text-gray-600">{job.company}</p>
// 							<p className="text-gray-500">{job.date}</p>

// 							<span
// 								className={`mt-2 inline-block font-semibold ${job.statusColor}`}
// 							>
// 								● {job.status}
// 							</span>
// 						</div>

// 						<Link
// 							to={`/jobs/${idx}`}
// 							className="bg-purple-600 text-white px-4 py-2 rounded-lg inline-block"
// 						>
// 							View Details
// 						</Link>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// }

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import FieldError from "../../../components/UI/FieldError";
import Loading from "../../../components/UI/Loading";
import { getMyApplications } from "../../../services/talent.service";
export default function MyApplications() {
	const [statusFilter, setStatusFilter] = useState("");
	const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["my-applications"],
		queryFn: getMyApplications,
	});

	const applications = data?.data ?? [];
	console.log("data: \n", applications);

	const statusOptions = [
		"PENDING",
		"UNDER_REVIEW",
		"INTERVIEW",
		"ACCEPTED",
		"REJECTED",
	];

	const filteredApplications = useMemo(() => {
		return statusFilter
			? applications.filter((app) => app.status === statusFilter)
			: applications;
	}, [applications, statusFilter]);

	if (isLoading) return <Loading />;

	if (isError) return <FieldError error={error?.message} />;

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Filters */}
			<div className="px-10 mt-6 flex gap-4 relative">
				<div className="relative">
					<button
						type="button"
						className="bg-white border px-4 py-2 rounded-md"
						onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
					>
						{statusFilter || "Status"}
					</button>

					{statusDropdownOpen && (
						<div className="absolute mt-1 bg-white border rounded-md shadow-lg z-10">
							{statusOptions.map((status) => (
								<button
									type="button"
									key={status}
									className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
									onClick={() => {
										setStatusFilter(status);
										setStatusDropdownOpen(false);
									}}
								>
									{status.replace("_", " ")}
								</button>
							))}
							<button
								type="button"
								className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
								onClick={() => {
									setStatusFilter("");
									setStatusDropdownOpen(false);
								}}
							>
								Clear
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Applications List */}
			<div className="px-10 mt-6 space-y-5">
				{filteredApplications.map((app) => (
					<div
						key={app.id}
						className="bg-purple-100 rounded-xl p-6 flex justify-between items-start"
					>
						<div>
							<h2 className="font-semibold text-lg">{app.job.title}</h2>
							<p className="text-gray-600">{app.job.employer?.companyName}</p>
							<p className="text-gray-500">
								{new Date(app.createdAt).toLocaleDateString()}
							</p>

							<span className="mt-2 inline-block font-semibold">
								● {app.status.replace("_", " ")}
							</span>
						</div>

						<Link
							to={`/talent/jobs/${app.job.id}`}
							className="bg-purple-600 text-white px-4 py-2 rounded-lg"
						>
							View Job
						</Link>
					</div>
				))}

				{filteredApplications.length === 0 && (
					<p className="text-gray-500">No applications found.</p>
				)}
			</div>
		</div>
	);
}
