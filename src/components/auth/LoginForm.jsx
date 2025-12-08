import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { login } from '../../services/authService';
import { LoginSchema } from '../../utils/validation/authValidationjs';
import { useAuth } from '../../hooks/useAuth';
import { getCurrentUser } from '../../services/token.service';

export default function LoginForm() {
  const { saveLogin } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const [apiError, setApiError] = useState('');

  // Function to navigate based on role
  const navigateByRole = (role) => {
    if (role === 'TALENT') {
      navigate('/talent/findjob');
    } else if (role === 'EMPLOYER') {
      navigate('/employer/dashboard');
    } else {
      navigate('/');
    }
  };


  
  // Handle login submission
  const handleLogin = async (formValues) => {
    setIsLoading(true);
    setApiError('');

    try {
      const data = await login(formValues);

      if (!data.success) {
        setApiError(data.message || 'Login failed. Please try again.');
        setIsLoading(false);
        return;
      }

      // Successful login
      saveLogin(data.data.token, rememberMeChecked);
      navigateByRole(getCurrentUser( data.data.token).role);
    } catch (error) {
      console.error('Login error:', error);
      setApiError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: handleLogin,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="font-sans pt-2">
      {/* Email Field */}
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">
          Your email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded border-slate-300 focus:ring-brand focus:border-brand block w-full px-3 py-3 shadow-xs placeholder:text-body"
          placeholder="Enter your email"
          aria-describedby={formik.errors.email && formik.touched.email ? 'email-error' : undefined}
        />
        {formik.errors.email && formik.touched.email && (
          <div id="email-error" className="p-4 -mt-2 mb-4 text-sm bg-red-50 text-red-800 rounded-lg">
            <span className="font-medium">Alert!</span> {formik.errors.email}
          </div>
        )}
      </div>

      {/* Password Field */}
      <div className="relative mb-5">
        <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">
          Your password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded border-slate-300 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="••••••••"
          aria-describedby={formik.errors.password && formik.touched.password ? 'password-error' : undefined}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer text-gray-500 focus:outline-none"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <i className="fa-regular fa-eye"></i>
          ) : (
            <i className="fa-regular fa-eye-slash"></i>
          )}
        </button>
        {formik.errors.password && formik.touched.password && (
          <div id="password-error" className="p-4 mb-4 mt-2 text-sm bg-red-50 text-red-800 rounded-lg">
            {formik.errors.password}
          </div>
        )}
      </div>

      {/* Remember Me and Forgot Password */}
      <div className="text-sm flex items-center justify-between py-3 mb-3">
        <label className="flex items-center text-md text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMeChecked}
            onChange={() => setRememberMeChecked((prev) => !prev)}
            className="mr-2"
            aria-label="Remember me"
          />
          Remember me
        </label>
        <NavLink to="/forgot-password" className="text-red-700 hover:underline hover:text-red-600">
          Forgot password?
        </NavLink>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-fuchsia-700 w-full hover:bg-fuchsia-800 text-white border rounded focus:ring-4 focus:ring-brand-medium shadow-xs font-medium text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Login'}
      </button>

      {/* Sign Up Link */}
      <div className="w-full flex items-center justify-center mt-4">
        <p className="text-slate-700 text-xs">
          Don't have an account?{' '}
          <Link to="/register" className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-400">
            Sign Up
          </Link>
        </p>
      </div>

      {/* API Error */}
      {apiError && (
        <p className="font-small text-red-600 mt-2" role="alert">
          Error! {apiError}
        </p>
      )}
    </form>
  );
}
