export const JOB_MODES = {
    RECENT: "recent",
    RECOMMENDED: "recommended",
};

export function normalizeJobsMode(value) {
    return value === JOB_MODES.RECOMMENDED ? JOB_MODES.RECOMMENDED : JOB_MODES.RECENT;
}
