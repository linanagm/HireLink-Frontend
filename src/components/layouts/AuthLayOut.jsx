import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Hlogo from "../../assets/images/H.svg";
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
				<img
					src={Hlogo}
					alt="Home"
					className="w-8 h-8"
				/>
				<span className="text-sm font-semibold text-gray-500 hidden sm:block hover:text-fuchsia-600">
					Home
				</span>
			</Link>

			<CircleFrame />
	

			<div className="container p-7 ">
				<Outlet />
			</div>
		</div>
	);
}
