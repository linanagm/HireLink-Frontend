import React from "react";
import { Link } from "react-router-dom";
import correctImage from "../../assets/images/correct.svg";

export default function SuccessCard({
	status,
	message,
	buttonText,
	buttonLink,
}) {
	return (
		<div className="w-full flex justify-center mt-32">
			<div className="flex flex-col bg-white max-w-md border  rounded-xl shadow-xs p-12 items-center text-center">
				{status === "success" && (
					<img src={correctImage} alt="Success" className="w-20 mb-4" />
				)}

				{status === "loading" && (
					<div className="text-slate-600 text-lg mb-4">
						<i className="fa-solid fa-spinner fa-spin text-3xl"></i>
					</div>
				)}

				<h5 className="text-slate-700 font-sans text-xl mb-3">{message}</h5>

				{buttonLink && (
					<Link
						to={buttonLink}
						className="inline-flex items-center mt-3 text-white rounded-lg bg-fuchsia-700 hover:bg-fuchsia-600 px-4 py-2.5 text-sm"
					>
						{buttonText}
						<svg
							className="w-4 h-4 ms-1.5 rtl:rotate-180"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								strokeWidth="2"
								d="M19 12H5m14 0-4 4m4-4-4-4"
							/>
						</svg>
					</Link>
				)}
			</div>
		</div>
	);
}
