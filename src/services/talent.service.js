
// services/talent.service.js
import { JOBS_MODES, PATHS } from "../constants/apiPaths";
import { api } from "../lib/api";


export const SKILL_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
export const LANGUAGE_PROFICIENCY = [
    "FRESH",
    "JUNIOR",
    "SENIOR",
    "NATIVE",
];


// GET /talent/profile
export function getTalentProfile() {
    return api("get", PATHS.talent.profile);
}

/**
 * PUT /talent/profile
 * payload example:
 * { headline, bio, location }
 */
export function updateTalentProfile(payload) {
    return api("put", PATHS.talent.profile, payload);
}


/**
 * PUT /talent/skills
 * payload example:
 * {
 *   skills: [{ name: "Node.js", level: "INTERMEDIATE" }]
 * }
 */
export function updateTalentSkills(payload) {
    return api("put", PATHS.talent.skills, payload);
}


/**
 * PUT /talent/languages
 * payload example:
 * {
 *   languages: [{ name: "English", proficiency: "NATIVE" }]
 * }
 */
export function setTalentLanguages(payload) {
    return api("put", PATHS.talent.languages, payload);
}


// GET /talent/avatar?width=200&height=200
export function getTalentAvatar(params = {}) {
    return api("get", PATHS.talent.avatar, null, { params });
}

/**
 * PUT /talent/avatar (multipart/form-data)
 * field name MUST be "avatar"
 */
export function uploadTalentAvatar(formData) {

    return api("put", PATHS.talent.avatar, formData, {

    });
}

// DELETE /talent/avatar
export function deleteTalentAvatar() {
    return api("delete", PATHS.talent.avatar);
}


// GET /talent/resume
export function getTalentResume() {
    return api("get", PATHS.talent.resume);
}

/**
 * PUT /talent/resume (multipart/form-data)
 * field name MUST be "resume"
 */
export function uploadTalentResume(file) {

    return api("put", PATHS.talent.resume, form, file);
}

// DELETE /talent/resume
export function deleteTalentResume() {
    return api("delete", PATHS.talent.resume);
}


/*****************  Jobs (Talent browsing) *********************/


// GET /jobs (supports params: mode, search, page, etc.)
export function getJobs(params = {}) {
    return api("get", PATHS.jobs.jobsList, null, { params });
}

// GET /jobs?mode=recommended
export function getRecommendedJobs(params = {}) {
    return getJobs({ ...params, mode: JOBS_MODES.RECOMMENDED });
}


// GET /jobs?mode=best_matches
export function getBestMatchJobs(params = {}) {
    return getJobs({ ...params, mode: JOBS_MODES.BEST_MATCHES });
}


// GET /jobs/:id
export function getJobById(id) {
    return api("get", PATHS.jobs.jobDetails(id));
}

// POST /jobs/:id/apply
export function applyToJob(id, payload) {
    return api("post", PATHS.jobs.jobProposal(id), payload);
}


/**************************  Applications (Talent) ******************/

// GET /talent/applications
export function getMyApplications(params = {}) {
    return api("get", PATHS.talent.applications, null, { params });
}
