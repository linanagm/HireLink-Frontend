// import {
// 	Briefcase,
// 	ExternalLink,
// 	Layers,
// 	Pencil,
// 	Trash2,
// 	Users,
// } from "lucide-react";
// import { Helmet } from "react-helmet";
// import { Link, useNavigate } from "react-router-dom";
// import headerImage from "../../../assets/images/layouts/header.svg";
// import { useDeleteEmployerJob } from "../../../hooks/mutations/employer/useDeleteEmployerJob"; // أو نفس الملف لو حطيتيه هناك
// import { useEmployerDashboardAggregated } from "../../../hooks/queries/employer/useEmployerQueries";

// function StatCard({ icon: Icon, label, value }) {
// 	return (
// 		<div className="bg-white rounded-2xl border shadow-sm p-5 flex items-center gap-4">
// 			<div className="w-20 h-20 rounded-full bg-fuchsia-200 text-fuchsia-700 flex items-center justify-center">
// 				<Icon className="w-6 h-6 text-fuchsia-700" />
// 			</div>

// 			<div>
// 				<div className="text-2xl font-bold text-fuchsia-800 leading-none">
// 					{value ?? "—"}
// 				</div>
// 				<div className="text-sm text-fuchsia-800 font-sans font-thin mt-1">
// 					{label}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// function StatusPill({ status }) {
// 	const normalized = (status || "").toLowerCase();

// 	let cls = "bg-gray-100 text-gray-700";
// 	if (normalized === "open") cls = "bg-green-50 text-green-700";
// 	if (normalized === "draft") cls = "bg-gray-100 text-gray-700";
// 	if (normalized === "closed") cls = "bg-red-50 text-red-700";

// 	return (
// 		<span
// 			className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${cls}`}
// 		>
// 			{status || "—"}
// 		</span>
// 	);
// }

// function TableShell({ title, actionLabel, actionTo, children }) {
// 	return (
// 		<section className="bg-white rounded-2xl border shadow-sm">
// 			<div className="p-5 flex items-center justify-between">
// 				<h2 className="text-lg font-semibold text-gray-900">{title}</h2>

// 				{actionTo ? (
// 					<Link
// 						to={actionTo}
// 						className="text-sm font-medium text-purple-700 hover:text-purple-800 inline-flex items-center gap-2"
// 					>
// 						{actionLabel ?? "See more"} <span aria-hidden>→</span>
// 					</Link>
// 				) : null}
// 			</div>

// 			<div className="px-5 pb-5">{children}</div>
// 		</section>
// 	);
// }

// export default function EmployerDashboard() {
// 	const navigate = useNavigate();

// 	const { data, isLoading, isError, error } = useEmployerDashboardAggregated({
// 		summaryLimit: 5,
// 		recentLimit: 5,
// 	});

// 	const deleteJobMutation = useDeleteEmployerJob();

// 	const stats = data?.stats ?? {
// 		totalJobPosts: 0,
// 		activeJobs: 0,
// 		applicationsReceived: 0,
// 	};

// 	const jobs = data?.jobSummary ?? [];
// 	const applicants = data?.recentApplicants ?? [];

// 	if (isLoading) return <div className="p-6 text-gray-600">Loading...</div>;
// 	if (isError)
// 		return (
// 			<div className="p-6 text-red-600">
// 				{error?.message || "Something went wrong"}
// 			</div>
// 		);

// 	return (
// 		<>
// 			<Helmet>
// 				<title>Dashboard</title>
// 			</Helmet>

