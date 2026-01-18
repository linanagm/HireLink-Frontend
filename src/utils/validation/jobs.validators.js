import * as Yup from "yup";

// export const proposalSchema = Yup.object({
//     duration: Yup.string()
//         .min(1)
//         .describe("The duration of the job proposal in months"),
//     hourlyRate: Yup.number()
//         .min(1)
//         .describe("The hourly rate of the job proposal"),
//     coverLetter: Yup.string()
//         .min(1)
//         .describe("A cover letter submitted with the application"),
//     resumeUrl: Yup.string()
//         .url()
//         .describe("A URL to the applicant's resume"),
// });

export const proposalSchema = Yup.object({
    duration: Yup.string().trim(),
    hourlyRate: Yup.number()
        .transform((val, original) => (original === "" ? undefined : val))
        .min(1, "Must be at least 1"),

    coverLetter: Yup.string().trim(),
    resumeUrl: Yup.string().trim().url("Invalid URL"),
});
