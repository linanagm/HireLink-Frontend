import { cx } from "../../../../../utils/formatter";

export default function Tabs({ tabs, activeTab, setActiveTab }) {
	return (
		<div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200">
			<div className="flex flex-wrap gap-2">
				{tabs.map((t) => (
					<button
						type="button"
						key={t.key}
						onClick={() => setActiveTab(t.key)}
						className={cx(
							"rounded-xl px-4 py-2 text-sm font-bold transition",
							activeTab === t.key
								? "bg-fuchsia-800 text-white"
								: "bg-slate-100 text-slate-700 hover:bg-slate-200",
						)}
					>
						{t.label}
					</button>
				))}
			</div>
		</div>
	);
}
