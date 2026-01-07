import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLogo from "../../../components/Admin/AdminLogo";
import { useAuth } from "../../../hooks/useAuth";
import { adminLogin, getAdminMe } from "../../../services/admin.service";
import { LoginSchema } from "../../../utils/validation/authValidationjs";

export default function AdminLogin() {
	const { saveLogin } = useAuth();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMeChecked, setRememberMeChecked] = useState(false);
	const [apiError, setApiError] = useState("");

	const navigateAdmin = (adminData) => {
		const role = adminData?.role;

		if (role === "MODERATOR" || role === "ADMIN") {
			navigate("/admin/dashboard");
		} else {
			navigate("/forbidden");
		}
	};

	const handleAdminLogin = async (formValues) => {
		setIsLoading(true);
		setApiError("");

		try {
			const res = await adminLogin(formValues);

			if (!res.ok) {
				setApiError(res.message || "Admin login failed.");
				return;
			}

			const token = res.data?.token;
			if (!token) {
				setApiError("Unexpected response (missing token).");
				return;
			}

			const storage = rememberMeChecked ? localStorage : sessionStorage;
			storage.setItem("admin_token", token);

			const me = await getAdminMe(token);

			if (!me.ok) {
				setApiError(me.message || "Could not load admin profile.");
				return;
			}

			storage.setItem("admin_user", JSON.stringify(me.data));
			saveLogin(token, rememberMeChecked);

			if (me.ok) {
				saveLogin(token, rememberMeChecked, me.data);
				console.log("role: ", me.data);
				navigateAdmin(me.data);
			}
		} catch (err) {
			console.log("admin login error:", err);
			setApiError("Something went wrong. Try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const formik = useFormik({
		initialValues: { email: "", password: "" },
		validationSchema: LoginSchema,
		onSubmit: handleAdminLogin,
	});

	return (
		<>
			<Helmet>
				<title>Admin Portal</title>
				<meta name="description" content="Helmet application" />
			</Helmet>

			<form
				onSubmit={formik.handleSubmit}
				className="font-sans  pt-2 w-1/3 mx-auto mt-40 bg-slate-100 bg-opacity-85 rounded-md p-5 shadow-xl "
			>
				<div className="mb-6">
					<AdminLogo variant="inline " />
				</div>

				{/* Email */}
				<div className="mb-5">
					<label className="block mb-2.5 text-sm font-medium text-heading">
						Your email
					</label>
					<input
						type="email"
						{...formik.getFieldProps("email")}
						className="bg-neutral-secondary-medium border border-default-medium text-sm rounded w-full px-3 py-3"
						placeholder="Enter your email"
					/>
					{formik.touched.email && formik.errors.email && (
						<div className="p-3 mt-1 bg-red-50 text-red-800 rounded">
							{formik.errors.email}
						</div>
					)}
				</div>

				{/* Password */}
				<div className="relative mb-5">
					<label className="block mb-2.5 text-sm font-medium text-heading">
						Your password
					</label>

					<input
						type={showPassword ? "text" : "password"}
						{...formik.getFieldProps("password")}
						className="bg-neutral-secondary-medium border text-sm rounded w-full px-3 py-2.5"
						placeholder="••••••••"
					/>

					<button
						type="button"
						onClick={() => setShowPassword((prev) => !prev)}
						className="absolute right-3 top-2/3 -translate-y-1/2 text-gray-500"
					>
						{showPassword ? (
							<i className="fa-regular fa-eye "></i>
						) : (
							<i className="fa-regular fa-eye-slash"></i>
						)}
					</button>

					{formik.touched.password && formik.errors.password && (
						<div className="p-3 mt-1 bg-red-50 text-red-800 rounded">
							{formik.errors.password}
						</div>
					)}
				</div>

				{/* Remember + Forgot */}
				<div className="flex items-center justify-between text-sm mb-3">
					<label className="flex items-center text-slate-700 cursor-pointer">
						<input
							type="checkbox"
							checked={rememberMeChecked}
							onChange={() => setRememberMeChecked((prev) => !prev)}
							className="mr-2"
						/>
						Remember me
					</label>

					<button
						type="button"
						onClick={() => navigate("/forgot-password")}
						className="text-red-700 hover:underline"
					>
						Forgot password?
					</button>
				</div>

				{/* Submit */}
				<button
					type="submit"
					disabled={isLoading}
					className="bg-fuchsia-700 w-full text-white rounded py-2.5 hover:bg-fuchsia-800 disabled:opacity-50"
				>
					{isLoading ? (
						<i className="fa-solid fa-spinner fa-spin"></i>
					) : (
						"Login"
					)}
				</button>

				{/* Signup link */}
				<div className="text-center mt-4">
					<p className="text-xs text-slate-700">
						Back to{" "}
						<Link to="/" className="text-blue-600 hover:underline">
							Home <i className="fa-solid fa-arrow-right"></i>
						</Link>
					</p>
				</div>

				{/* API Error */}
				{apiError && (
					<p className="text-red-600 mt-3 text-sm" role="alert">
						Error: {apiError}
					</p>
				)}
			</form>
		</>
	);
}
