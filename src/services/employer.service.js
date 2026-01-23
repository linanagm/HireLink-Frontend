import { employerPaths } from "../constants/apiPaths";
import { api } from "../lib/api";

/**
 * Employer Profile
 */
export function getEmployerProfile() {
    return api.get(employerPaths.profile);
}

export function updateEmployerProfile(payload) {
    // payload: { companyName, companyWebsite, companyLocation }
    return api.put(employerPaths.profile, payload);
}

/**
 * Employer Logo
 */
export function getEmployerLogo() {
    return api.get(employerPaths.logo);
}

export function deleteEmployerLogo() {
    return api.delete(employerPaths.logo);
}

export function updateEmployerLogo(file) {
    // file: File
    const formData = new FormData();
    formData.append("logo", file);

    return api.put(employerPaths.logo, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}

/**
 * Employer Jobs
 */
export function listEmployerJobs() {
    return api.get(employerPaths.jobs);
}

export function getEmployerJob(jobId) {
    return api.get(employerPaths.jobById(jobId));
}

export function createEmployerJob(payload) {
    // payload: { title, description, location, jobType, experienceLevel, salary }
    return api.post(employerPaths.jobs, payload);
}

export function updateEmployerJob(jobId, payload) {
    return api.put(employerPaths.jobById(jobId), payload);
}

export function deleteEmployerJob(jobId) {
    return api.delete(employerPaths.jobById(jobId));
}

/**
 * Applications
 */
export function listJobApplications(jobId) {
    return api.get(employerPaths.jobApplications(jobId));
}

export function updateApplicationStatus(applicationId, payload) {
    // payload: { status }
    return api.patch(employerPaths.applicationById(applicationId), payload);
}
