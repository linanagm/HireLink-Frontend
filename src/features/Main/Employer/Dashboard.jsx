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
				</div>
			)}
		</Modal>
	);
}
