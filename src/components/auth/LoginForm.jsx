
//**************************1 refactor ******************** */
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { getUser, login } from "../../services/authService";
import { LoginSchema } from "../../utils/validation/authValidationjs";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const { saveLogin } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigateByRole = (role) => {
    switch (role) {
      case "TALENT":
        navigate("/talent/findjob");
        break;
      case "EMPLOYER":
        navigate("/employer/dashboard");
        break;
      default:
        navigate("/");
    }
  };


const handleLogin = async (formValues) => {
  setIsLoading(true);
  setApiError("");

  try {
    const response = await login(formValues);

    if (!response.ok) {
      setApiError(response.message || "Login failed.");
      setIsLoading(false);
      return;
    }

    const token = response.data.token;
    if (!token) {
      setApiError("Unexpected server response.");
      setIsLoading(false);
      return;
    }

    // Save token first
    saveLogin(token, rememberMeChecked);

    // Fetch full user info including role
    const me = await getUser();

    if (me.ok) {
      saveLogin(token, rememberMeChecked, me.data);

      navigateByRole(me.data.role);
    } else {
      navigate("/");
    }
  } catch (error) {
    console.log('loginform : ', error);
    
    setApiError("Something went wrong. Try again.");
  } finally {
    setIsLoading(false);
  }
};


  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: handleLogin,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="font-sans pt-2">
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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? (
            <i className="fa-regular fa-eye"></i>
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

        <NavLink
          to="/forgot-password"
          className="text-red-700 hover:underline"
        >
          Forgot password?
        </NavLink>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-fuchsia-700 w-full text-white rounded py-2.5 hover:bg-fuchsia-800 disabled:opacity-50"
      >
        {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
      </button>

      {/* Signup link */}
      <div className="text-center mt-4">
        <p className="text-xs text-slate-700">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign Up
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
  );
}
