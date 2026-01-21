import { useState } from "react";
import { Helmet } from "react-helmet";
import loginImage from "../../../assets/images/login.svg";
import LoginForm from "../components/LoginForm";
import ForgotPasswordModal from "../components/Modals/ForgotPasswordModal";

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
