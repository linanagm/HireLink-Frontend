


export const queryKeys = {
    // AUTH
    currentUser: ["current-user"],

    // TALENT
    talentProfile: ["talent-profile"],
    talentProfileById: (id) => ["talent-profile", id],
    talentSkills: ["talent-skills"],
    // AVATAR
    talentAvatar: ["talent-avatar"],
    talentResume: ["talent-resume"],

    // JOBS
    jobs: ["jobs"],
    jobsByMode: (mode) => ["jobs", mode], // recent | best
    jobDetails: (jobId) => ["job", jobId],

    //will delete
    // APPLICATIONS
    applications: ["applications"],
    // will delete
    applicationByJob: (jobId) => ["applications", "job", jobId],

    // EMPLOYER
    employerProfile: ["employer-profile"],
    employerJobs: ["employer-jobs"],
    employerRecentApps: "employerRecentApps",
    employerJobApplications: "employerJobApplications",
    employerApplications: "employerApplications",
    employerApplication: "employerApplication",

    // will delete
    employerDashboardAggregated: "employerDashboardAggregated",
    // wil delete
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
