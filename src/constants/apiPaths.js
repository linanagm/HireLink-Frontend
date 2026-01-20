
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
        profile: "/talent/profile",
        avatar: "/talent/avatar",
        skills: "/talent/skills",
        jobs: "/talent/jobs",
        applications: "/talent/applications",
        resume: "/talent/resume",
    },
    jobs: {
        jobsList: "/jobs",
        jobDetails: (id) => `/jobs/${id}`,
        jobPropsal: (id) => `/jobs/${id}/apply`,

    },
    applications: {
        getApplicationById: (id) => `/applications/${id}`,
    }
};
