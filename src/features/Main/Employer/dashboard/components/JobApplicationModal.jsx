import { ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import StatusPill from "../../../../../components/UI/StatusPill";
import { Modal } from "../../../Talent/profile/TalentProfile";
import { useEmployerJobApplicationsQuery } from "../../hooks/queries/useEmployerAppQuery";

function useClientPagination(items, pageSize = 8) {
	const [page, setPage] = useState(1);
	const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
	const safePage = Math.min(page, totalPages);

	const pageItems = useMemo(() => {
		const start = (safePage - 1) * pageSize;
		return items.slice(start, start + pageSize);
	}, [items, safePage, pageSize]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <>
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

export default function JobApplicationsModal({
	open,
	onClose,
	job,
	onOpenApplication,
}) {
	const jobId = job?.id;

	const appsQ = useEmployerJobApplicationsQuery(jobId, { enabled: open });
	const apps = appsQ.data ?? [];

	const { page, totalPages, setPage, pageItems } = useClientPagination(apps, 8);

	return (
		<Modal
			open={open}
			onClose={onClose}
			title={`Applications - ${job?.title ?? ""}`}
			widthClass="max-w-4xl "
		>
			{appsQ.isLoading ? (
				<div className="p-4 text-gray-600">Loading…</div>
			) : appsQ.isError ? (
				<div className="p-4 text-red-600">
					{appsQ.error?.message || "Error"}
				</div>
			) : (
				<>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="text-left text-gray-500 border-b">
									<th className="py-3 pr-3 font-medium">Candidate</th>
									<th className="py-3 pr-3 font-medium">Date</th>
									<th className="py-3 pr-3 font-medium">Status</th>
									<th className="py-3 pr-3 font-medium text-right">Actions</th>
								</tr>
							</thead>
							<tbody>
								{pageItems.map((a) => (
									<tr key={a.id} className="border-b last:border-b-0">
										<td className="py-4 pr-3 font-medium text-gray-900">
											{a.talent?.firstName ?? a.talent?.user?.email ?? "—"}
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
												<button
													type="button"
													className="text-gray-700 hover:text-gray-900"
													onClick={() => onOpenApplication(a, job)}
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
											No applications.
										</td>
									</tr>
								) : null}
							</tbody>
						</table>
					</div>

					<Pager page={page} totalPages={totalPages} setPage={setPage} />
				</>
			)}
		</Modal>
	);
}
