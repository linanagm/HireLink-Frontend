

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
    BEST_MATCHES: "best_matches",
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

        // Skills & Languages & Certificates
        skills: "/talent/skills", // PUT/post/delete
        languages: "/talent/languages", // PUT/post/delete
        certificaties: "/talent/certificates", // PUT/post/delete

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


    skill: {
        getSkillById: (id) => `/skills/${id}`,
        putSkills: "/skills",
    },


    employer: {
        profile: "/employer/profile",

        logo: "/employer/logo",

        jobs: "/employer/jobs",

        jobById: (jobId) => `/employer/jobs/${jobId}`,
        updateJob: (jobId) => `/employer/jobs/${jobId}`,

        jobSkill: (jobId) => `/employer/jobs/${jobId}/skills`,
        //removeJobSkill: (jobId) => `/employer/jobs/${jobId}/skills`,

        Job: (jobId) => `/employer/jobs/${jobId}`,
        //removeJob: (jobId) => `/employer/jobs/${jobId}`,


        jobLanguage: (jobId) => `/employer/jobs/${jobId}/languages`,
        //removeLanguage: (jobId) => `/employer/jobs/${jobId}/languages`,

        jobApplications: (jobId) => `/employer/jobs/${jobId}/applications`,

        applicationById: (applicationId) => `/employer/applications/${applicationId}`,
    },
    moderation: {
        stats: "/moderation/stats",

        users: "/moderation/users",
        userById: (userId) => `/moderation/users/${userId}`,
        userActive: (userId) => `/moderation/users/${userId}/active`,

        jobs: "/moderation/jobs",
        jobById: (jobId) => `/moderation/jobs/${jobId}`,
    },

};
