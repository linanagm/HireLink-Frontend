import { useState } from "react";
import { requestPasswordReset } from "../../services/auth.service";
import FormInput from "../../components/Main/FormInput";
import Button from "../../components/UI/Button";
import { useFormik } from "formik";
import { emailschema } from "../../utils/validation/authValidationjs";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    } else {
      setError(response.message || "Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>

      <form onSubmit={formik.handleSubmit}>
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

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
