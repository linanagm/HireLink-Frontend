import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import NavbarComponent from '../Main/Navbar'

export default function DashboardLayout() {
	const [Count, SetCount] = useState();

	useEffect(() => {}, []);

	return (
		<div>
			{/* <NavbarComponent /> */}

			<main>
				<Outlet />
			</main>
		</div>
	);
}