// 			<div className="min-h-screen  w-screen bg-gray-50 p-4 mx-auto">
// 				{/* 1) Stats & Header */}
// 				<div
// 					className="h-58 w-full bg-cover bg-center flex mx-auto mb-10"
// 					style={{
// 						backgroundImage: `url(${headerImage})`,
// 					}}
// 				>
// 					{/* stats */}
// 					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto py-10">
// 						<StatCard
// 							icon={Layers}
// 							label="Total Job Posts"
// 							value={stats.totalJobPosts}
// 						/>
// 						<StatCard
// 							icon={Briefcase}
// 							label="Active Jobs"
// 							value={stats.activeJobs}
// 						/>
// 						<StatCard
// 							icon={Users}
// 							label="Applications Received"
// 							value={stats.applicationsReceived}
// 						/>
// 					</div>
// 				</div>

// 				<div className="flex flex-col min-h-screen max-w-3/4 bg-gray-50 m-10 gap-4 ">
// 					{/* 3) Tables */}
// 					<TableShell
// 						title="Job Summary Table"
// 						actionLabel="See more"
// 						actionTo="/employer/jobs"
// 					>
// 						<div className="overflow-x-auto">
// 							<table className="w-full text-sm">
// 								<thead>
// 									<tr className="text-left text-gray-500 border-b">
// 										<th className="py-3 pr-3">
// 											<input type="checkbox" className="accent-purple-700" />
// 										</th>
// 										<th className="py-3 pr-3 font-medium">Job Title</th>
// 										<th className="py-3 pr-3 font-medium">Posted On</th>
// 										<th className="py-3 pr-3 font-medium">Status</th>
// 										<th className="py-3 pr-3 font-medium">Applicants</th>
// 										<th className="py-3 pr-3 font-medium text-right">
// 											Actions
// 										</th>
// 									</tr>
// 								</thead>

// 								<tbody>
// 									{jobs.length === 0 ? (
// 										<tr>
// 											<td
// 												colSpan={6}
// 												className="py-8 text-center text-gray-500"
// 											>
// 												No jobs yet.
// 											</td>
// 										</tr>
// 									) : (
// 										jobs.map((job) => (
// 											<tr key={job.id} className="border-b last:border-b-0">
// 												<td className="py-4 pr-3">
// 													<input
// 														type="checkbox"
// 														className="accent-purple-700"
// 													/>
// 												</td>

// 												<td className="py-4 pr-3 text-gray-900 font-medium">
// 													{job.title}
// 												</td>

// 												<td className="py-4 pr-3 text-gray-600">
// 													{job.postedOn
// 														? new Date(job.postedOn).toLocaleDateString()
// 														: "—"}
// 												</td>

// 												<td className="py-4 pr-3">
// 													<StatusPill status={job.status} />
// 												</td>

// 												<td className="py-4 pr-3 text-gray-700">
// 													{job.applicantsCount ?? 0}
// 												</td>

// 												<td className="py-4 pr-3">
// 													<div className="flex justify-end gap-3">
// 														{/* EDIT: يروح لصفحة edit */}
// 														<button
// 															type="button"
// 															className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
// 															title="Edit"
// 															onClick={() =>
// 																navigate(`/employer/jobs/${job.id}/edit`)
// 															}
// 														>
// 															<Pencil className="w-4 h-4" />
// 														</button>

// 														{/* DELETE: يضرب الباك */}
// 														<button
// 															type="button"
// 															className="text-red-600 hover:text-red-800 disabled:opacity-50"
// 															title="Delete"
// 															disabled={deleteJobMutation.isLoading}
// 															onClick={() => {
// 																const ok = window.confirm("Delete this job?");
// 																if (!ok) return;
// 																deleteJobMutation.mutate(job.id);
// 															}}
// 														>
// 															<Trash2 className="w-4 h-4" />
// 														</button>

// 														{/* VIEW */}
// 														<Link
// 															to={`/jobs/${job.id}`}
// 															className="text-gray-700 hover:text-gray-900"
// 															title="Open job"
// 														>
// 															<ExternalLink className="w-4 h-4" />
// 														</Link>
// 													</div>
// 												</td>
// 											</tr>
// 										))
// 									)}
// 								</tbody>
// 							</table>

