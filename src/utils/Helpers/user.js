

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

/**
 * Returns a display name for a user based on their role and profile information.
 * If the user is a talent, it will return their first and last name, or their
 * username if they don't have a profile. If the user is an employer, it will
 * return their company name, or their username if they don't have a profile.
 * If the user is neither a talent nor an employer, it will return their username.
 * @param {Object} user - The user object.
 * @returns {string} A display name for the user.
 */
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


/**
 * Returns an object containing the profile and settings paths for the given role.
 *
 * @param {string} role - The role of the user.
 * @returns {Object} An object containing the profile and settings paths.
 *
 * @example
 * const { profilePath, settingsPath } = getProfilePaths("TALENT");
  * // profilePath = "/talent/profile", settingsPath = "/talent/profile/settings"
  */
export const getProfilePaths = (role) => {
    const profilePath = role === "TALENT" ? "/talent/profile" : "/employer/profile";
    return { profilePath, settingsPath: `${profilePath}/settings` };
};












