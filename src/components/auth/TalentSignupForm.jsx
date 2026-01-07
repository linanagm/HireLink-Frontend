import { useFormik } from "formik";
import { useState } from "react";
import { register } from "../../services/auth.service";
import { splitName } from "../../utils/tools";
import { TalentRegisterSchema } from "../../utils/validation/authValidationjs";

export default function TalentSignupForm({ role, onSuccess }) {
	const [apiError, setApiError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	async function handleRegister(values) {
		setApiError("");
		setIsLoading(true);

		const { rePassword: _, ...rest } = values;

		const payload = {
			...rest,
			role,
			profileData: {
				firstName: splitName(values.name).firstName,
				lastName: splitName(values.name).lastName,
			},
		};

		const response = await register(payload);
		setIsLoading(false);

		if (!response.ok) {
			setApiError(response.message);
			return;
		}

		//navigate("/register/signup-success");
		if (onSuccess) onSuccess(values.email); //open success model
	}

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			rePassword: "",
		},
		validationSchema: TalentRegisterSchema,
		onSubmit: handleRegister,
	});

	return (
		<form onSubmit={formik.handleSubmit} className="font-sans pt-2">
			{/* Name */}
			<div className="mb-5">
				<label
					for="name"
					className="block mb-2.5 text-sm font-medium text-heading"
				>
					Your Name
				</label>

				<input
					id="name"
					type="text"
					{...formik.getFieldProps("name")}
					className="bg-neutral-secondary-medium border border-default-medium rounded w-full px-3 py-3"
					placeholder="Your Name"
				/>

				{formik.touched.name && formik.errors.name && (
					<div className="text-red-600 bg-red-50 p-2 mt-1 rounded">
						{formik.errors.name}
					</div>
				)}
			</div>

			{/* Email */}
			<div className="mb-5">
				<label
					for="email"
					className="block mb-2.5 text-sm font-medium text-heading"
				>
					Email
				</label>

				<input
					id="email"
					type="email"
					{...formik.getFieldProps("email")}
					className="bg-neutral-secondary-medium border border-default-medium rounded w-full px-3 py-3"
					placeholder="Email"
				/>

				{formik.touched.email && formik.errors.email && (
					<div className="text-red-600 bg-red-50 p-2 mt-1 rounded">
						{formik.errors.email}
					</div>
				)}
			</div>

			{/* Password */}
			<div className="mb-5 relative">
				<label
					for="password"
					className="block mb-2.5 text-sm font-medium text-heading"
				>
					Password
				</label>

				<input
					id="password"
					type={showPassword ? "text" : "password"}
					{...formik.getFieldProps("password")}
					className="bg-neutral-secondary-medium border border-default-medium rounded w-full px-3 py-2.5"
					placeholder="••••••••"
				/>

				<button
					type="button"
					onClick={() => setShowPassword((p) => !p)}
					className="absolute right-3 top-2/3 -translate-y-1/2 cursor-pointer"
				>
					{showPassword ? (
						<i className="fa-regular fa-eye"></i>
					) : (
						<i className="fa-regular fa-eye-slash"></i>
					)}
				</button>

				{formik.touched.password && formik.errors.password && (
					<div className="text-red-600 bg-red-50 p-2 mt-1 rounded">
						{formik.errors.password}
					</div>
				)}
			</div>

			{/* Confirm Password */}
			<div className="mb-5">
				<label
					for="rePassword"
					className="block mb-2.5 text-sm font-medium text-heading"
				>
					Confirm Password
				</label>

				<input
					id="rePassword"
					type="password"
					{...formik.getFieldProps("rePassword")}
					className="bg-neutral-secondary-medium border border-default-medium rounded w-full px-3 py-2.5"
					placeholder="Confirm Password"
				/>

				{formik.touched.rePassword && formik.errors.rePassword && (
					<div className="text-red-600 bg-red-50 p-2 mt-1 rounded">
						{formik.errors.rePassword}
					</div>
				)}
			</div>

			{/* Submit */}
			<button
				type="submit"
				className="bg-fuchsia-700 w-full text-white py-2.5 rounded hover:bg-fuchsia-800"
			>
				{isLoading ? (
					<i className="fa-solid fa-spinner fa-spin"></i>
				) : (
					"Sign Up"
				)}
			</button>

			{apiError && (
				<p className="text-red-600 mt-3 text-sm">Error: {apiError}</p>
			)}
		</form>
	);
}
