import SuccessCard from "../../../../components/UI/SuccessCard.jsx";
import { getMailProviderUrl } from "../../../../utils/mail.js";

/**
 * SignupSuccess is a component that displays a success card when the user signs up successfully.
 * It takes onClose and email as props.
 * It shows a success card with a message and a button based on the email.
 * The button text is "Open Email" if the email provider is Gmail, otherwise it is "Close".
 * The button link is the email provider URL if the email provider is Gmail, otherwise it is null.
 * It shows a close button with an X icon.
 */
export default function SignupSuccess({ onClose, email }) {
	const mailProviderUrl = getMailProviderUrl(email);
	return (
		<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
			<div className="relative">
				{/* success card */}
				<SuccessCard
					status="success"
					message="Account created successfully! Please verify your email."
					buttonText={mailProviderUrl ? "Open Email" : "Close"}
					buttonLink={mailProviderUrl}
				/>

				{/* close button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-1/4 right-2 "
				>
					<i class="fa-solid fa-x bolder text-slate-800 hover:text-red-900"></i>
				</button>
			</div>
		</div>
	);
}
