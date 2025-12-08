import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../../services/authService.js";
import FormInput from "../../components/Main/FormInput.jsx";
import Button from "../../components/UI/Button.jsx";
import { passwordschema } from "../../utils/validation/authValidationjs.js";
import { useFormik } from "formik";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verificationToken = searchParams.get("vt");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  let formik = useFormik({
    initialValues: {
      newPassword: '',
      oldPassword: ''
    },
    validationSchema: passwordschema,
    onSubmit:handleResetPassword
  })


  useEffect(() => {
    if (!verificationToken) setError("Invalid reset link");
  }, [verificationToken]);

  async function handleResetPassword() {
    setLoading(true);
    try {
      const res = await resetPassword(verificationToken, formik.values.newPassword, formik.values.oldPassword || undefined);
      setMessage(res.data.message);

      // redirect to login after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  
  };
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormInput
          label="New Password"
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        <FormInput
          label="Old Password (Optional)"
          type="password"
          name="oldPassword"
          placeholder="Enter old password if required"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Button  type="submit" loading={loading}>
            
            Reset Password</Button>
      </form>
      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
