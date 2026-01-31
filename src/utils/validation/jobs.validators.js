import * as Yup from "yup";

export const proposalSchema = Yup.object({
	coverLetter: Yup.string().trim(),
	resumeUrl: Yup.string().trim().url("Invalid URL"),
});

export const postJobSchema = Yup.object({
	title: Yup.string().trim().min(2, "Title is too short").required("Job title is required"),
	description: Yup.string()
		.trim()
		.min(2, "Description is too short")
		.required("Required"),
	responsibilities: Yup.array().of(Yup.string().trim()),
	location: Yup.string().trim().nullable(),
	jobType: Yup.string().required("Job type is required"),

	experienceLevel: Yup.string().required("Required"),
	salary: Yup.number()
		.transform((v, raw) => (raw === "" ? undefined : v))
		.integer("Salary must be integer")
		.min(0, "Salary must be at least positive number")
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
