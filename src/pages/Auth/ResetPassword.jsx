import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/auth.service";
import FormInput from "../../components/Main/FormInput";
import Button from "../../components/UI/Button";
import { passwordschema } from "../../utils/validation/authValidationjs";
import { useFormik } from "formik";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("vt");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) setError("Invalid reset link.");
  }, [token]);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      oldPassword: "",
    },
    validationSchema: passwordschema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit() {
    if (!token) return;
    setLoading(true);
    setMessage("");
    setError("");

    const response = await resetPassword(
      token,
      formik.values.newPassword,
      formik.values.oldPassword || undefined
    );

    if (response.ok) {
      setMessage("Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(response.message || "Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      <form onSubmit={formik.handleSubmit}>
        <FormInput
          label="New Password"
          type="password"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />

        <FormInput
          label="Old Password (optional)"
          type="password"
          name="oldPassword"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <Button type="submit" loading={loading}>
          Reset Password
        </Button>
      </form>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
