import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ResetPasswordModal from "../../../components/Modals/ResetPasswordModal";

export default function ResetPassword() {
	const [params] = useSearchParams();
	const navigate = useNavigate();

	const token = params.get("vt");
	const [showModal, setShowModal] = useState(true);

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
