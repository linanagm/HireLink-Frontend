

import { request } from "./auth.service";


// *********************** talent profile services ***********

export function getTalentProfile() {
    return request("get", "/talent/profile");
}

export function updateTalentProfile(payload) {
    return request("put", "/talent/profile", payload);
}

export function setTalentSkills(payload) {
    return request("put", "/talent/skills", payload);
}

//get profile picture
export function getTalentAvatar() {
    return request("get", "/talent/profile");
}

//upload profile picture
export function uploadTalentAvatar(file) {
    const form = new FormData();
    // name must be the same as the backend 
    form.append("avatar", file);
    return request("put", "/talent/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}

export function uploadTalentResume(file) {
    const form = new FormData();
    form.append("resume", file);
    return request("put", "/talent/resume", form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}



// *********************** talent with jobs services *********************** 
//get jobs
export function getJobs(params = {}) {
    return request("get", "/jobs", null, { params });
};

export function getJobById(id) {
    return request("get", `/jobs/${id}`);
}

export function applyToJob(id, payload) {
    return request("post", `/jobs/${id}/apply`, payload);
}

// ********************** talent with applications services ********************
// get applications
export function getMyApplications(params = {}) {
    return request("get", "/talent/applications", null, { params });
}

// get application by id
export function getApplicationById(id) {
    return request("get", `/applications/${id}`);
}


// export const uploadAvatar = (file) => {
//     const fd = new FormData();
//     fd.append("avatar", file);
//     return request("put", "/talent/avatar", fd);
// }

// export const uploadResume = (file) => {
//     const fd = new FormData();
//     fd.append("resume", file);
//     return request("put", "/talent/resume", fd);
// }

// export const getCurrent = () => request("get", "/talent/profile");

// export const getAvatarUrl = (width = 80, height = 80) =>
//     request("get", `/talent/avatar?width=${width}&height=${height}`);


