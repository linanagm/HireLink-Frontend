


export const queryKeys = {
    // AUTH
    currentUser: ["current-user"],

    // TALENT
    talentProfile: ["talent-profile"],
    talentProfileById: (id) => ["talent-profile", id],
    talentSkills: ["talent-skills"],
    // AVATAR
    talentAvatar: ["talent-avatar"],

    // JOBS
    jobs: ["jobs"],
    jobsByMode: (mode) => ["jobs", mode], // recent | best
    jobDetails: (jobId) => ["job", jobId],

    // APPLICATIONS
    applications: ["applications"],
    applicationByJob: (jobId) => ["applications", "job", jobId],

    // EMPLOYER
    employerProfile: ["employer-profile"],
    employerJobs: ["employer-jobs"],

    employerDashboardAggregated: "employerDashboardAggregated",
    employerDashboard: "employerDashboard",

    // employerDashboardStats: "employerDashboardStats",
    // employerJobSummary: "employerJobSummary",
    // employerRecentApplicants: "employerRecentApplicants",
    moderationStats: ["moderation", "stats"],
    moderationUsers: (params) => ["moderation", "users", params],
    moderationJobs: (params) => ["moderation", "jobs", params],

    // ADMIN
    adminStats: ["admin-stats"],
};
