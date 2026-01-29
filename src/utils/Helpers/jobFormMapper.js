


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


/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Maps an API job object to a Formik values object.
 * This function takes an API job object as an argument and returns a Formik values object.
 * The Formik values object has the following properties: title, description, location, jobType, experienceLevel, salary, requiredSkills, and requiredLanguages.
 * The requiredSkills and requiredLanguages properties are arrays of objects with the following structure: { name, required }.
 * The name property is a string representing the name of the skill or language.
 * The required property is a boolean indicating whether the skill or language is required.
 * @param {Object} job API job object
 */
/*******  87601b5b-bc08-495a-81eb-de9548fa2279  *******/
export function mapApiJobToFormik(job) {
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Maps an API job object to a Formik values object.
 * @param {Object} job API job object
 * @returns {Object} Formik values object
 * @example
 * const job = {
 *   title: "Job Title",
 *   description: "Job Description",
 *   location: "Job Location",
 *   jobType: "FULL_TIME",
 *   experienceLevel: "FRESH",
 *   salary: 10000,
 *   requiredSkills: [
 *     { required: true, skill: { name: "Skill 1" } },
 *     { required: false, skill: { name: "Skill 2" } },
 *   ],
 *   requiredLanguages: [
 *     { required: true, language: { name: "Language 1" }, minimumProficiency: "INTERMEDIATE" },
 *     { required: false, language: { name: "Language 2" }, minimumProficiency: "BASIC" },
 *   ],
 * };
 *
 * const formikValues = mapApiJobToFormik(job);
 * console.log(formikValues);
 * // {
 * //   title: "Job Title",
 * //   description: "Job Description",
 * //   location: "Job Location",
 * //   jobType: "FULL_TIME",
 * //   experienceLevel: "FRESH",
 * //   salary: "10000",
 * //   requiredSkills: [
 * //     { name: "Skill 1", required: true },
 * //     { name: "Skill 2", required: false },
 * //   ],
 * //   requiredLanguages: [
 * //     { name: "Language 1", minimumProficiency: "INTERMEDIATE", required: true },
 * //     { name: "Language 2", minimumProficiency: "BASIC", required: false },
 * //   ],
 * // }
/*******  17b4af19-ad7a-490e-9229-577b5ebcc869  *******/    return {
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
