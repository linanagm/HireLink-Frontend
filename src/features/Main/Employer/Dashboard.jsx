import {
	Briefcase,
	ExternalLink,
	Layers,
	Pencil,
	Trash2,
	Users,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import headerImage from "../../../assets/images/layouts/header.svg";
import { useDeleteEmployerJob } from "../../../hooks/mutations/employer/useDeleteEmployerJob"; // أو نفس الملف لو حطيتيه هناك
import { useEmployerDashboardAggregated } from "../../../hooks/queries/employer/useEmployerQueries";

function StatCard({ icon: Icon, label, value }) {
	return (
		<div className="bg-white rounded-2xl border shadow-sm p-5 flex items-center gap-4">
			<div className="w-20 h-20 rounded-full bg-fuchsia-200 text-fuchsia-700 flex items-center justify-center">
				<Icon className="w-6 h-6 text-fuchsia-700" />
			</div>

			<div>
				<div className="text-2xl font-bold text-fuchsia-800 leading-none">
					{value ?? "—"}
				</div>
				<div className="text-sm text-fuchsia-800 font-sans font-thin mt-1">
					{label}
				</div>
			</div>
		</div>
	);
}

function StatusPill({ status }) {
	const normalized = (status || "").toLowerCase();

	let cls = "bg-gray-100 text-gray-700";
	if (normalized === "open") cls = "bg-green-50 text-green-700";
	if (normalized === "draft") cls = "bg-gray-100 text-gray-700";
	if (normalized === "closed") cls = "bg-red-50 text-red-700";

	return (
		<span
			className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${cls}`}
		>
			{status || "—"}
		</span>
	);
}

function TableShell({ title, actionLabel, actionTo, children }) {
	return (
		<section className="bg-white rounded-2xl border shadow-sm">
			<div className="p-5 flex items-center justify-between">
				<h2 className="text-lg font-semibold text-gray-900">{title}</h2>

				{actionTo ? (
					<Link
						to={actionTo}
						className="text-sm font-medium text-purple-700 hover:text-purple-800 inline-flex items-center gap-2"
					>
						{actionLabel ?? "See more"} <span aria-hidden>→</span>
					</Link>
				) : null}
			</div>

			<div className="px-5 pb-5">{children}</div>
		</section>
	);
}

export default function EmployerDashboard() {
	const navigate = useNavigate();

	const { data, isLoading, isError, error } = useEmployerDashboardAggregated({
		summaryLimit: 5,
		recentLimit: 5,
	});

	const deleteJobMutation = useDeleteEmployerJob();

	const stats = data?.stats ?? {
		totalJobPosts: 0,
		activeJobs: 0,
		applicationsReceived: 0,
	};

	const jobs = data?.jobSummary ?? [];
	const applicants = data?.recentApplicants ?? [];

	if (isLoading) return <div className="p-6 text-gray-600">Loading...</div>;
	if (isError)
		return (
			<div className="p-6 text-red-600">
				{error?.message || "Something went wrong"}
			</div>
		);

	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>

			<div className="min-h-screen bg-gray-50">
				<div className="flex flex-col">
					{/* Header + stats overlay */}
					<div className="mb-5">
						<div className="relative w-full h-[260px] sm:h-[300px] lg:h-[340px]">
							<img
								src={headerImage}
								className="w-full h-full object-cover"
								alt=""
							/>

							<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-4">
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
									<StatCard
										icon={Layers}
										label="Total Job Posts"
										value={stats.totalJobPosts}
									/>
									<StatCard
										icon={Briefcase}
										label="Active Jobs"
										value={stats.activeJobs}
									/>
									<StatCard
										icon={Users}
										label="Applications Received"
										value={stats.applicationsReceived}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="relative -mt-16 px-4 pb-10">
						<div className="max-w-6xl mx-auto">
							<div className="mt-6 space-y-6">
								{/* Job Summary */}
								<TableShell
									title="Job Summary Table"
									actionLabel="See more"
									actionTo="/employer/jobs"
								>
									<div className="overflow-x-auto">
										<table className="w-full text-sm">
											<thead>
												<tr className="text-left text-gray-500 border-b">
													<th className="py-3 pr-3">
														<input
															type="checkbox"
															className="accent-purple-700"
														/>
													</th>
													<th className="py-3 pr-3 font-medium">Job Title</th>
													<th className="py-3 pr-3 font-medium">Posted On</th>
													<th className="py-3 pr-3 font-medium">Status</th>
													<th className="py-3 pr-3 font-medium">Applicants</th>
													<th className="py-3 pr-3 font-medium text-right">
														Actions
													</th>
												</tr>
											</thead>

											<tbody>
												{jobs.length === 0 ? (
													<tr>
														<td
															colSpan={6}
															className="py-8 text-center text-gray-500"
														>
															No jobs yet.
														</td>
													</tr>
												) : (
													jobs.map((job) => (
														<tr
															key={job.id}
															className="border-b last:border-b-0"
														>
															<td className="py-4 pr-3">
																<input
																	type="checkbox"
																	className="accent-purple-700"
																/>
															</td>

															<td className="py-4 pr-3 text-gray-900 font-medium">
																{job.title}
															</td>

															<td className="py-4 pr-3 text-gray-600">
																{job.postedOn
																	? new Date(job.postedOn).toLocaleDateString()
																	: "—"}
															</td>

															<td className="py-4 pr-3">
																<StatusPill status={job.status} />
															</td>

															<td className="py-4 pr-3 text-gray-700">
																{job.applicantsCount ?? 0}
															</td>

															<td className="py-4 pr-3">
																<div className="flex justify-end gap-3">
																	{/* EDIT: يروح لصفحة edit */}
																	<button
																		type="button"
																		className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
																		title="Edit"
																		onClick={() =>
																			navigate(`/employer/jobs/${job.id}/edit`)
																		}
																	>
																		<Pencil className="w-4 h-4" />
																	</button>

																	{/* DELETE: يضرب الباك */}
																	<button
																		type="button"
																		className="text-red-600 hover:text-red-800 disabled:opacity-50"
																		title="Delete"
																		disabled={deleteJobMutation.isLoading}
																		onClick={() => {
																			const ok =
																				window.confirm("Delete this job?");
																			if (!ok) return;
																			deleteJobMutation.mutate(job.id);
																		}}
																	>
																		<Trash2 className="w-4 h-4" />
																	</button>

																	{/* VIEW */}
																	<Link
																		to={`/jobs/${job.id}`}
																		className="text-gray-700 hover:text-gray-900"
																		title="Open job"
																	>
																		<ExternalLink className="w-4 h-4" />
																	</Link>
																</div>
															</td>
														</tr>
													))
												)}
											</tbody>
										</table>

										{deleteJobMutation.isError ? (
											<div className="mt-3 text-sm text-red-600">
												{deleteJobMutation.error?.message ||
													"Failed to delete job"}
											</div>
										) : null}
									</div>
								</TableShell>

								{/* Recent Applicants */}
								<TableShell
									title="Recent Applicants"
									actionLabel="See more"
									actionTo="/employer/applicants"
								>
									{applicants.length === 0 ? (
										<div className="py-8 text-center text-gray-500">
											No applicants yet.
										</div>
									) : (
										<div className="overflow-x-auto">
											<table className="w-full text-sm">
												<thead>
													<tr className="text-left text-gray-500 border-b">
														<th className="py-3 pr-3 font-medium">Name</th>
														<th className="py-3 pr-3 font-medium">
															Job Applied
														</th>
														<th className="py-3 pr-3 font-medium">Date</th>
														<th className="py-3 pr-3 font-medium">Status</th>
														<th className="py-3 pr-3 font-medium text-right">
															Actions
														</th>
													</tr>
												</thead>
												<tbody>
													{applicants.map((a) => (
														<tr key={a.id} className="border-b last:border-b-0">
															<td className="py-4 pr-3 text-gray-900 font-medium">
																{a.talentName || a.name || "—"}
															</td>
															<td className="py-4 pr-3 text-gray-600">
																{a.jobTitle || "—"}
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
																<div className="flex justify-end">
																	<Link
																		to={`/employer/applicants/${a.id}`}
																		className="text-gray-700 hover:text-gray-900"
																		title="Open application"
																	>
																		<ExternalLink className="w-4 h-4" />
																	</Link>
																</div>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									)}
								</TableShell>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
