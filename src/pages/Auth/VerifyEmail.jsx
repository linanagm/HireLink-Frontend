import { useEffect, useState } from "react";
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

			if (response.ok || response.message === "email already verified") {
				setStatus("success");
				setMessage("Email verified successfully.");
				sessionStorage.setItem("vt", token);
				setTimeout(() => navigate("/onboarding/talent"), 800);
			} else {
				setStatus("error");
				setMessage(response.message || "Verification failed.");
			}
		}

		doVerify();
	}, [navigate, params]);

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
