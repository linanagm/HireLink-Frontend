import { useState } from "react";
import { Helmet } from "react-helmet";
import loginImage from "../../../assets/images/login.svg";
import LoginForm from "../components/LoginForm";
import ForgotPasswordModal from "../components/Modals/ForgotPasswordModal";

/**
 * The login page allows users to log in with their email and password.
 * The page shows a login form and a forgot password button.
 * When the user clicks the forgot password button, the ForgotPasswordModal is shown.
 * The ForgotPasswordModal allows the user to enter their email and send a password reset email.
 * If the password reset is successful, the user is redirected to the login page.
 * If the password reset fails, an error message is shown to the user.
 * The login page also shows a link to the register page.
 * The register page allows users to sign up with their email, password, and name.
 * The page shows a register form and a terms and conditions checkbox.
 * When the user clicks the register button, the register form is validated and the user is redirected to the login page.
 * If the register form is invalid, an error message is shown to the user.
 */
export default function Login() {
	const [showForgotModal, setShowForgotModal] = useState(false);

	return (
		<>
			<Helmet>
				<title>Login</title>
			</Helmet>

			<div>
				<div
					className={` flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto justify-between md:px-5 lg:px-0  py-64 md:py-7 px-7  gap-3 `}
				>
					{/* /*******************   image   ******************** */}

					<div className=" w-1/2 items-center justify-center bg-blue-600 ">
						<img src={loginImage} className="w-full h-auto " alt="sign up" />
					</div>

					<div className=" w-full lg:w-1/2 items-center justify-center ">
						<div className=" w-full items-center justify-center">
							<h1 className=" text-3xl font-semi-bold text-heading mx-auto pb-2 w-fit">
								Login
							</h1>
						</div>

						{/* ************* register form ******************** */}
						{/* <LoginForm  /> */}
						<LoginForm onOpenForgot={() => setShowForgotModal(true)} />

						{showForgotModal && (
							<ForgotPasswordModal onClose={() => setShowForgotModal(false)} />
						)}
					</div>
				</div>
			</div>
		</>
	);
}
