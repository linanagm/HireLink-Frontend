import { useState } from "react";
import { requestPasswordReset } from "../../services/authService.js";
import FormInput from "../../components/Main/FormInput";
import Button from "../../components/UI/Button";
import { useFormik } from "formik";
import { emailschema } from '../../utils/validation/authValidationjs.js';
import { Link } from "react-router-dom";



export default function ForgotPassword() {
  //const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
//  const navigate = useNavigate();


  const handleResetPassword = async () => {
    try {
      const res = await requestPasswordReset(formik.values.email);
      console.log('res : \n', res);
      
      setMessage(res.data.message);

    

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  

  let formik = useFormik({
    initialValues: {
      email: '',
      
    },
    validationSchema:emailschema,
    onSubmit: handleResetPassword
  })
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <form 
            onSubmit={formik.handleSubmit}
            
      >
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange} 
          onBlur={ formik.handleBlur}
          required
        />
        <Button type="submit" loading={loading}>
          <Link to="/https://mail.google.com/mail/u/0/#inbox" />
          Send Reset Link
          
          </Button>
      </form>
      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
