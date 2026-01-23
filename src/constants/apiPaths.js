
// export const PATHS = {
//     auth: {
//         register: "/auth/register",
//         verify: "/auth/verify",
//         login: "/auth/login",
//         refresh: "/auth/refresh",
//         resetRequest: "/auth/reset/request",
//         reset: "/auth/reset",
//         me: "/auth/me",
//         logout: "/auth/logout",
//         logoutAll: "/auth/logout/all",
//     },
//     talent: {
//         profile: "/talent/profile",//get/put
//         avatar: "/talent/avatar",//put/get/delete
//         skills: "/talent/skills",//put
//         languages: "/talent/languages",//put
//         applications: "/talent/applications",
//         resume: "/talent/resume",//get/put/delete
//     },
//     skill: {
//         getSkillById: (id) => `/skills/${id}`,
//         putSkills: "/skills",
//     },
//     jobs: {
//         jobsList: "/jobs",
//         jobDetails: (id) => `/jobs/${id}`,
//         jobProposal: (id) => `/jobs/${id}/apply`,

//     },

// };



// constants/apiPaths.js

export const JOBS_MODES = {
    RECOMMENDED: "recommended",
    // لو عندكم mode تاني للـ best matches استخدميه هنا لما تتأكدي من اسمه
    // BEST_MATCHES: "best_matches",
};

export const PATHS = {
    auth: {
        register: "/auth/register",
        verify: "/auth/verify",
        login: "/auth/login",
        refresh: "/auth/refresh",
        resetRequest: "/auth/reset/request",
        reset: "/auth/reset",
        me: "/auth/me",
        logout: "/auth/logout",
        logoutAll: "/auth/logout/all",
    },

    talent: {
        // Profile
        profile: "/talent/profile", // GET/PUT

        // Avatar
        avatar: "/talent/avatar", // GET/PUT/DELETE

        // Skills & Languages
        skills: "/talent/skills", // PUT
        languages: "/talent/languages", // PUT

        // Applications
        applications: "/talent/applications", // GET

        // Resume
        resume: "/talent/resume", // GET/PUT/DELETE
    },

    // Jobs (Talent browsing)
    jobs: {
        jobsList: "/jobs", // GET with params (e.g. mode=recommended)
        jobDetails: (id) => `/jobs/${id}`, // GET
        jobProposal: (id) => `/jobs/${id}/apply`, // POST
    },

    // Optional (لو عندكم endpoints لكتالوج skills/languages)
    // خليتهم لأنك غالبًا هتحتاجي dropdown/auto-complete بدل ما اليوزر يكتب من دماغه
    skill: {
        getSkillById: (id) => `/skills/${id}`,
        putSkills: "/skills",
    },

    // لو لاحقًا عندكم languages catalog:
    // language: {
    //   list: "/languages",
    //   getById: (id) => `/languages/${id}`,
    // },
};
