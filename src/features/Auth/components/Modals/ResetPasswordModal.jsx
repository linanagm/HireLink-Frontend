import { useFormik } from "formik";
import { useState } from "react";
import Button from "../../../../components/UI/Button";
import FormInput from "../../../../components/UI/FormInput";
import { resetPassword } from "../../../../services/auth.service";
import { passwordschema } from "../../../../utils/validation/authValidationjs";

/**
 * Resets the password for the user.
 * @param {string} token - The verification token obtained from the password reset request.
 * @param {function} onClose - A function to be called when the modal is closed.
 * @param {function} onSuccess - A function to be called when the password reset is successful.
 */
export default function ResetPasswordModal({ token, onClose, onSuccess }) {
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const formik = useFormik({
		initialValues: { newPassword: "", oldPassword: "" },
		validationSchema: passwordschema,
		onSubmit: handleSubmit,
	});

	async function handleSubmit() {
		if (!token) {
			setError("Invalid or missing reset token.");
			return;
		}

		setLoading(true);
		setMessage("");
		setError("");

		const response = await resetPassword(
			token,
			formik.values.newPassword,
			formik.values.oldPassword || undefined,
		);

		if (response.ok) {
			setMessage("Password reset successfully!");
			onSuccess(); // Notify parent to redirect
		} else {
			setError(response.message || "Something went wrong.");
		}

		setLoading(false);
	}

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]">
			<div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
				{/* Close button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-3 right-4 text-gray-500 hover:text-gray-900 text-2xl"
				>
					×
				</button>

				<h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>

				{!message && (
					<form onSubmit={formik.handleSubmit} className="space-y-4">
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
				)}

				{message && (
					<p className="text-green-600 mt-4 text-center">{message}</p>
				)}

				{error && <p className="text-red-600 mt-4 text-center">{error}</p>}
			</div>
		</div>
	);
}
