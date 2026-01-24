import { Link } from "react-router-dom";

/**
 * ProfileMenu component
 * @param {boolean} open - If the menu is open
 * @param {function} onToggle - Toggle the menu
 * @param {function} onLogout - Logout the user
 * @param {object} user - User object
 * @param {string} avatar - User avatar URL
 * @param {string} displayName - User name
 * @param {string} profilePath - Path to user profile page
 * @param {string} settingsPath - Path to user settings page
 */
export function ProfileMenu({
	open,
	onToggle,
	onLogout,
	user,
	avatar,
	displayName,
	profilePath,
	settingsPath,
}) {
	return (
		<li className="relative">
			<button
				type="button"
				onClick={onToggle}
				className="rounded-full focus:outline-none focus:ring-4 focus:ring-gray-300"
				aria-label="User profile"
			>
				{/* PROFILE AVATAR */}
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
						{/* PROFILE AVATAR */}
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
