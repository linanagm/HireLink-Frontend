export function Card({ title, right, children }) {
	return (
		<div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
			<div className="mb-3 flex items-center justify-between">
				<h3 className="text-sm font-bold text-slate-900">{title}</h3>
				{right}
			</div>
			{children}
		</div>
	);
}

export function StatCard({ title, value, hint }) {
	return (
		<div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
			<div className="text-sm font-medium text-slate-500">{title}</div>
			<div className="mt-2 text-2xl font-extrabold text-slate-900">{value}</div>
			{hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
		</div>
	);
}
