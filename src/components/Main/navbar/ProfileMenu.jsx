import { Link } from "react-router-dom";
import { getAvatar } from "../../../utils/Helpers/user";

export function ProfileMenu({
	open,
	onToggle,
	onLogout,
	user,
	displayName,
	profilePath,
	settingsPath,
}) {
	const avatar = getAvatar(user);

	return (
		<li className="relative">
			<button
				type="button"
				onClick={onToggle}
				className="rounded-full focus:outline-none focus:ring-4 focus:ring-gray-300"
				aria-label="User profile"
			>
				<img
					className="w-10 h-10 rounded-full"
					src={avatar}
					alt="User avatar"
				/>
			</button>

			{open && (
				<div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-xl border z-50">
					{/* HEADER */}
					<div className="p-3 flex items-center gap-2 bg-gray-100 rounded-t-xl">
						<img
							className="w-10 h-10 rounded-full"
							src={avatar}
							alt="Profile avatar"
						/>
						<div className="min-w-0">
							<div className="font-medium text-gray-900 truncate">
								{displayName || "User"}
							</div>
							<div className="text-sm text-gray-600 truncate">
								{user?.email}
							</div>
						</div>
					</div>

					{/* LINKS */}
					<ul className="p-2 text-sm font-medium">
						<li>
							<Link
								to={profilePath}
								className="flex items-center p-2 text-gray-600 hover:bg-slate-100 hover:text-gray-900"
							>
								<i className="fa-regular fa-user mr-2"></i>
								Account
							</Link>
						</li>

						<li>
							<Link
								to={settingsPath}
								className="flex items-center p-2 text-gray-600 hover:bg-slate-100 hover:text-gray-900"
							>
								<i className="fa-solid fa-gear mr-2"></i>
								Settings & Privacy
							</Link>
						</li>

						<li>
							<button
								type="button"
								onClick={onLogout}
								className="flex items-center w-full p-2 text-red-600 hover:bg-gray-100 focus:outline-none"
							>
								<i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
								Sign out
							</button>
						</li>
					</ul>
				</div>
			)}
		</li>
	);
}
