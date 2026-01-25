// src/services/moderation.service.js

import { PATHS } from "../constants/apiPaths";
import { api } from "../lib/api";

/* ===================== STATS ===================== */

export function getModerationStats(config = {}) {
    return api("get", PATHS.moderation.stats, null, config);
}

/* ===================== USERS ===================== */

export function listModerationUsers(config = {}) {
    // pagination تبقى في config.params
    return api("get", PATHS.moderation.users, null, config);
}

export function setModerationUserActive(userId, payload, config = {}) {
    // payload = { isActive: boolean }
    return api("patch", PATHS.moderation.userActive(userId), payload, config);
}

export function deleteModerationUser(userId, config = {}) {
    return api("delete", PATHS.moderation.userById(userId), null, config);
}

/* ===================== JOBS ===================== */

export function listModerationJobs(config = {}) {
    return api("get", PATHS.moderation.jobs, null, config);
}

export function deleteModerationJob(jobId, config = {}) {
    return api("delete", PATHS.moderation.jobById(jobId), null, config);
}
