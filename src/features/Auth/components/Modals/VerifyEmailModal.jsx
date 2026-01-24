import SuccessCard from "../../../../components/UI/SuccessCard";

/**
 * VerifyEmailModal is a component that handles the verification of the user's email address.
 * It takes status, message, onClose, and buttonLink as props.
 * It shows a success, loading, or error card based on the status.
 * It shows a message based on the message.
 * It shows a button with the buttonLink text (defaults to "Go to Login" if not provided).
 * It shows a close button.
 */
export default function VerifyEmailModal({
	status,
	message,
	onClose,
	buttonLink,
}) {
	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]">
			<div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-0 mb-10">
				{/* Success / Loading / Error Card */}
				<SuccessCard
					status={status}
					message={message}
					buttonText={buttonLink ? "Go to Login" : null}
					buttonLink={buttonLink}
				/>

				{/* Close button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
				>
					×
				</button>
			</div>
		</div>
	);
}
