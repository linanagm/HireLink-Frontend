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

export function createEmployerJob(payload, config = {}) {
    return api("post", PATHS.employer.jobs, payload, config);
}

export function updateEmployerJob(jobId, payload, config = {}) {
    return api("put", PATHS.employer.jobById(jobId), payload, config);
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

export function updateEmployerLogo(file, config = {}) {
    const formData = new FormData();
    formData.append("logo", file);

    return api("put", PATHS.employer.logo, formData, {
        ...config,
        headers: { ...(config.headers || {}), "Content-Type": "multipart/form-data" },
    });
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
