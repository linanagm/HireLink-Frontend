import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CircleFrame from "../Main/CircleFrame";
import Footer from "../Main/Footer";

export default function AuthLayOut() {
	const [Count, SetCount] = useState();

	useEffect(() => {}, []);

	return (
		<div>
			<CircleFrame />

			<div className="container p-7 ">
				<Outlet />
			</div>
		</div>
	);
}
