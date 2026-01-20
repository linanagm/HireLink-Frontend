import { PATHS } from "../constants/apiPaths";
import { api } from "../lib/api";
import { request } from "./auth.service";


// *********************** talent profile services ***********

export function getTalentProfile() {
    return api("get", PATHS.talent.profile);
}

export function updateTalentProfile(payload) {
    return api("put", PATHS.talent.profile, payload);
}

export function setTalentSkills(payload) {
    return api("put", PATHS.talent.skills, payload);
}

//get profile picture
export function getTalentAvatar() {
    return request("get", "/talent/profile");
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



// *********************** talent with jobs services *********************** 
//get jobs
export function getJobs(params = {}) {
    return api("get", PATHS.jobs.jobsList, null, { params });
};


export function getJobById(id) {
    return api("get", PATHS.jobs.jobDetails(id));
}

export function applyToJob(id, payload) {
    return api("post", PATHS.jobs.jobPropsal(id), payload);
}

// ********************** talent with applications services ********************
// get applications
export function getMyApplications(params = {}) {
    return api("get", PATHS.talent.applications, null, { params });
}

// get application by id
export function getApplicationById(id) {
    return api("get", PATHS.applications.applicationDetails(id));
}




