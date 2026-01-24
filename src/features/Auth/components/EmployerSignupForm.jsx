import { useFormik } from "formik";
import { useState } from "react";
import { register } from "../../../services/auth.service";
import { EmployerRegisterSchema } from "../../../utils/validation/authValidationjs";

/**
 * EmployerSignupForm is a component that handles the employer signup functionality.
 * It uses the useFormik hook to create a form with name, email, password, and confirm password fields.
 * It uses the register function from the auth.service to authenticate the employer.
 * It saves the employer's authentication token and full user info (including role) on success.
 * It navigates to the appropriate dashboard based on the employer's role.
 * It shows an error message if the employer login fails.
 * It shows a loading indicator while the employer login is in progress.
 * It shows a link to the forgot password page.
 * It shows a link to the home page.
 * It shows an error message if the API returns an error.
 * @param {Object} props - An object containing the role and onSuccess function.
 * @param {String} role - The role of the employer.
 * @param {Function} onSuccess - A function to be called on signup success.
 */
export default function EmployerSignupForm({ role, onSuccess }) {
	//const navigate = useNavigate();
	const [apiError, setApiError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	async function handleRegister(values) {
		setApiError("");
		setIsLoading(true);

		const { rePassword: _, ...rest } = values;

		const payload = {
			email: rest.email,
			password: rest.password,
			role: role.toUpperCase(),
			profileData: {
				companyName: rest.name,
			},
		};

		const response = await register(payload);
		setIsLoading(false);

		if (!response.ok) {
			setApiError(response.message);
			return;
		}

		if (onSuccess) onSuccess(values.email);
	}

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			rePassword: "",
		},
		validationSchema: EmployerRegisterSchema,
		onSubmit: handleRegister,
	});

	return (
		<form onSubmit={formik.handleSubmit} className="font-sans pt-2">
			{/* Company Name */}
			<div className="mb-5">
				<label
					htmlFor="name"
					className="block mb-2.5 text-sm font-medium text-heading"
				>
					Company Name
				</label>

				<input
					id="name"
					type="text"
					{...formik.getFieldProps("name")}
					className="bg-neutral-secondary-medium border border-default-medium rounded w-full px-3 py-3"
					placeholder="Company Name"
				/>

				{formik.touched.name && formik.errors.name && (
					<div className="bg-red-50 text-red-800 p-2 rounded mt-1 text-sm">
						{formik.errors.name}
					</div>
				)}
			</div>

			{/* Email */}
			<div className="mb-5">
				<label
					htmlFor="email"
					className="block mb-2.5 text-sm font-medium text-heading"
				>
					Business Email Address
				</label>

				<input
					id="email"
					type="email"
					{...formik.getFieldProps("email")}
					className="bg-neutral-secondary-medium border border-default-medium rounded w-full px-3 py-3"
					placeholder="Business Email Address"
				/>

				{formik.touched.email && formik.errors.email && (
					<div className="bg-red-50 text-red-800 p-2 rounded mt-1 text-sm">
						{formik.errors.email}
					</div>
				)}
			</div>

			{/* Password */}
			<div className="mb-5 relative">
				<label
					htmlFor="password"
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
					className="absolute right-3 top-2/3 -translate-y-1/2 cursor-pointer text-gray-500"
				>
					{showPassword ? (
						<i className="fa-regular fa-eye"></i>
					) : (
						<i className="fa-regular fa-eye-slash"></i>
					)}
				</button>

				{formik.touched.password && formik.errors.password && (
					<div className="bg-red-50 text-red-800 p-2 rounded mt-1 text-sm">
						{formik.errors.password}
					</div>
				)}
			</div>

			{/* Confirm Password */}
			<div className="mb-5">
				<label
					htmlFor="rePassword"
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
					<div className="bg-red-50 text-red-800 p-2 rounded mt-1 text-sm">
						{formik.errors.rePassword}
					</div>
				)}
			</div>

			{/* Submit */}
			<button
				type="submit"
				className="bg-fuchsia-700 w-full hover:bg-fuchsia-800 text-white py-2.5 rounded"
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