// 							{deleteJobMutation.isError ? (
// 								<div className="mt-3 text-sm text-red-600">
// 									{deleteJobMutation.error?.message || "Failed to delete job"}
// 								</div>
// 							) : null}
// 						</div>
// 					</TableShell>

// 					{/* Recent Applicants */}
// 					<TableShell
// 						title="Recent Applicants"
// 						actionLabel="See more"
// 						actionTo="/employer/applicants"
// 					>
// 						{applicants.length === 0 ? (
// 							<div className="py-8 text-center text-gray-500 ">
// 								No applicants yet.
// 							</div>
// 						) : (
// 							<div className="overflow-x-auto">
// 								<table className="w-full text-sm">
// 									<thead>
// 										<tr className="text-left text-gray-500 border-b">
// 											<th className="py-3 pr-3 font-medium">Name</th>
// 											<th className="py-3 pr-3 font-medium">Job Applied</th>
// 											<th className="py-3 pr-3 font-medium">Date</th>
// 											<th className="py-3 pr-3 font-medium">Status</th>
// 											<th className="py-3 pr-3 font-medium text-right">
// 												Actions
// 											</th>
// 										</tr>
// 									</thead>
// 									<tbody>
// 										{applicants.map((a) => (
// 											<tr key={a.id} className="border-b last:border-b-0">
// 												<td className="py-4 pr-3 text-gray-900 font-medium">
// 													{a.talentName || a.name || "—"}
// 												</td>
// 												<td className="py-4 pr-3 text-gray-600">
// 													{a.jobTitle || "—"}
// 												</td>
// 												<td className="py-4 pr-3 text-gray-600">
// 													{a.createdAt
// 														? new Date(a.createdAt).toLocaleDateString()
// 														: "—"}
// 												</td>
// 												<td className="py-4 pr-3">
// 													<StatusPill status={a.status} />
// 												</td>
// 												<td className="py-4 pr-3">
// 													<div className="flex justify-end">
// 														<Link
// 															to={`/employer/applicants/${a.id}`}
// 															className="text-gray-700 hover:text-gray-900"
// 															title="Open application"
// 														>
// 															<ExternalLink className="w-4 h-4" />
// 														</Link>
// 													</div>
// 												</td>
// 											</tr>
// 										))}
// 									</tbody>
// 								</table>
// 							</div>
// 						)}
// 					</TableShell>
// 				</div>
// 			</div>

// 			{/* --------------------------------------- */}
// 		</>
// 	);
// }

