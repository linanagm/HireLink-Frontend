import profileImageFallback from "../../assets/images/profile-image.png";

export const publicTabs = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

export const roleTabs = {
    TALENT: [
        { to: "/talent/findjob", label: "Find Job" },
        { to: "/talent/applications", label: "My Applications" },
    ],
    EMPLOYER: [
        { to: "/employer/dashboard", label: "Dashboard" },
        { to: "/employer/jobs/new", label: "Post a Job" },
        { to: "/employer/applicants/search", label: "Search Talents" },
    ],
};

export const getDisplayName = (user) => {
    if (!user) return "";

    if (user.role === "TALENT") {
        const first = user?.talentProfile?.firstName || "";
        const last = user?.talentProfile?.lastName || "";
        return `${first} ${last}`.trim() || user?.name || "Talent";
    }

    if (user.role === "EMPLOYER") {
        return (
            user?.employerProfile?.companyName ||
            user?.companyName ||
            user?.name ||
            "Company"
        );
    }

    return user?.name || "User";
};

export const getAvatar = (user) => user?.image || profileImageFallback;

export const getProfilePaths = (role) => {
    const profilePath = role === "TALENT" ? "/talent/profile" : "/employer/profile";
    return { profilePath, settingsPath: `${profilePath}/settings` };
};












