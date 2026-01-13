import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Main/Footer";
import NavbarComponent from "../Main/navbar/NavbarComponent";

export default function MainLayOut() {
	const [Count, SetCount] = useState(0);

	useEffect(() => {}, []);

	return (
		<div className="flex flex-col min-h-screen w-max-screen">
			<div className="w-full h-10 py-7">
				<NavbarComponent />
			</div>

			<div className="flex-grow container  mx-auto py-4 ">
				<Outlet />
			</div>

			<Footer />
		</div>
	);
}
