
// services/talent.service.js
import { request } from "./auth.service";

export const updateProfile = (payload) => request("put", "/talent/profile", payload);

//get jobs
export function getJobs(params = {}) {
    return request("get", "/jobs", null, { params });
};

export const uploadAvatar = (file) => {
    const fd = new FormData();
    fd.append("avatar", file);
    return request("put", "/talent/avatar", fd);
}

export const uploadResume = (file) => {
    const fd = new FormData();
    fd.append("resume", file);
    return request("put", "/talent/resume", fd);
}

export const getCurrent = () => request("get", "/talent/profile");

export const getAvatarUrl = (width = 80, height = 80) =>
    request("get", `/talent/avatar?width=${width}&height=${height}`);


