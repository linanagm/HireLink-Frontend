import { PATHS } from "../constants/apiPaths";
import { api } from "../lib/api";

/**
 * Employer Jobs
 */
export function listEmployerJobs(config = {}) {
    return api("get", PATHS.employer.jobs, null, config);
}
export function getEmployerJob(jobId, config = {}) {
    return api("get", PATHS.employer.jobById(jobId), null, config);
}

// post ajob 
export function createEmployerJob(payload, config = {}) {
    return api("post", PATHS.employer.jobs, payload, config);
}


export function updateEmployerJob(jobId, payload, config = {}) {
    return api("put", PATHS.employer.jobById(jobId), payload, config);
}

export function upsertEmployerJobSkill(jobId, payload, config = {}) {
    return api("post", PATHS.employer.jobSkill(jobId), payload, config);
}

export function removeEmployerJobSkill(jobId, payload, config = {}) {
    return api("delete", PATHS.employer.jobSkill(jobId), payload, config);
}

export function upsertEmployerJobLanguage(jobId, payload, config = {}) {
    return api("post", PATHS.employer.jobLanguage(jobId), payload, config);
}

export function removeEmployerJobLanguage(jobId, payload, config = {}) {
    return api("delete", PATHS.employer.jobLanguage(jobId), payload, config);
}
export function deleteEmployerJob(jobId, config = {}) {
    return api("delete", PATHS.employer.jobById(jobId), null, config);
}

/**
 * Employer Profile
 */
export function getEmployerProfile(config = {}) {
    return api("get", PATHS.employer.profile, null, config);
}

export function updateEmployerProfile(payload, config = {}) {
    return api("put", PATHS.employer.profile, payload, config);
}

/**
 * Employer Logo
 */
export function getEmployerLogo(config = {}) {
    return api("get", PATHS.employer.logo, null, config);
}

export function deleteEmployerLogo(config = {}) {
    return api("delete", PATHS.employer.logo, null, config);
}


export function updateEmployerLogo(formData) {
    return api("put", PATHS.employer.logo, formData);
}
/**
 * Applications
 * 
 */
export function listJobApplications(jobId, config = {}) {
    return api("get", PATHS.employer.jobApplications(jobId), null, config);
}

export function updateApplicationStatus(applicationId, payload, config = {}) {
    return api("patch", PATHS.employer.applicationById(applicationId), payload, config);
}
