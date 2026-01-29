


/**
 * Maps Formik values to a job payload object.
 * @param {Object} values Formik values
 * @returns {Object} Job payload object
 */
export function mapFormikToJobPayload(values) {
    const payload = {
        title: values.title?.trim(),
        description: values.description?.trim(),
        location: values.location?.trim(),
        jobType: values.jobType,
        experienceLevel: values.experienceLevel,
        salary: values.salary === "" ? null : Number(values.salary),
        requiredSkills: values.requiredSkills || [],
        requiredLanguages: values.requiredLanguages || [],
    };

    // NEW: hoursPerWeek (safe)
    if (values.hoursPerWeek !== "" && values.hoursPerWeek != null) {
        payload.hoursPerWeek = Number(values.hoursPerWeek);
    }

    // NEW: responsibilities (safe)
    const resps = Array.isArray(values.responsibilities)
        ? values.responsibilities.map((r) => (r || "").trim()).filter(Boolean)
        : [];
    if (resps.length) {
        payload.responsibilities = resps;
    }

    // NEW: workType (safe)
    if (values.workType) {
        payload.workType = values.workType;
    }

    return payload;
}


export function mapApiJobToFormik(job) {
    return {
        title: job?.title ?? "",
        description: job?.description ?? "",
        location: job?.location ?? "",
        jobType: job?.jobType ?? "FULL_TIME",
        experienceLevel: job?.experienceLevel ?? "FRESH",
        salary: job?.salary ?? "",
        requiredSkills:
            job?.requiredSkills?.map((x) => ({
                name: x?.skill?.name ?? x?.name ?? "",
                required: x?.required ?? true,
            })) ?? [],

        requiredLanguages:
            job?.requiredLanguages?.map((x) => ({
                name: x?.language?.name ?? x?.name ?? "",
                minimumProficiency: x?.minimumProficiency ?? "BASIC",
                required: x?.required ?? true,
            })) ?? [],
    };
}
