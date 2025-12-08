import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import SuccessCard from "../../components/Main/SuccessCard";
import { verifyEmail } from "../../services/authService";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("loading"); 
  const [message, setMessage] = useState("Verifying your email...");
  const navigate = useNavigate();

  useEffect(() => {
    async function doVerify() {
      const token = params.get("vt");

      if (!token) {
        setStatus("error");
        setMessage("Missing verification token.");
        return;
      }

      const response = await verifyEmail(token);

      if (response.ok) {
        setStatus("success");
        setMessage("Email verified successfully.");
      } else if (response.message === "email already verified") {
        setStatus("success");
        setMessage("Email already verified.");
      } else {
        setStatus("error");
        setMessage(response.message || "Verification failed.");
      }

      // Redirect after delay ONLY on success
      if (status !== "error") {
        setTimeout(() => navigate("/login"), 2500);
      }
    }

    doVerify();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Email Verification</title>
      </Helmet>

      <SuccessCard
        status={status}
        message={message}
        buttonText={status === "success" ? "Go to Login" : null}
        buttonLink={status === "success" ? "/login" : null}
      />
    </div>
  );
}
