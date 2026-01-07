import { Link } from "react-router-dom";

export default function AdminLogo({
	title = "Admin Portal",
	subtitle,
	to = "/",
	variant = "overlay",
}) {
	const base =
		"flex items-center gap-3 rounded-md shadow-xl backdrop-blur px-4 py-3";

	const styles =
		variant === "overlay"
			? "absolute top-8 left-6 z-30 bg-fuchsia-900/80 text-white"
			: "bg-white/70 text-slate-900";

	return (
		<div className={`${base} ${styles}`}>
			<div className="w-11 h-11 rounded-md bg-white/15 flex items-center justify-center">
				<i className="fa-solid fa-user-tie text-2xl"></i>
			</div>

			<div className="leading-tight">
				<div className="flex items-center gap-2">
					<h1 className="text-lg font-semibold">{title}</h1>

					<Link
						to={to}
						className="text-xs underline underline-offset-4 text-blue-900 opacity-90 hover:opacity-300"
						title="Back to home"
					>
						Home
					</Link>
				</div>

				{subtitle ? (
					<p className="text-xs opacity-90 mt-0.5">{subtitle}</p>
				) : null}
			</div>
		</div>
	);
}
