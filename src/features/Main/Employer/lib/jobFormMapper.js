// src/features/employer/jobs/lib/jobFormMapper.js

const cleanStr = (v) => (v ?? "").toString().trim();

const toIntOrNull = (v) => {
    if (v === "" || v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : null;
};

export function mapFormikToJobPayload(values) {
    return {
        title: cleanStr(values.title),
        description: cleanStr(values.description),
        location: cleanStr(values.location) || null,
        jobType: values.jobType,
        experienceLevel: values.experienceLevel,
        salary: toIntOrNull(values.salary),

        requiredSkills: (values.requiredSkills || [])
            .map((s) => ({
                name: cleanStr(s.name),
                required: !!s.required,
            }))
            .filter((s) => s.name.length),

        requiredLanguages: (values.requiredLanguages || [])
            .map((l) => ({
                name: cleanStr(l.name),
                minimumProficiency: l.minimumProficiency,
                required: !!l.required,
            }))
            .filter((l) => l.name.length),
    };
}

export function mapApiJobToFormik(job) {
    return {
        title: job?.title ?? "",
        description: job?.description ?? "",
        location: job?.location ?? "",
        jobType: job?.jobType ?? "FULL_TIME",
        experienceLevel: job?.experienceLevel ?? "FRESH",
        salary: job?.salary ?? "",

        // API غالبًا بيرجع requiredSkills بصيغة join model:
        // [{ required, skill: { name } }] أو ممكن { name }
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
