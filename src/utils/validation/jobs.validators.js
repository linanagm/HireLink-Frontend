import * as Yup from "yup";


export const proposalSchema = Yup.object({
    coverLetter: Yup.string().trim(),
    resumeUrl: Yup.string().trim().url("Invalid URL"),
});

export const postJobSchema = Yup.object({
    title: Yup.string().trim().min(2, "Title is too short").required("Required"),
    description: Yup.string()
        .trim()
        .min(2, "Description is too short")
        .required("Required"),
    location: Yup.string().trim().nullable(),
    jobType: Yup.string().required("Required"),
    experienceLevel: Yup.string().required("Required"),
    salary: Yup.number()
        .transform((v, raw) => (raw === "" ? undefined : v))
        .integer("Must be integer")
        .min(0, "Must be >= 0")
        .optional(),

    requiredSkills: Yup.array().of(
        Yup.object({
            name: Yup.string().trim(),
            required: Yup.boolean(),
        }),
    ),

    requiredLanguages: Yup.array().of(
        Yup.object({
            name: Yup.string().trim(),
            minimumProficiency: Yup.string().required(),
            required: Yup.boolean(),
        }),
    ),
});