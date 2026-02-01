import * as yup from "yup";

export const headerSchema = yup.object({
    companyName: yup
        .string()
        .trim()
        .min(1, "please enter a company name more than 1 character")
        .optional(),
    location: yup.string().min(1, "please enter a location more than 1 character").trim().optional(),
});

export const aboutSchema = yup.object({
    description: yup
        .string()
        .trim()
        .min(1, "please enter a description more than 1 character")
        .max(1000, "please enter a description less than 1000 characters")
        .optional(),
});

export const overviewSchema = yup.object({
    website: yup
        .string()
        .trim()
        .url("please enter a valid url: https://example.com")
        .optional()
        .nullable()

        .transform((v) => (v === "" ? null : v)),// if empty string, set to null
});
