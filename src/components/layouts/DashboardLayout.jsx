import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
	const [Count, SetCount] = useState();

	useEffect(() => {}, []);

	return (
		<div>
			<main>
				<Outlet />
			</main>
		</div>
	);
}
