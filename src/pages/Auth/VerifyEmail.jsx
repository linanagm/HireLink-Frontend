import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import VerifyEmailModal from "../../components/Modals/VerifyEmailModal";
import { verifyEmail } from "../../services/auth.service";

export default function VerifyEmail() {
	const [params] = useSearchParams();
	const [status, setStatus] = useState("loading");
	const [message, setMessage] = useState("Verifying your email...");
	const [showModal, setShowModal] = useState(true);

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
				setTimeout(() => navigate("/login"), 2000);
			} else if (response.message === "email already verified") {
				setStatus("success");
				setMessage("Email already verified.");
				setTimeout(() => navigate("/login"), 2000);
			} else {
				setStatus("error");
				setMessage(response.message || "Verification failed.");
			}
		}

		doVerify();
	}, []);

	if (!showModal) return null;

	return (
		<VerifyEmailModal
			status={status}
			message={message}
			buttonLink="/login"
			onClose={() => setShowModal(false)}
		/>
	);
}
