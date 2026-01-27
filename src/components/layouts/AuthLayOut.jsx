import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import CircleFrame from "../UI/CircleFrame";

export default function AuthLayOut() {
	const [Count, SetCount] = useState();

	useEffect(() => {}, []);

	return (
		<div>
			{/* Home button */}
			<Link
				to="/"
				className="absolute top-6 left-6 z-50 flex items-center gap-2"
			>
				<div className="text-sm font-semibold  items-center font-serif text-fuchsia-700 hidden sm:block hover:text-fuchsia-900">
					<i className="fa-regular fa-house text-fuchsia-800 text-2xl "></i>
					Home
				</div>
			</Link>

			<CircleFrame />

			<div className="container p-7 ">
				<Outlet />
			</div>
		</div>
	);
}
