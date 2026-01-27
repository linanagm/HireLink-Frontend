
// services/talent.service.js
import { PATHS } from "../constants/apiPaths";
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

export function upSertTalentSkill(payload) {
    return api("post", PATHS.talent.skills, payload);
}


export function removeTalentSkill(payload) {
    return api("delete", PATHS.talent.skills, payload);
}
/******************************************** */

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

export function upSertTalentLanguage(payload) {
    return api("post", PATHS.talent.languages, payload);
}


export function removeTalentLanguage(payload) {
    return api("delete", PATHS.talent.languages, payload);
}

/******************************************** */

// Certificaties
export function setTalentCertificaties(payload) {
    return api("put", PATHS.talent.certificaties, payload);
}

export function upSertTalentCertificaties(payload) {
    return api("post", PATHS.talent.certificaties, payload);
}

export function removeTalentCertificaties(payload) {
    return api("delete", PATHS.talent.certificaties, payload);
}

/************************************************ */

//avatar

export function getTalentAvatar(params = {}) {
    return api("get", PATHS.talent.avatar, null, { params });
}

export function uploadTalentAvatar(formData) {
    return api("put", PATHS.talent.avatar, formData, {});
}


export function deleteTalentAvatar() {
    return api("delete", PATHS.talent.avatar);
}

/**************************  Resume (Talent) ******************/

export function getTalentResume() {
    return api("get", PATHS.talent.resume);
}

export function uploadTalentResume(file) {
    const formData = new FormData();
    formData.append("resume", file);
    return api("put", PATHS.talent.resume, formData);
}
export function deleteTalentResume() {
    return api("delete", PATHS.talent.resume);
}


/*****************  Jobs (Talent browsing) *********************/


// GET /jobs (supports params: mode, search, page, etc.)
export function getJobs(params = {}) {
    return api("get", PATHS.jobs.jobsList, null, { params });
}

// GET /jobs?mode=recent | recommended
export function getJobsByMode(mode, params = {}) {
    return getJobs({ ...params, mode });
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
