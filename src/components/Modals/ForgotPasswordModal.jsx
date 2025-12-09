// import { useState } from "react";
// import { requestPasswordReset } from "../../services/auth.service";
// import FormInput from "../Main/FormInput";
// import Button from "../UI/Button";
// import { useFormik } from "formik";
// import { emailschema } from "../../utils/validation/authValidationjs";

// export default function ForgotPassword() {
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const formik = useFormik({
//     initialValues: { email: "" },
//     validationSchema: emailschema,
//     onSubmit: handleResetPassword,
//   });

//   async function handleResetPassword() {
//     setLoading(true);
//     setMessage("");
//     setError("");

//     const response = await requestPasswordReset(formik.values.email);

//     if (response.ok) {
//       setMessage(response.message);
//     } else {
//       setError(response.message || "Something went wrong");
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>

//       <form onSubmit={formik.handleSubmit}>
//         <FormInput
//           label="Email"
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           required
//         />

//         <Button type="submit" loading={loading}>
//           Send Reset Link
//         </Button>
//       </form>

//       {message && <p className="text-green-600 mt-4">{message}</p>}
//       {error && <p className="text-red-600 mt-4">{error}</p>}
//     </div>
//   );
// }

import { useState } from "react";
import { requestPasswordReset } from "../../services/auth.service";
import FormInput from "../Main/FormInput";
import Button from "../UI/Button";
import { useFormik } from "formik";
import { emailschema } from "../../utils/validation/authValidationjs";

export default function ForgotPasswordModal({ onClose  }) {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]">
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md">

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
        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
