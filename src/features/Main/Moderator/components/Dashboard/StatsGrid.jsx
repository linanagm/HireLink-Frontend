import { StatCard } from "./Card";

export default function StatsGrid({ counts }) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<StatCard title="Total Users" value={counts.total} />
			<StatCard title="Talent Accounts" value={counts.talent} />
			<StatCard title="Employer Accounts" value={counts.employer} />
			<StatCard
				title="Blocked Accounts"
				value={counts.blocked}
				hint="Needs review"
			/>
		</div>
	);
}
