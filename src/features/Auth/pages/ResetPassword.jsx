import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ResetPasswordModal from "../components/Modals/ResetPasswordModal";

/**
 * The ResetPassword page allows users to reset their password.
 * The page shows a reset password modal with the given token from the URL.
 * If the token is invalid, the user is redirected to the login page.
 * If the password reset is successful, the user is redirected to the login page after 1.5 seconds.
 * If the password reset fails, an error message is shown to the user.
 * @param {Object} params - The URL parameters.
 * @param {function} navigate - The react-router-dom navigate function.
 * @return {JSX.Element} The component to render.
 */
export default function ResetPassword() {
	const [params] = useSearchParams();
	const navigate = useNavigate();

	const token = params.get("vt");
	const [showModal, setShowModal] = useState(true);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!token) {
			setShowModal(false);
			navigate("/login");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	return (
		showModal && (
			<ResetPasswordModal
				token={token}
				onClose={() => navigate("/login")}
				onSuccess={() => {
					setTimeout(() => navigate("/login"), 1500);
				}}
			/>
		)
	);
}
