import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../../../assets/images/profile-image.png";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { buildAvatarUrl } from "../../../utils/Helpers/avatar.js";
import {
	getDisplayName,
	getProfilePaths,
	publicTabs,
	roleTabs,
} from "../../../utils/Helpers/user.js";
import { AuthButtons } from "./components/AuthButtons.jsx";
import { Brand } from "./components/Brand.jsx";
import { NotificationsMenu } from "./components/NotificationMenu.jsx";
import { ProfileMenu } from "./components/ProfileMenu.jsx";
import { SearchBar } from "./components/SearchBar.jsx";
import { Tabs } from "./components/Tabs.jsx";

export default function NavbarComponent() {
	const { token, currentUser, logout } = useAuth();
	const navigate = useNavigate();

	const [openMenu, setOpenMenu] = useState(null);

	const closeMenus = useCallback(() => setOpenMenu(null), []);

	const toggleMenu = useCallback((menuName) => {
		setOpenMenu((prev) => (prev === menuName ? null : menuName));
	}, []);

	const tabs = useMemo(() => {
		if (!token) return publicTabs;
		return roleTabs[currentUser?.role] || [];
	}, [token, currentUser?.role]);

	const displayName = useMemo(() => getDisplayName(currentUser), [currentUser]);
	const { profilePath, settingsPath } = useMemo(
		() => getProfilePaths(currentUser?.role),
		[currentUser?.role],
	);

	const avatar = useMemo(() => {
		if (currentUser?.avatarUrl) return currentUser.avatarUrl;

		const publicId =
			currentUser?.role === "TALENT"
				? currentUser?.talentProfile?.avatarPublicId
				: currentUser?.role === "EMPLOYER"
					? currentUser?.employerProfile?.logoPublicId
					: null;

		return publicId ? buildAvatarUrl(publicId) : defaultProfileImage;
	}, [
		currentUser?.avatarUrl,
		currentUser?.role,
		currentUser?.talentProfile?.avatarPublicId,
		currentUser?.employerProfile?.logoPublicId,
	]);

	console.log("nav current user:", currentUser);

	console.log("nav avatar", avatar);

	console.log("nav user :", currentUser);

	const handleLogout = useCallback(async () => {
		await logout();
		closeMenus();
		navigate("/");
	}, [logout, navigate, closeMenus]);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 flex flex-wrap w-full h-20 max-w-screen-2xl bg-neutral-100 hover:bg-neutral-50 z-200 border-b border-default mx-auto p-4 pb-7 justify-between items-center">
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
							onLogout={() => handleLogout()}
							user={currentUser}
							avatar={avatar}
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
