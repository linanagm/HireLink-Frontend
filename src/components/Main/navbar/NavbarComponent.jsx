import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import {
	getDisplayName,
	getProfilePaths,
	roleTabs,
} from "../../../utils/Helpers/user";
import { publicTabs } from "../../../utils/Helpers/user.js";
import { AuthButtons } from "./AuthButtons";
import { Brand } from "./Brand";
import { NotificationsMenu } from "./NotificationMenu";
import { ProfileMenu } from "./ProfileMenu";
import { SearchBar } from "./SearchBar";
import { Tabs } from "./Tabs";

export default function NavbarComponent() {
	const { token, currentUser, logout } = useAuth();
	const navigate = useNavigate();

	const [openMenu, setOpenMenu] = useState(null); // "profile" | "notify" | null

	const closeMenus = useCallback(() => setOpenMenu(null), []);
	const toggleMenu = useCallback((menuName) => {
		setOpenMenu((prev) => (prev === menuName ? null : menuName));
	}, []);

	console.log("Current user: ", currentUser);

	const tabs = useMemo(() => {
		if (!token) return publicTabs;
		return roleTabs[currentUser?.role] || [];
	}, [token, currentUser?.role]);

	const displayName = useMemo(() => getDisplayName(currentUser), [currentUser]);
	const { profilePath, settingsPath } = useMemo(
		() => getProfilePaths(currentUser?.role),
		[currentUser?.role],
	);

	const handleLogout = useCallback(() => {
		logout();
		closeMenus();
		navigate("/");
	}, [logout, navigate, closeMenus]);

	return (
		<nav className="fixed top-0 left-0 right-0 flex flex-wrap w-full h-20 max-w-screen-2xl bg-neutral-100 hover:bg-neutral-50 z-200 border-b border-default mx-auto p-4 pb-7 justify-between items-center">
			{/* LEFT SECTION */}
			<div className="flex items-center gap-7 w-1/2">
				<Brand />
				<Tabs tabs={tabs} />
			</div>

			{/* RIGHT SECTION */}
			<div className="flex items-center gap-10 w-1/2 justify-end">
				<SearchBar />

				{!token ? (
					<AuthButtons />
				) : (
					<ul className="flex gap-7 items-center">
						<NotificationsMenu
							open={openMenu === "notify"}
							onToggle={() => toggleMenu("notify")}
							onClose={closeMenus}
						/>

						<ProfileMenu
							open={openMenu === "profile"}
							onToggle={() => toggleMenu("profile")}
							onLogout={handleLogout}
							user={currentUser}
							displayName={displayName}
							profilePath={profilePath}
							settingsPath={settingsPath}
						/>
					</ul>
				)}
			</div>
		</nav>
	);
}
