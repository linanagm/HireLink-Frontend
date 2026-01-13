import * as Yup from "yup";




export const talentOnboardingSchema = Yup.object({
    profileImage: Yup.mixed()
        .test(
            "fileType",
            "Invalid file",
            (value) => !value || value instanceof File
        )
        .optional(),

    jobTitle: Yup.string()
        .min(2, "Job title is required")
        .required("Job title is required"),


    location: Yup.string()
        .min(2, "Location is required"),


    resume: Yup.mixed().optional(), // file upload

    skills: Yup.array()
        .of(Yup.string().min(1))
        .min(1, "At least one skill is required")
        .required("Skills are required"),



    jobType: Yup.string()
        .oneOf(["Full-time", "Part-time", "Freelance"])
        .required("Job type is required"),


    environment: Yup.string()
        .oneOf(["Remote", "Hybrid", "On-site"])
        .required("Environment is required"),



    socialLinks: Yup.array().of(
        Yup.string()
            .trim()
            .transform((value) => {
                if (!value) return "";
                if (/^https?:\/\//i.test(value)) return value;
                return `https://${value}`;
            })
            .url("Invalid URL")
    ),

    bio: Yup.string()
        .min(10, "Bio is too short")
        .max(500)
        .optional(),
});
