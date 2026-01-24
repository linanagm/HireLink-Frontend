import * as Yup from "yup";

// // Base validation schema

export const emailschema = Yup.string()
	.email("Invalid email")
	.required("Email is required");

export const passwordschema = Yup.string()
	.min(8, "Password must be at least 8 characters")
	.max(32, "Password must be at most 32 characters")
	.matches(/[A-Z]/, "Password must include uppercase letters")
	.matches(/[a-z]/, "Password must include lowercase letters")
	.matches(/[0-9]/, "Password must include numbers")
	.matches(/[^A-Za-z0-9]/, "Password must include special characters")
	.matches(
		/^(?!.*(.)\1\1).*$/,
		"Password cannot contain three repeating characters",
	);


export const name = Yup.string().matches(
	/^\S+\s+\S+/,
	"Please enter your full name",
);

export const TalentRegisterSchema = Yup.object().shape({
	name: name.required("Name is required"),
	email: emailschema,
	password: passwordschema.required("Password is required"),
	rePassword: Yup.string().oneOf(
		[Yup.ref("password"), null],
		"Passwords must match",
	),
});

export const EmployerRegisterSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	email: emailschema,
	password: passwordschema.required("Password is required"),
	rePassword: Yup.string().oneOf(
		[Yup.ref("password"), null],
		"Passwords must match",
	),
});

export const LoginSchema = Yup.object().shape({
	email: emailschema,

	password: Yup.string()
		.min(2, "Required")
		.max(32, "must be at most 64 characters")
		.required("Password is required"),
});
