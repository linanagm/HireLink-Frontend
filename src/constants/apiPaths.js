
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
        profile: "/talent/profile",//get/put
        avatar: "/talent/avatar",//put/get/delete
        skills: "/talent/skills",//put
        languages: "/talent/languages",//put
        applications: "/talent/applications",
        resume: "/talent/resume",//get/put/delete
    },
    skill: {
        getSkillById: (id) => `/skills/${id}`,
        putSkills: "/skills",
    },
    jobs: {
        jobsList: "/jobs",
        jobDetails: (id) => `/jobs/${id}`,
        jobProposal: (id) => `/jobs/${id}/apply`,

    },

};

