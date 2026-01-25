import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDeleteJob } from "../../../hooks/mutations/moderation/useDeleteJob";
import { useDeleteUser } from "../../../hooks/mutations/moderation/useDeleteUser";
import { useSetUserActive } from "../../../hooks/mutations/moderation/useSetUserActive";
import { useModerationJobs } from "../../../hooks/queries/moderation/useModerationJobs";
import { useModerationStats } from "../../../hooks/queries/moderation/useModerationStats";
import { useModerationUsers } from "../../../hooks/queries/moderation/useModerationUser";
import { useAuth } from "../../../hooks/useAuth";
import { cx } from "../../../utils/formatter";
import Modal from "./components/dashboard/Modal";
import Pill from "./components/dashboard/Pill";
import StatCard from "./components/dashboard/StatCard";
//import { logoutRes } from "../../../services/auth.service";
// const num = (v) => {
// 	if (v == null) return "-";
// 	if (typeof v === "number" || typeof v === "string") return v;
// 	if (typeof v === "object") return v.total ?? v.count ?? v.value ?? "-";
// 	return "-";
// };

export default function ModerationDashboard() {
	const { logout } = useAuth();
	const [tab, setTab] = useState("users"); // "users" | "jobs"
	const [usersPage, setUsersPage] = useState({ limit: 20, skip: 0 });
	const [jobsPage, setJobsPage] = useState({ limit: 20, skip: 0 });

	const [detailModal, setDetailModal] = useState({
		open: false,
		title: "",
		data: null,
	});
	const [confirmModal, setConfirmModal] = useState({
		open: false,
		title: "",
		description: "",
		confirmText: "Confirm",
		danger: false,
		onConfirm: null,
		loading: false,
	});

	const statsQ = useModerationStats();

	const usersQ = useModerationUsers(usersPage);
	const jobsQ = useModerationJobs(jobsPage);

	const setActiveM = useSetUserActive();
	const deleteUserM = useDeleteUser();
	const deleteJobM = useDeleteJob();

	const stats = statsQ.data?.data ?? statsQ.data ?? null;
	const users = usersQ.data?.data ?? usersQ.data ?? [];
	const jobs = jobsQ.data?.data ?? jobsQ.data ?? [];

	const isBusy = statsQ.isLoading || usersQ.isLoading || jobsQ.isLoading;

	const usersPagination = useMemo(() => {
		const prevDisabled = usersPage.skip <= 0;
		const nextDisabled =
			!Array.isArray(users) || users.length < usersPage.limit;
		return { prevDisabled, nextDisabled };
	}, [users, usersPage]);

	const jobsPagination = useMemo(() => {
		const prevDisabled = jobsPage.skip <= 0;
		const nextDisabled = !Array.isArray(jobs) || jobs.length < jobsPage.limit;
		return { prevDisabled, nextDisabled };
	}, [jobs, jobsPage]);

	const openDetails = (title, data) => {
		setDetailModal({ open: true, title, data });
	};

	const openConfirm = (opts) => {
		setConfirmModal({
			open: true,
			title: opts.title,
			description: opts.description,
			confirmText: opts.confirmText ?? "Confirm",
			danger: !!opts.danger,
			onConfirm: opts.onConfirm,
			loading: false,
		});
	};

	const closeConfirm = () => {
		setConfirmModal((s) => ({
			...s,
			open: false,
			onConfirm: null,
			loading: false,
		}));
	};

	const runConfirm = async () => {
		if (!confirmModal.onConfirm) return;
		try {
			setConfirmModal((s) => ({ ...s, loading: true }));
			await confirmModal.onConfirm();
			closeConfirm();
		} catch (e) {
			setConfirmModal((s) => ({ ...s, loading: false }));
			toast?.error?.(e?.message || "Operation failed");
		}
	};

	const onToggleActive = (u) => {
		const next = !u?.isActive;
		openConfirm({
			title: next ? "Activate user" : "Deactivate user",
			description: `This will set isActive = ${String(next)} for ${u?.email || "this user"}.`,
			confirmText: next ? "Activate" : "Deactivate",
			danger: !next,
			onConfirm: async () => {
				await setActiveM.mutateAsync({ userId: u.id, isActive: next });
				toast?.success?.("User updated");
			},
		});
	};

	const onDeleteUser = (u) => {
		openConfirm({
			title: "Delete user",
			description: `This will permanently delete ${u?.email || "this user"} (id: ${u?.id}).`,
			confirmText: "Delete",
			danger: true,
			onConfirm: async () => {
				await deleteUserM.mutateAsync(u.id);
				toast?.success?.("User deleted");
			},
		});
	};

	const onDeleteJob = (j) => {
		openConfirm({
			title: "Delete job",
			description: `This will permanently delete job (id: ${j?.id}).`,
			confirmText: "Delete",
			danger: true,
			onConfirm: async () => {
				await deleteJobM.mutateAsync(j.id);
				toast?.success?.("Job deleted");
			},
		});
	};
	//const navigate = useNavigate();

	const handleSignOut = () => {
		//if (!confirm("Are you sure you want to sign out?")) return;

		logout();
		// اختياري لكن مفيد جدًا لو في state بايظة
		//window.location.reload();

		//navigate("/login", { replace: true });
	};

	return (
		<div className="min-h-screen bg-slate-100">
			<div className="mx-auto max-w-7xl px-4 py-8">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">
							Moderation Dashboard
						</h1>
						<p className="mt-1 text-sm text-gray-600">
							MODERATOR-only access. Because humans cannot be trusted.
						</p>
					</div>

					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => statsQ.refetch()}
							className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
						>
							Refresh
						</button>
						<button
							type="button"
							onClick={handleSignOut}
							className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
						>
							Sign out
						</button>
					</div>
				</div>

				{/* Stats */}
				<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<StatCard label="Users" value={stats?.users} />
					<StatCard label="Jobs" value={stats?.jobs} />
					<StatCard label="Active users" value={stats?.activeUsers} />
					<StatCard label="Inactive users" value={stats?.inactiveUsers} />
				</div>

				{/* Tabs */}
				<div className="mt-8 flex items-center gap-2">
					<button
						type="button"
						onClick={() => setTab("users")}
						className={cx(
							"px-4 py-2 rounded-xl text-sm font-semibold border",
							tab === "users"
								? "bg-purple-700 text-white border-purple-700"
								: "bg-white text-gray-800 border-gray-200 hover:bg-gray-50",
						)}
					>
						Users
					</button>
					<button
						type="button"
						onClick={() => setTab("jobs")}
						className={cx(
							"px-4 py-2 rounded-xl text-sm font-semibold border",
							tab === "jobs"
								? "bg-purple-700 text-white border-purple-700"
								: "bg-white text-gray-800 border-gray-200 hover:bg-gray-50",
						)}
					>
						Jobs
					</button>
				</div>

				{/* Content Card */}
				<div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
					<div className="flex items-center justify-between px-5 py-4 border-b">
						<p className="font-semibold text-gray-900">
							{tab === "users" ? "Users list" : "Jobs list"}
						</p>

						<p className="text-xs text-gray-500">
							{isBusy ? "Loading..." : "Ready"}
						</p>
					</div>

					{/* USERS TABLE */}
					{tab === "users" ? (
						<div className="p-5">
							<div className="overflow-x-auto">
								<table className="min-w-full text-sm">
									<thead className="text-left text-gray-600">
										<tr className="[&>th]:py-2 [&>th]:px-3">
											<th>Email</th>
											<th>Role</th>
											<th>Status</th>
											<th>Verified</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody className="text-gray-800">
										{Array.isArray(users) && users.length ? (
											users.map((u) => (
												<tr
													key={u.id}
													className="border-t [&>td]:py-3 [&>td]:px-3 align-top"
												>
													<td className="font-medium text-gray-900">
														<div className="max-w-[320px] truncate">
															{u.email || "-"}
														</div>
														<div className="mt-1 text-xs text-gray-500 truncate max-w-[320px]">
															{u.id}
														</div>
													</td>

													<td>
														<Pill tone="blue">{u.role || "-"}</Pill>
													</td>

													<td>
														{u.isActive ? (
															<Pill tone="green">Active</Pill>
														) : (
															<Pill tone="red">Inactive</Pill>
														)}
													</td>

													<td>
														{u.isEmailVerified ? (
															<Pill tone="green">Yes</Pill>
														) : (
															<Pill tone="gray">No</Pill>
														)}
													</td>

													<td>
														<div className="flex flex-wrap gap-2">
															<button
																type="button"
																onClick={() => openDetails("User details", u)}
																className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50"
															>
																Details
															</button>

															<button
																type="button"
																onClick={() => onToggleActive(u)}
																className={cx(
																	"rounded-lg px-3 py-1.5 border",
																	u.isActive
																		? "border-red-200 text-red-700 hover:bg-red-50"
																		: "border-green-200 text-green-700 hover:bg-green-50",
																)}
															>
																{u.isActive ? "Deactivate" : "Activate"}
															</button>

															<button
																type="button"
																onClick={() => onDeleteUser(u)}
																className="rounded-lg border border-red-200 px-3 py-1.5 text-red-700 hover:bg-red-50"
															>
																Delete
															</button>
														</div>
													</td>
												</tr>
											))
										) : (
											<tr>
												<td
													colSpan={5}
													className="py-10 text-center text-gray-500"
												>
													No users found.
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>

							{/* Pagination */}
							<div className="mt-5 flex items-center justify-between">
								<p className="text-xs text-gray-500">
									Showing {usersPage.skip + 1} -{" "}
									{usersPage.skip + usersPage.limit}
								</p>
								<div className="flex gap-2">
									<button
										type="button"
										disabled={usersPagination.prevDisabled}
										onClick={() =>
											setUsersPage((p) => ({
												...p,
												skip: Math.max(0, p.skip - p.limit),
											}))
										}
										className={cx(
											"rounded-xl border px-4 py-2 text-sm font-semibold",
											usersPagination.prevDisabled
												? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
												: "bg-white text-gray-800 border-gray-200 hover:bg-gray-50",
										)}
									>
										Prev
									</button>
									<button
										type="button"
										disabled={usersPagination.nextDisabled}
										onClick={() =>
											setUsersPage((p) => ({ ...p, skip: p.skip + p.limit }))
										}
										className={cx(
											"rounded-xl border px-4 py-2 text-sm font-semibold",
											usersPagination.nextDisabled
												? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
												: "bg-white text-gray-800 border-gray-200 hover:bg-gray-50",
										)}
									>
										Next
									</button>
								</div>
							</div>
						</div>
					) : (
						/* JOBS TABLE */
						<div className="p-5">
							<div className="overflow-x-auto">
								<table className="min-w-full text-sm">
									<thead className="text-left text-gray-600">
										<tr className="[&>th]:py-2 [&>th]:px-3">
											<th>Title</th>
											<th>Status</th>
											<th>Created</th>
											<th>Actions</th>
										</tr>
									</thead>

									<tbody className="text-gray-800">
										{Array.isArray(jobs) && jobs.length ? (
											jobs.map((j) => (
												<tr
													key={j.id}
													className="border-t [&>td]:py-3 [&>td]:px-3 align-top"
												>
													<td className="font-medium text-gray-900">
														<div className="max-w-[360px] truncate">
															{j.title || j.position || "-"}
														</div>
														<div className="mt-1 text-xs text-gray-500 truncate max-w-[360px]">
															{j.id}
														</div>
													</td>

													<td>
														<Pill tone="purple">{j.status || "-"}</Pill>
													</td>

													<td className="text-gray-700">
														{j.createdAt
															? new Date(j.createdAt).toLocaleString()
															: "-"}
													</td>

													<td>
														<div className="flex flex-wrap gap-2">
															<button
																type="button"
																onClick={() => openDetails("Job details", j)}
																className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50"
															>
																Details
															</button>

															<button
																type="button"
																onClick={() => onDeleteJob(j)}
																className="rounded-lg border border-red-200 px-3 py-1.5 text-red-700 hover:bg-red-50"
															>
																Delete
															</button>
														</div>
													</td>
												</tr>
											))
										) : (
											<tr>
												<td
													colSpan={4}
													className="py-10 text-center text-gray-500"
												>
													No jobs found.
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>

							{/* Pagination */}
							<div className="mt-5 flex items-center justify-between">
								<p className="text-xs text-gray-500">
									Showing {jobsPage.skip + 1} - {jobsPage.skip + jobsPage.limit}
								</p>
								<div className="flex gap-2">
									<button
										type="button"
										disabled={jobsPagination.prevDisabled}
										onClick={() =>
											setJobsPage((p) => ({
												...p,
												skip: Math.max(0, p.skip - p.limit),
											}))
										}
										className={cx(
											"rounded-xl border px-4 py-2 text-sm font-semibold",
											jobsPagination.prevDisabled
												? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
												: "bg-white text-gray-800 border-gray-200 hover:bg-gray-50",
										)}
									>
										Prev
									</button>
									<button
										type="button"
										disabled={jobsPagination.nextDisabled}
										onClick={() =>
											setJobsPage((p) => ({ ...p, skip: p.skip + p.limit }))
										}
										className={cx(
											"rounded-xl border px-4 py-2 text-sm font-semibold",
											jobsPagination.nextDisabled
												? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
												: "bg-white text-gray-800 border-gray-200 hover:bg-gray-50",
										)}
									>
										Next
									</button>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Details Modal */}
				<Modal
					open={detailModal.open}
					title={detailModal.title}
					onClose={() => setDetailModal({ open: false, title: "", data: null })}
					footer={
						<div className="flex justify-end">
							<button
								type="button"
								onClick={() =>
									setDetailModal({ open: false, title: "", data: null })
								}
								className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
							>
								Close
							</button>
						</div>
					}
				>
					<pre className="text-xs bg-gray-50 border border-gray-200 rounded-xl p-4 overflow-auto max-h-[420px]">
						{JSON.stringify(detailModal.data, null, 2)}
					</pre>
				</Modal>

				{/* Confirm Modal */}
				<Modal
					open={confirmModal.open}
					title={confirmModal.title}
					onClose={confirmModal.loading ? () => {} : closeConfirm}
					footer={
						<div className="flex items-center justify-end gap-2">
							<button
								type="button"
								onClick={closeConfirm}
								disabled={confirmModal.loading}
								className={cx(
									"rounded-xl border px-4 py-2 text-sm font-semibold",
									confirmModal.loading
										? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
										: "bg-white text-gray-800 border-gray-200 hover:bg-gray-50",
								)}
							>
								Cancel
							</button>

							<button
								type="button"
								onClick={runConfirm}
								disabled={confirmModal.loading}
								className={cx(
									"rounded-xl px-4 py-2 text-sm font-semibold text-white",
									confirmModal.danger
										? "bg-red-600 hover:bg-red-700"
										: "bg-purple-700 hover:bg-purple-800",
									confirmModal.loading ? "opacity-70 cursor-not-allowed" : "",
								)}
							>
								{confirmModal.loading ? "Working..." : confirmModal.confirmText}
							</button>
						</div>
					}
				>
					<p className="text-sm text-gray-700">{confirmModal.description}</p>
				</Modal>
			</div>
		</div>
	);
}
