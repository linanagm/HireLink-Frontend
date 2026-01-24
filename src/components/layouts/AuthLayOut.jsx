import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CircleFrame from "../UI/CircleFrame";

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
