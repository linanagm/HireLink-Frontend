import { useMemo, useState } from "react";
import Badge from "../../../components/Admin/Dashboard/Badge.jsx";
import { Card } from "../../../components/Admin/Dashboard/Card";
import {
	ActivityStateChart,
	UsersGrowthChart,
} from "../../../components/Admin/Dashboard/Charts.jsx";
import Sidebar from "../../../components/Admin/Dashboard/Sidebar";
import StatsGrid from "../../../components/Admin/Dashboard/StatsGrid";
import Tabs from "../../../components/Admin/Dashboard/Tabs";
import Topbar from "../../../components/Admin/Dashboard/Topbar";
import UsersTable from "../../../components/Admin/Dashboard/UsersTable";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { MOCK_USERS, TABS } from "../../../services/adminMockData.js";

export default function AdminDashboard() {
	const { logout } = useAuth();
	const [activeTab, setActiveTab] = useState("ALL");
	const [search, setSearch] = useState("");
	const [selectedIds, setSelectedIds] = useState(() => new Set());

	const filteredUsers = useMemo(() => {
		const q = search.trim().toLowerCase();
		return MOCK_USERS.filter((u) => {
			const tabOk =
				activeTab === "ALL"
					? true
					: activeTab === "BLOCKED"
						? u.status === "BLOCKED"
						: u.role === activeTab;

			const searchOk =
				!q ||
				u.name.toLowerCase().includes(q) ||
				u.email.toLowerCase().includes(q) ||
				String(u.id).includes(q);

			return tabOk && searchOk;
		});
	}, [activeTab, search]);

	const counts = useMemo(() => {
		const total = MOCK_USERS.length;
		const talent = MOCK_USERS.filter((u) => u.role === "TALENT").length;
		const employer = MOCK_USERS.filter((u) => u.role === "EMPLOYER").length;
		const blocked = MOCK_USERS.filter((u) => u.status === "BLOCKED").length;
		return { total, talent, employer, blocked };
	}, []);

	const toggleSelect = (id) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};

	const toggleAllVisible = () => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			const ids = filteredUsers.map((u) => u.id);
			const allSelected = ids.every((id) => next.has(id));
			if (allSelected)
				ids.forEach((id) => {
					next.delete(id);
				});
			else
				ids.forEach((id) => {
					next.add(id);
				});
			return next;
		});
	};

	const onCreate = () => alert("Hook this to your Create flow/API.");
	const onDelete = () => {
		if (selectedIds.size === 0) return alert("Select users first.");
		alert(`Delete ${selectedIds.size} user(s) (wire to API).`);
	};

	return (
		<div className="min-h-screen flex flex-col ">
			<div className="mx-auto flex min-h-screen max-w-7xl bg-white shadow-xl my-16">
				<Sidebar
					selectedCount={selectedIds.size}
					onCreate={onCreate}
					onDelete={onDelete}
				/>

				<main className="flex-1 p-4 sm:p-6 lg:p-8">
					<Topbar search={search} setSearch={setSearch} logout={logout} />

					<div className="mt-6">
						<StatsGrid counts={counts} />
					</div>

					<div className="mt-6">
						<Tabs
							tabs={TABS}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
					</div>

					<div className="mt-6">
						<UsersTable
							users={filteredUsers}
							selectedIds={selectedIds}
							toggleSelect={toggleSelect}
							toggleAllVisible={toggleAllVisible}
							onCreate={onCreate}
							onDelete={onDelete}
						/>
					</div>

					<div className="mt-6 grid gap-4 lg:grid-cols-2">
						<Card
							title="Analytics Overview"
							right={<Badge variant="slate">Last 30d</Badge>}
						>
							<UsersGrowthChart />
						</Card>
						<Card
							title="Activity Stats"
							right={<Badge variant="slate">Last 30d</Badge>}
						>
							<ActivityStateChart />
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
}
