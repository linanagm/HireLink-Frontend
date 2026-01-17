import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function TalentPublicDetails() {
	const [Count, SetCount] = useState();

	useEffect(() => {}, []);

	return (
		<div className=" flex justify-center items-center  w-full h-screen   ">
			<div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   ">
				<Spinner color="text-indigo-500" />
			</div>
		</div>
	);
}