import {
	Briefcase,
	ExternalLink,
	Layers,
	Pencil,
	Trash2,
	Users,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import headerImage from "../../../assets/images/layouts/header.svg";
import Modal from "../../../components/UI/Modal";
import { useDeleteEmployerJob } from "../../../hooks/mutations/employer/useDeleteEmployerJob";
import { useEmployerDashboard } from "../../../hooks/queries/employer/useEmployerDashboard";

const norm = (v) => String(v || "").toUpperCase();

function StatCard({ icon: Icon, label, value }) {
	return (
		<div className="bg-white rounded-2xl border shadow-sm p-5 flex items-center gap-4">
			<div className="w-14 h-14 rounded-2xl bg-fuchsia-100 text-fuchsia-700 flex items-center justify-center">
				<Icon className="w-6 h-6" />
			</div>
			<div>
				<div className="text-2xl font-bold text-gray-900 leading-none">
					{value ?? "—"}
				</div>
				<div className="text-sm text-gray-500 mt-1">{label}</div>
			</div>
		</div>
	);
}

function StatusPill({ status }) {
	const s = norm(status);
	let cls = "bg-gray-100 text-gray-700";
	if (s === "OPEN") cls = "bg-green-50 text-green-700";
	if (s === "CLOSED") cls = "bg-red-50 text-red-700";
	return (
		<span
			className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${cls}`}
		>
			{status || "—"}
		</span>
	);
}

function TableShell({ title, onSeeMore, children }) {
	return (
		<section className="bg-white rounded-2xl border shadow-sm">
			<div className="p-5 flex items-center justify-between">
				<h2 className="text-lg font-semibold text-gray-900">{title}</h2>
				<button
					type="button"
					onClick={onSeeMore}
					className="text-sm font-medium text-fuchsia-700 hover:text-fuchsia-800"
				>
					See more →
				</button>
			</div>
			<div className="px-5 pb-5">{children}</div>
		</section>
	);
}

// function Modal({ open, onClose, title, children, widthClass = "max-w-5xl" }) {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-[999]">
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />
//       <div className="absolute inset-0 flex items-center justify-center p-4">
//         <div className={`w-full ${widthClass} bg-white rounded-2xl shadow-xl border`}>
//           <div className="p-4 border-b flex items-center justify-between">
//             <h3 className="font-semibold text-gray-900">{title}</h3>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-900">✕</button>
//           </div>
//           <div className="p-4">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

function useClientPagination(items, pageSize = 8) {
	const [page, setPage] = useState(1);
	const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
	const safePage = Math.min(page, totalPages);

	const pageItems = useMemo(() => {
		const start = (safePage - 1) * pageSize;
		return items.slice(start, start + pageSize);
	}, [items, safePage, pageSize]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => setPage(1), [items.length, pageSize]);

	return { page: safePage, totalPages, setPage, pageItems };
}

function Pager({ page, totalPages, setPage }) {
	return (
		<div className="mt-4 flex items-center justify-between text-sm">
			<button
				type="button"
				className="px-3 py-2 rounded-lg border disabled:opacity-50"
				onClick={() => setPage(page - 1)}
				disabled={page <= 1}
			>
				Prev
			</button>
			<div className="text-gray-600">
				Page <span className="font-semibold">{page}</span> of{" "}
				<span className="font-semibold">{totalPages}</span>
			</div>
			<button
				type="button"
				className="px-3 py-2 rounded-lg border disabled:opacity-50"
				onClick={() => setPage(page + 1)}
				disabled={page >= totalPages}
			>
				Next
			</button>
		</div>
	);
}

export default function EmployerDashboard() {
	const navigate = useNavigate();
	const delJob = useDeleteEmployerJob();

	const { data, isLoading, isError, error } = useEmployerDashboard({
		summaryLimit: 5,
		recentLimit: 5,
	});

	const [jobsOpen, setJobsOpen] = useState(false);
	const [appsOpen, setAppsOpen] = useState(false);

	const [jobDetails, setJobDetails] = useState(null);
	const [appDetails, setAppDetails] = useState(null);

	if (isLoading) return <div className="p-6 text-gray-600">Loading…</div>;
	if (isError)
		return <div className="p-6 text-red-600">{error?.message || "Error"}</div>;

	const stats = data?.stats ?? {
		totalJobs: 0,
		activeOpenJobs: 0,
		totalApplications: 0,
	};
	const jobs = data?.jobSummary ?? [];
	const recentApplications = data?.recentApplications ?? [];
	const allJobs = data?.jobs ?? [];

	return (
		<div className="min-h-screen bg-gray-50 p-4">
			{/* Stats top */}
			<div
				className="h-58 w-full bg-cover bg-center flex mx-auto mb-10"
				style={{ backgroundImage: `url(${headerImage})` }}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto py-10">
					<StatCard icon={Layers} label="Total Jobs" value={stats.totalJobs} />
					<StatCard
						icon={Briefcase}
						label="Active (Open) Jobs"
						value={stats.activeOpenJobs}
					/>
					<StatCard
						icon={Users}
						label="Applications Received"
						value={stats.totalApplications}
					/>
				</div>
			</div>

			{/* image under stats */}
			{/* <div className="w-full h-[220px] sm:h-[260px] lg:h-[300px] overflow-hidden rounded-2xl border bg-white">
				<img src={headerImage} className="w-full h-full object-cover" alt="" />
			</div> */}
			<div className="max-w-6xl mx-auto space-y-6">
				{/* Job Summary Table */}
				<TableShell
					title="Job Summary Table"
					onSeeMore={() => setJobsOpen(true)}
				>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="text-left text-gray-500 border-b">
									<th className="py-3 pr-3 font-medium">Job Title</th>
									<th className="py-3 pr-3 font-medium">Posted On</th>
									<th className="py-3 pr-3 font-medium">Status</th>
									<th className="py-3 pr-3 font-medium">Applications</th>
									<th className="py-3 pr-3 font-medium text-right">Actions</th>
								</tr>
							</thead>
							<tbody>
								{jobs.length === 0 ? (
									<tr>
										<td colSpan={5} className="py-8 text-center text-gray-500">
											No jobs yet.
										</td>
									</tr>
								) : (
									jobs.map((job) => (
										<tr key={job.id} className="border-b last:border-b-0">
											<td className="py-4 pr-3 text-gray-900 font-medium">
												{job.title}
											</td>
											<td className="py-4 pr-3 text-gray-600">
												{job.postedOn
													? new Date(job.postedOn).toLocaleDateString()
													: "—"}
											</td>
											<td className="py-4 pr-3">
												<StatusPill status={job.jobStatus} />
											</td>
											<td className="py-4 pr-3 text-gray-700">
												{job.applicationsCount ?? 0}
											</td>
											<td className="py-4 pr-3">
												<div className="flex justify-end gap-3">
													{/* edit -> open post-job page but in edit mode */}
													<button
														type="button"
														className="text-blue-600 hover:text-blue-800"
														title="Edit"
														onClick={() =>
															navigate(`/employer/jobs/${job.id}/edit`)
														}
													>
														<Pencil className="w-4 h-4" />
													</button>

													<button
														type="button"
														className="text-red-600 hover:text-red-800 disabled:opacity-50"
														title="Delete"
														disabled={delJob.isLoading}
														onClick={() => {
															if (!window.confirm("Delete this job?")) return;
															delJob.mutate(job.id);
														}}
													>
														<Trash2 className="w-4 h-4" />
													</button>

													{/* open details modal */}
													<button
														type="button"
														className="text-gray-700 hover:text-gray-900"
														title="Open"
														onClick={() => setJobDetails(job)}
													>
														<ExternalLink className="w-4 h-4" />
													</button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</TableShell>

				{/* Recent Applications */}
				<TableShell
					title="Recent Applications"
					onSeeMore={() => setAppsOpen(true)}
				>
					{recentApplications.length === 0 ? (
						<div className="py-8 text-center text-gray-500">
							No applications yet.
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="text-left text-gray-500 border-b">
										<th className="py-3 pr-3 font-medium">Candidate</th>
										<th className="py-3 pr-3 font-medium">Job</th>
										<th className="py-3 pr-3 font-medium">Date</th>
										<th className="py-3 pr-3 font-medium">Status</th>
										<th className="py-3 pr-3 font-medium text-right">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{recentApplications.map((a) => (
										<tr key={a.id} className="border-b last:border-b-0">
											<td className="py-4 pr-3 text-gray-900 font-medium">
												{a.talent?.fullName ?? a.talent?.user?.email ?? "—"}
											</td>
											<td className="py-4 pr-3 text-gray-600">
												{a.jobTitle ?? "—"}
											</td>
											<td className="py-4 pr-3 text-gray-600">
												{a.createdAt
													? new Date(a.createdAt).toLocaleDateString()
													: "—"}
											</td>
											<td className="py-4 pr-3">
												<StatusPill status={a.status} />
											</td>
											<td className="py-4 pr-3">
												<div className="flex justify-end gap-3">
													<button
														type="button"
														className="text-gray-700 hover:text-gray-900"
														title="Open"
														onClick={() => setAppDetails(a)}
													>
														<ExternalLink className="w-4 h-4" />
													</button>
													{/* edit/delete هنا يتفعلوا حسب endpoints المتاحة عندك */}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</TableShell>

				{/* Jobs list modal (paginated) */}
				<JobsModal
					open={jobsOpen}
					onClose={() => setJobsOpen(false)}
					jobs={allJobs}
					onEdit={(job) => navigate(`/employer/jobs/${job.id}/edit`)}
					onDelete={(job) => {
						if (!window.confirm("Delete this job?")) return;
						delJob.mutate(job.id);
					}}
					onOpenDetails={(job) => setJobDetails(job)}
				/>

				{/* Applications list modal (paginated) */}
				<ApplicationsModal
					open={appsOpen}
					onClose={() => setAppsOpen(false)}
					appsByJob={data?.appsByJob ?? []}
					onOpenDetails={(app) => setAppDetails(app)}
				/>

				{/* Job details modal */}
				<JobDetailsModal
					open={!!jobDetails}
					job={jobDetails}
					onClose={() => setJobDetails(null)}
				/>

				{/* Application details modal */}
				<ApplicationDetailsModal
					open={!!appDetails}
					app={appDetails}
					onClose={() => setAppDetails(null)}
				/>
			</div>
		</div>
	);
}

function JobsModal({ open, onClose, jobs, onEdit, onDelete, onOpenDetails }) {
	const { page, totalPages, setPage, pageItems } = useClientPagination(jobs, 8);

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="All Jobs"
			widthClass="max-w-6xl"
		>
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="text-left text-gray-500 border-b">
							<th className="py-3 pr-3 font-medium">Title</th>
							<th className="py-3 pr-3 font-medium">Status</th>
							<th className="py-3 pr-3 font-medium">Created</th>
							<th className="py-3 pr-3 font-medium text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{pageItems.map((j) => (
							<tr key={j.id} className="border-b last:border-b-0">
								<td className="py-4 pr-3 font-medium text-gray-900">
									{j.title}
								</td>
								<td className="py-4 pr-3">
									<StatusPill status={j.jobStatus} />
								</td>
								<td className="py-4 pr-3 text-gray-600">
									{j.createdAt
										? new Date(j.createdAt).toLocaleDateString()
										: "—"}
								</td>
								<td className="py-4 pr-3">
									<div className="flex justify-end gap-3">
										<button
											type="button"
											className="text-blue-600 hover:text-blue-800"
											onClick={() => onEdit(j)}
											title="Edit"
										>
											<Pencil className="w-4 h-4" />
										</button>
										<button
											type="button"
											className="text-red-600 hover:text-red-800"
											onClick={() => onDelete(j)}
											title="Delete"
										>
											<Trash2 className="w-4 h-4" />
										</button>
										<button
											type="button"
											className="text-gray-700 hover:text-gray-900"
											onClick={() => onOpenDetails(j)}
											title="Open"
										>
											<ExternalLink className="w-4 h-4" />
										</button>
									</div>
								</td>
							</tr>
						))}
						{pageItems.length === 0 ? (
							<tr>
								<td colSpan={4} className="py-8 text-center text-gray-500">
									No jobs.
								</td>
							</tr>
						) : null}
					</tbody>
				</table>
			</div>
			<Pager page={page} totalPages={totalPages} setPage={setPage} />
		</Modal>
	);
}

function ApplicationsModal({ open, onClose, appsByJob, onOpenDetails }) {
	// flatten
	const apps = React.useMemo(() => {
		return appsByJob.flatMap((x) =>
			(x.apps ?? []).map((app) => ({
				...app,
				jobTitle: x.jobTitle,
				jobId: x.jobId,
			})),
		);
	}, [appsByJob]);

	const { page, totalPages, setPage, pageItems } = useClientPagination(apps, 8);

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="All Applications"
			widthClass="max-w-6xl"
		>
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="text-left text-gray-500 border-b">
							<th className="py-3 pr-3 font-medium">Candidate</th>
							<th className="py-3 pr-3 font-medium">Job</th>
							<th className="py-3 pr-3 font-medium">Date</th>
							<th className="py-3 pr-3 font-medium">Status</th>
							<th className="py-3 pr-3 font-medium text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{pageItems.map((a) => (
							<tr key={a.id} className="border-b last:border-b-0">
								<td className="py-4 pr-3 font-medium text-gray-900">
									{a.talent?.fullName ?? a.talent?.user?.email ?? "—"}
								</td>
								<td className="py-4 pr-3 text-gray-600">{a.jobTitle ?? "—"}</td>
								<td className="py-4 pr-3 text-gray-600">
									{a.createdAt
										? new Date(a.createdAt).toLocaleDateString()
										: "—"}
								</td>
								<td className="py-4 pr-3">
									<StatusPill status={a.status} />
								</td>
								<td className="py-4 pr-3">
									<div className="flex justify-end gap-3">
										<button
											type="button"
											className="text-gray-700 hover:text-gray-900"
											onClick={() => onOpenDetails(a)}
											title="Open"
										>
											<ExternalLink className="w-4 h-4" />
										</button>
										{/* edit/delete هنا حسب endpoints */}
									</div>
								</td>
							</tr>
						))}
						{pageItems.length === 0 ? (
							<tr>
								<td colSpan={5} className="py-8 text-center text-gray-500">
									No applications.
								</td>
							</tr>
						) : null}
					</tbody>
				</table>
			</div>

			<Pager page={page} totalPages={totalPages} setPage={setPage} />
		</Modal>
	);
}

function JobDetailsModal({ open, onClose, job }) {
	return (
		<Modal
			open={open}
			onClose={onClose}
			title="Job Details"
			widthClass="max-w-3xl"
		>
			{!job ? null : (
				<div className="space-y-3">
					<div>
						<div className="text-xl font-bold text-gray-900">{job.title}</div>
						<div className="mt-2">
							<StatusPill status={job.jobStatus} />
						</div>
					</div>
					<div className="text-sm text-gray-700 leading-relaxed">
						{job.description || "No description."}
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
						<div className="bg-gray-50 border rounded-xl p-3">
							<span className="text-gray-500">Location:</span>{" "}
							{job.location ?? "—"}
						</div>
						<div className="bg-gray-50 border rounded-xl p-3">
							<span className="text-gray-500">Type:</span> {job.jobType ?? "—"}
						</div>
						<div className="bg-gray-50 border rounded-xl p-3">
							<span className="text-gray-500">Experience:</span>{" "}
							{job.experienceLevel ?? "—"}
						</div>
						<div className="bg-gray-50 border rounded-xl p-3">
							<span className="text-gray-500">Created:</span>{" "}
							{job.createdAt
								? new Date(job.createdAt).toLocaleDateString()
								: "—"}
						</div>
					</div>
				</div>
			)}
		</Modal>
	);
}

function ApplicationDetailsModal({ open, onClose, app }) {
	return (
		<Modal
			open={open}
			onClose={onClose}
			title="Application Details"
			widthClass="max-w-3xl"
		>
			{!app ? null : (
				<div className="space-y-3">
					<div className="text-xl font-bold text-gray-900">
						{app.talent?.fullName ?? app.talent?.user?.email ?? "Candidate"}
					</div>

					<div className="flex items-center gap-3">
						<StatusPill status={app.status} />
						<div className="text-sm text-gray-600">
							{app.createdAt ? new Date(app.createdAt).toLocaleString() : ""}
						</div>
					</div>

					<div className="bg-gray-50 border rounded-xl p-3 text-sm">
						<div className="text-gray-500 mb-1">Job</div>
						<div className="font-medium text-gray-900">
							{app.jobTitle ?? "—"}
						</div>
					</div>

					{/* هنا تقدري تضيفي coverLetter/answers لو موجودين في schema */}
				</div>
			)}
		</Modal>
	);
}
