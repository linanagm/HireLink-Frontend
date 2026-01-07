import { cx } from "../../../utils/helpers.js";
import Icon from "./Icon";

function SidebarItem({ icon, label, active }) {
	return (
		<button
			type="button"
			className={cx(
				"w-full rounded-2xl px-4 py-3 text-left text-sm font-bold transition flex items-center gap-3",
				active ? "bg-white/10 ring-1 ring-white/15" : "hover:bg-white/10",
			)}
		>
			<Icon name={icon} className="text-fuchsia-800" />
			<span className="text-slate-800">{label}</span>
		</button>
	);
}

export default function Sidebar({ selectedCount, onCreate, onDelete }) {
	return (
		<aside className="hidden w-72 flex-col bg-slate-100 text-slate-800 lg:flex">
			<div className="px-6 py-6">
				<div className="flex items-center gap-3">
					<div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
						<span className="text-lg font-black">H</span>
					</div>
					<div className="flex-1">
						<div className="text-lg font-extrabold leading-none text-fuchsia-800 pb-2">
							HireLink
						</div>
						<div className="text-xs text-black/70">Admin Console</div>
					</div>
				</div>
			</div>

			<nav className="px-3">
				<SidebarItem icon="dashboard" label="Dashboard" active />
				<SidebarItem icon="analytics" label="Analytics" />
				<SidebarItem icon="reports" label="Reports" />
				<SidebarItem icon="settings" label="Settings" />
			</nav>

			<div className="mt-auto p-6">
				<div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
					<div className="text-sm font-bold">Quick Actions</div>
					<div className="mt-3 grid gap-2">
						<button
							type="button"
							onClick={onCreate}
							className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-fuchsia-900 px-3 py-2 text-sm font-bold hover:bg-white/90"
						>
							<Icon name="plus" className="w-4 h-4" />
							Create
						</button>
						<button
							type="button"
							onClick={onDelete}
							className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-3 py-2 text-sm font-bold hover:bg-rose-500"
						>
							<Icon name="trash" className="w-4 h-4" />
							Delete
						</button>
					</div>
					<div className="mt-3 text-xs text-white/70">
						Selected: {selectedCount}
					</div>
				</div>
			</div>
		</aside>
	);
}
