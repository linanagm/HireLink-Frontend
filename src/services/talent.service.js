import { PATHS } from "../constants/apiPaths";
import { api } from "../lib/api";


// *********************** talent profile services ***********
//get profile
export function getTalentProfile() {
    return api("get", PATHS.talent.profile);
}

//update profile
export function updateTalentProfile(payload) {
    return api("put", PATHS.talent.profile, payload);
}

//update skills
export function setTalentSkills(payload) {
    return api("put", PATHS.talent.skills, payload);
}

//update languages
export function setTalentLanguages(payload) {
    return api("put", PATHS.talent.languages, payload);
}
//get profile picture
export function getTalentAvatar() {
    return api("get", "/talent/profile");
}

// upload profile picture
export function uploadTalentAvatar(file) {

    return api("put", PATHS.talent.avatar, file, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}

// upload resume
export function uploadTalentResume(file) {
    const form = new FormData();
    form.append("resume", file);
    return api("put", PATHS.talent.resume, form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}

//get resume
export function getTalentResume() {
    return api("get", PATHS.talent.resume);
}

//delete
export function deleteTalentResume() {
    return api("delete", PATHS.talent.resume);
}


// *********************** talent with jobs services *********************** 
//get jobs
export function getJobs(params = {}) {
    return api("get", PATHS.jobs.jobsList, null, { params });
};

//get job by id -> job details
export function getJobById(id) {
    return api("get", PATHS.jobs.jobDetails(id));
}

//apply to job -> job proposal
export function applyToJob(id, payload) {
    return api("post", PATHS.jobs.jobPropsal(id), payload);
}

// ********************** talent with applications services ********************
// get applications
export function getMyApplications(params = {}) {
    return api("get", PATHS.talent.applications, null, { params });
}




