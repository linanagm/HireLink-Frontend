import * as Yup from "yup";


export const proposalSchema = Yup.object({
    duration: Yup.string().trim(),
    hourlyRate: Yup.number()
        .transform((val, original) => (original === "" ? undefined : val))
        .min(1, "Must be at least 1"),

    coverLetter: Yup.string().trim(),
    resumeUrl: Yup.string().trim().url("Invalid URL"),
});
