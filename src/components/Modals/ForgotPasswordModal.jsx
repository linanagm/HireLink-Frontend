import { useState } from "react";
import { requestPasswordReset } from "../../services/auth.service";
import FormInput from "../UI/FormInput.jsx";
import Button from "../UI/Button";
import { useFormik } from "formik";
import { emailschema } from "../../utils/validation/authValidationjs";
import { getMailProviderUrl } from "../../utils/mail.js";

export default function ForgotPasswordModal({ onClose }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailschema,
    onSubmit: handleResetPassword,
  });

  async function handleResetPassword() {
    setLoading(true);
    setMessage("");
    setError("");

    const response = await requestPasswordReset(formik.values.email);

    if (response.ok) {
      setMessage(response.message);
      setSubmittedEmail(formik.values.email);
    } else {
      setError(response.message || "Something went wrong");
    }

    setLoading(false);
  }
  const providerUrl = getMailProviderUrl(submittedEmail);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]">
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md ">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-900 text-2xl"
        >
          ×
        </button>

        <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>

        {/* Form */}
        {message === "" && (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <FormInput
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />

            <Button type="submit" loading={loading}>
              Send Reset Link
            </Button>
          </form>
        )}

        {/* Success or Error */}

        {message && (
          <>
            <p className="text-green-600 mt-4 text-center">{message}</p>

            {providerUrl && (
              <a
                href={providerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center bg-fuchsia-700 text-white py-2 rounded-xl hover:bg-fuchsia-500"
              >
                Open Email
              </a>
            )}
          </>
        )}

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
