import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { EmployerRegisterSchema } from "../../utils/validation/authValidationjs";
import { register } from "../../services/authService";

export default function EmployerSignupForm({ role }) {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister(values) {
    setApiError("");
    setIsLoading(true);

    // eslint-disable-next-line no-unused-vars
    const { rePassword, ...rest } = values;

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

    navigate("/register/signup-success");
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
        <label className="block mb-2.5 text-sm font-medium text-heading">
          Company Name
        </label>

        <input
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
        <label className="block mb-2.5 text-sm font-medium text-heading">
          Business Email Address
        </label>

        <input
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
        <label className="block mb-2.5 text-sm font-medium text-heading">
          Password
        </label>

        <input
          type={showPassword ? "text" : "password"}
          {...formik.getFieldProps("password")}
          className="bg-neutral-secondary-medium border border-default-medium rounded w-full px-3 py-2.5"
          placeholder="••••••••"
        />

        <span
          onClick={() => setShowPassword((p) => !p)}
          className="absolute right-3 top-2/3 -translate-y-1/2 cursor-pointer text-gray-500"
        >
          {showPassword ? (
            <i className="fa-regular fa-eye"></i>
          ) : (
            <i className="fa-regular fa-eye-slash"></i>
          )}
        </span>

        {formik.touched.password && formik.errors.password && (
          <div className="bg-red-50 text-red-800 p-2 rounded mt-1 text-sm">
            {formik.errors.password}
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-5">
        <label className="block mb-2.5 text-sm font-medium text-heading">
          Confirm Password
        </label>

        <input
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
        {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Sign Up"}
      </button>

      {apiError && (
        <p className="text-red-600 mt-3 text-sm">Error: {apiError}</p>
      )}
    </form>
  );
}
