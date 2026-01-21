import Badge from "./Badge";

export default function UsersTable({
	users,
	selectedIds,
	toggleSelect,
	toggleAllVisible,
	onCreate,
	onDelete,
}) {
	return (
		<div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
			<div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<div className="text-sm font-extrabold text-slate-900">Users</div>
					<div className="text-xs text-slate-500">
						Showing {users.length} result(s)
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-2">
					<button
						type="button"
						onClick={onCreate}
						className="inline-flex items-center gap-2 rounded-xl bg-fuchsia-800 px-3 py-2 text-sm font-bold text-white hover:bg-fuchsia-700"
					>
						Create
					</button>
					<button
						type="button"
						onClick={onDelete}
						className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-3 py-2 text-sm font-bold text-white hover:bg-rose-500"
					>
						Delete
					</button>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full">
					<thead className="bg-slate-50">
						<tr className="text-left text-xs font-bold text-slate-600">
							<th className="px-4 py-3">
								<input
									type="checkbox"
									className="h-4 w-4 rounded border-slate-300 text-fuchsia-800 focus:ring-fuchsia-300"
									onChange={toggleAllVisible}
									checked={
										users.length > 0 &&
										users.every((u) => selectedIds.has(u.id))
									}
								/>
							</th>
							<th className="px-4 py-3">ID</th>
							<th className="px-4 py-3">Name</th>
							<th className="px-4 py-3">Email</th>
							<th className="px-4 py-3">Account Type</th>
							<th className="px-4 py-3">Status</th>
							<th className="px-4 py-3">Actions</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-slate-200">
						{users.map((u) => (
							<tr key={u.id} className="text-sm text-slate-800">
								<td className="px-4 py-3">
									<input
										type="checkbox"
										className="h-4 w-4 rounded border-slate-300 text-fuchsia-800 focus:ring-fuchsia-300"
										checked={selectedIds.has(u.id)}
										onChange={() => toggleSelect(u.id)}
									/>
								</td>
								<td className="px-4 py-3 font-semibold">{u.id}</td>
								<td className="px-4 py-3">
									<div className="flex items-center gap-3">
										<div className="grid h-9 w-9 place-items-center rounded-full bg-fuchsia-100 ring-1 ring-fuchsia-200">
											<span className="text-xs font-extrabold text-fuchsia-800">
												{u.name
													.split(" ")
													.slice(0, 2)
													.map((x) => x[0])
													.join("")
													.toUpperCase()}
											</span>
										</div>
										<div>
											<div className="font-bold text-slate-900">{u.name}</div>
											<div className="text-xs text-slate-500">
												Joined: {u.joinedAt}
											</div>
										</div>
									</div>
								</td>
								<td className="px-4 py-3 text-slate-600">{u.email}</td>
								<td className="px-4 py-3">
									<Badge variant="fuchsia">
										{u.role === "TALENT" ? "Talent" : "Employer"}
									</Badge>
								</td>
								<td className="px-4 py-3">
									{u.status === "ACTIVE" && (
										<Badge variant="green">Active</Badge>
									)}
									{u.status === "SUSPENDED" && (
										<Badge variant="yellow">Suspended</Badge>
									)}
									{u.status === "BLOCKED" && (
										<Badge variant="red">Blocked</Badge>
									)}
								</td>
								<td className="px-4 py-3">
									<div className="flex flex-wrap gap-2">
										<button
											type="button"
											className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
										>
											Edit
										</button>
										<button
											type="button"
											className="rounded-xl bg-fuchsia-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-fuchsia-700"
										>
											View
										</button>
										<button
											type="button"
											className="rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-500"
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}

						{users.length === 0 && (
							<tr>
								<td
									colSpan={7}
									className="px-4 py-10 text-center text-sm text-slate-500"
								>
									No users found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
