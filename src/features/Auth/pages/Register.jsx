import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Outlet } from "react-router-dom";
import EmployerSignupForm from "../../../components/auth/EmployerSignupForm";
import TalentSignupForm from "../../../components/auth/TalentSignupForm";
import SignupSuccess from "../../../components/Modals/SignupSuccessModal";
import signupImage from "../../assets/images/signup.svg";
export default function Register() {
	const [role, setRole] = useState("TALENT");

	const [userEmail, setUserEmail] = useState("");

	const [showSuccessModal, setShowSuccessModal] = useState(false);

	return (
		<>
			<Helmet>
				<title>Sign Up</title>
			</Helmet>

			<div className="flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto justify-between md:px-5 lg:px-0 py-64 md:py-7 px-7 gap-3">
				{/* Left image */}
				<div className="w-1/2">
					<img src={signupImage} className="w-full h-auto" alt="sign up" />
				</div>

				{/* Form */}
				<div className="w-full lg:w-1/2">
					<h1 className="text-3xl font-bold text-heading pb-2 text-center">
						Signup
					</h1>

					{/* Tabs */}
					<div className="text-sm font-medium text-center text-body border-b border-default mb-4">
						<ul className="flex flex-wrap -mb-px">
							<li className="me-2">
								<button
									type="button"
									onClick={() => setRole("TALENT")}
									className={`p-4 rounded-t-base transition-colors ${
										role === "TALENT"
											? "text-fuchsia-800 border-b-2 border-fuchsia-800"
											: "text-gray-900 hover:text-fuchsia-800"
									}`}
								>
									Talent
								</button>
							</li>

							<li className="me-2">
								<button
									type="button"
									onClick={() => setRole("EMPLOYER")}
									className={`p-4 rounded-t-base transition-colors ${
										role === "EMPLOYER"
											? "text-fuchsia-800 border-b-2 border-fuchsia-800"
											: "text-gray-900 hover:text-fuchsia-800"
									}`}
								>
									Employer
								</button>
							</li>
						</ul>
					</div>

					{role === "TALENT" ? (
						// biome-ignore lint/a11y/useValidAriaRole: <explanation>
						<TalentSignupForm
							role="TALENT"
							onSuccess={(email) => {
								setUserEmail(email);
								setShowSuccessModal(true);
							}}
						/>
					) : (
						// biome-ignore lint/a11y/useValidAriaRole: <explanation>
						<EmployerSignupForm
							role="EMPLOYER"
							onSuccess={(email) => {
								setUserEmail(email);
								setShowSuccessModal(true);
							}}
						/>
					)}

					{/* Login Link */}
					<div className="text-center mt-4">
						<p className="text-sm">
							Already have an account?{" "}
							<Link
								to="/login"
								className="text-blue-600 hover:underline hover:text-blue-400"
							>
								Login
							</Link>
						</p>
					</div>
					{showSuccessModal && (
						<SignupSuccess
							email={userEmail}
							onClose={() => setShowSuccessModal(false)}
						/>
					)}

					<Outlet />
				</div>
			</div>
		</>
	);
}
