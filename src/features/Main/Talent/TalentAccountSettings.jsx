// import { useState } from "react";
// import { Helmet } from "react-helmet";

// function PencilIcon({ className = "w-5 h-5" }) {
// 	return (
// 		<svg
// 			className={className}
// 			viewBox="0 0 24 24"
// 			fill="none"
// 			stroke="currentColor"
// 			strokeWidth="1.5"
// 			strokeLinecap="round"
// 			strokeLinejoin="round"
// 			xmlns="http://www.w3.org/2000/svg"
// 		>
// 			<title>edit</title>
// 			<path d="M12 20h9" />
// 			<path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" />
// 		</svg>
// 	);
// }

// export default function AccountSettings() {
// 	const [form, setForm] = useState({
// 		fullName: "",
// 		email: "",
// 		phone: "",
// 		timezone: "",
// 		currency: "",
// 		language: "",
// 		industry: "",
// 	});

// 	const [passwords, setPasswords] = useState({
// 		oldPassword: "",
// 		newPassword: "",
// 		confirmNewPassword: "",
// 	});

// 	const [twoFA, setTwoFA] = useState(false);

// 	function handleChange(e) {
// 		const { name, value } = e.target;
// 		setForm((s) => ({ ...s, [name]: value }));
// 	}

// 	function handlePassChange(e) {
// 		const { name, value } = e.target;
// 		setPasswords((s) => ({ ...s, [name]: value }));
// 	}

// 	function saveAccount(e) {
// 		e.preventDefault();
// 		// هنا تبعتي البيانات للـ backend
// 		console.log("save account", form);
// 		alert("Account settings saved (mock)");
// 	}

// 	function updatePassword(e) {
// 		e.preventDefault();
// 		if (passwords.newPassword !== passwords.confirmNewPassword) {
// 			alert("New password and confirm don't match");
// 			return;
// 		}
// 		// كود ابديت باسورد
// 		console.log("update password", passwords);
// 		alert("Password updated (mock)");
// 	}

// 	function deleteAccount() {
// 		if (!confirm("Are you sure? This action cannot be undone.")) return;
// 		// نادِ على API لحذف الحساب
// 		alert("Account deleted (mock)");
// 	}

// 	return (
// 		<>
// 			<Helmet>
// 				<title>Account Settings</title>
// 			</Helmet>
// 			<div className="min-h-screen bg-gray-50 flex flex-col">
// 				{/* MAIN CONTENT */}
// 				<main className="flex-1 max-w-6xl mx-auto px-6 py-10">
// 					<div className="bg-white rounded-md border border-gray-200 p-8 shadow-sm">
// 						<h2 className="font-semibold text-lg text-gray-800 mb-6">
// 							Account Settings
// 						</h2>

// 						<form
// 							onSubmit={saveAccount}
// 							className="grid grid-cols-1 md:grid-cols-2 gap-6"
// 						>
// 							{/* Left col */}
// 							<div className="space-y-4">
// 								<label className="block">
// 									<div className="text-xs text-gray-600 mb-1">Full Name</div>
// 									<input
// 										name="fullName"
// 										value={form.fullName}
// 										onChange={handleChange}
// 										placeholder="Full Name"
// 										className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
// 									/>
// 								</label>

// 								{/* phone */}
// 								{/* <label className="block">
// 									<div className="text-xs text-gray-600 mb-1">Phone Number</div>
// 									<input
// 										name="phone"
// 										value={form.phone}
// 										onChange={handleChange}
// 										placeholder="Phone Number"
// 										className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
// 									/>
// 								</label>
// 								 */}
// 								{/* currency */}
// 								{/* <label className="block">
// 									<div className="text-xs text-gray-600 mb-1">
// 										Default Currency
// 									</div>
// 									<select
// 										name="currency"
// 										value={form.currency}
// 										onChange={handleChange}
// 										className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
// 									>
// 										<option value="">Default Currency</option>
// 										<option value="USD">USD</option>
// 										<option value="EGP">EGP</option>
// 									</select>
// 								</label> */}

// 								{/* industry  */}
// 								{/* <label className="block">
// 									<div className="text-xs text-gray-600 mb-1">Industry Tag</div>
// 									<input
// 										name="industry"
// 										value={form.industry}
// 										onChange={handleChange}
// 										placeholder='e.g., "UI/UX Designer"'
// 										className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
// 									/>
// 								</label> */}

// 								<div>
// 									<button
// 										type="submit"
// 										className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm"
// 									>
// 										Save
// 									</button>
// 								</div>
// 							</div>

// 							{/* Right col */}
// 							<div className="space-y-4">
// 								{/* email */}
// 								<label className="block">
// 									<div className="text-xs text-gray-600 mb-1">Email</div>
// 									<input
// 										name="email"
// 										value={form.email}
// 										onChange={handleChange}
// 										placeholder="Email"
// 										className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
// 									/>
// 								</label>

// 								<label className="block">
// 									<div className="text-xs text-gray-600 mb-1">Time Zone</div>
// 									<input
// 										name="timezone"
// 										value={form.timezone}
// 										onChange={handleChange}
// 										placeholder="Time Zone"
// 										className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
// 									/>
// 								</label>

// 								<label className="block">
// 									<div className="text-xs text-gray-600 mb-1">
// 										Language Preference
// 									</div>
// 									<select
// 										name="language"
// 										value={form.language}
// 										onChange={handleChange}
// 										className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
// 									>
// 										<option value="">Language Preference</option>
// 										<option value="en">English</option>
// 										<option value="ar">العربية</option>
// 									</select>
// 								</label>

// 								<div className="mt-4 bg-gray-50 border border-gray-100 p-4 rounded-md">
// 									<div className="flex items-center justify-between">
// 										{/* two factor authentication */}
// 										{/* <div>
// 											<div className="text-sm font-medium text-gray-700">
// 												Two-Factor Authentication (2FA)
// 											</div>
// 											<div className="text-xs text-gray-500">
// 												Add an extra layer of security to your account
// 											</div>
// 										</div> */}

// 										<label className="flex items-center cursor-pointer">
// 											<div
// 												className={`w-11 h-6 flex items-center rounded-full p-1 ${twoFA ? "bg-purple-600" : "bg-gray-300"}`}
// 											>
// 												<div
// 													className={`bg-white w-4 h-4 rounded-full shadow transform ${twoFA ? "translate-x-5" : ""}`}
// 												/>
// 											</div>
// 											<input
// 												type="checkbox"
// 												className="sr-only"
// 												checked={twoFA}
// 												onChange={() => setTwoFA((v) => !v)}
// 											/>
// 										</label>
// 									</div>
// 								</div>
// 							</div>
// 						</form>

// 						{/* Privacy & Security */}
// 						<div className="mt-8">
// 							<h3 className="font-medium text-gray-800 mb-4">
// 								Privacy &amp; Security
// 							</h3>

// 							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// 								{/* change password */}
// 								<form onSubmit={updatePassword} className="space-y-3">
// 									<label className="block">
// 										<div className="text-xs text-gray-600 mb-1">
// 											Old Password
// 										</div>
// 										<input
// 											name="oldPassword"
// 											value={passwords.oldPassword}
// 											onChange={handlePassChange}
// 											type="password"
// 											placeholder="Old Password"
// 											className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
// 										/>
// 									</label>

// 									<label className="block">
// 										<div className="text-xs text-gray-600 mb-1">
// 											New Password
// 										</div>
// 										<input
// 											name="newPassword"
// 											value={passwords.newPassword}
// 											onChange={handlePassChange}
// 											type="password"
// 											placeholder="New Password"
// 											className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
// 										/>
// 									</label>

// 									<label className="block">
// 										<div className="text-xs text-gray-600 mb-1">
// 											Confirm New Password
// 										</div>
// 										<input
// 											name="confirmNewPassword"
// 											value={passwords.confirmNewPassword}
// 											onChange={handlePassChange}
// 											type="password"
// 											placeholder="Confirm New Password"
// 											className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
// 										/>
// 									</label>

// 									<div>
// 										<button
// 											type="button"
// 											className="bg-white border border-purple-600 text-purple-600 px-4 py-2 rounded-md text-sm"
// 										>
// 											Update Password
// 										</button>
// 									</div>
// 								</form>

// 								{/* delete account */}
// 								<div className="flex flex-col justify-between">
// 									<div>
// 										<div className="text-sm font-medium text-gray-700 mb-2">
// 											Delete Account
// 										</div>
// 										<p className="text-xs text-gray-500 mb-4">
// 											This action cannot be undone. All your data will be
// 											permanently deleted.
// 										</p>
// 									</div>

// 									<div>
// 										<button
// 											type="button"
// 											onClick={deleteAccount}
// 											className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
// 										>
// 											Delete Account
// 										</button>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</main>
// 			</div>
// 		</>
// 	);
// }

import { Helmet } from "react-helmet";
import { useAccountSecurityMutations } from "../../../hooks/mutations/useAccountSettingsMutation";
import { useAuth } from "../../../hooks/useAuth";

function LockIcon({ className = "w-5 h-5" }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<title>security</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M16.5 10.5V7.875a4.5 4.5 0 10-9 0V10.5m-.75 0h10.5a2.25 2.25 0 012.25 2.25v6A2.25 2.25 0 0117.25 21H6.75A2.25 2.25 0 014.5 18.75v-6A2.25 2.25 0 016.75 10.5z"
			/>
		</svg>
	);
}

function Badge({ children, tone = "gray" }) {
	const tones = {
		gray: "bg-gray-100 text-gray-700 border-gray-200",
		green: "bg-green-50 text-green-700 border-green-200",
		yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
	};
	return (
		<span
			className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border ${tones[tone]}`}
		>
			{children}
		</span>
	);
}

export default function TalentAccountSettings() {
	const { currentUser } = useAuth();
	const { logoutMutation, logoutAllMutation, resetPasswordMutation } =
		useAccountSecurityMutations();

	const email = currentUser?.email || "";
	const role = currentUser?.role || "";
	const isEmailVerified = Boolean(currentUser?.isEmailVerified);

	const onSignOut = () => logoutMutation.mutate();
	const onSignOutAll = () => {
		const ok = window.confirm(
			"Sign out from all devices?\nThis will log you out everywhere.",
		);
		if (ok) logoutAllMutation.mutate();
	};

	const onSendReset = () => {
		if (!email) return;
		resetPasswordMutation.mutate();
	};

	const busy =
		logoutMutation.isPending ||
		logoutAllMutation.isPending ||
		resetPasswordMutation.isPending;

	return (
		<div className="min-h-screen bg-slate-100">
			<Helmet>
				<title>Account Settings | HireLink</title>
			</Helmet>

			<div className="max-w-5xl mx-auto px-4 py-8">
				<h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
				<p className="text-sm text-gray-600 mt-1">
					Manage your account security. Profile stuff (avatar, resume, skills)
					lives in Profile.
				</p>

				{/* Account Overview */}
				<section className="bg-white border rounded-xl p-6 mt-6">
					<div className="flex items-center justify-between gap-3">
						<h2 className="text-lg font-semibold text-gray-900">Account</h2>

						<div className="flex items-center gap-2">
							<Badge tone="gray">{role || "USER"}</Badge>
							{isEmailVerified ? (
								<Badge tone="green">Email verified</Badge>
							) : (
								<Badge tone="yellow">Email not verified</Badge>
							)}
						</div>
					</div>

					<div className="mt-5 border-t pt-5 grid gap-4 sm:grid-cols-2">
						<div>
							<p className="text-xs text-gray-500">Email</p>
							<p className="text-sm font-semibold text-gray-900 break-all">
								{email || "—"}
							</p>
							<p className="text-xs text-gray-500 mt-1">
								Email change is not available yet (backend endpoint not
								implemented).
							</p>
						</div>

						<div className="sm:text-right">
							<p className="text-xs text-gray-500">Password</p>
							<p className="text-sm font-semibold text-gray-900">
								Reset via email
							</p>
							<p className="text-xs text-gray-500 mt-1">
								We’ll send a reset link to your email.
							</p>
						</div>
					</div>

					<div className="mt-5 flex flex-wrap gap-3 justify-start sm:justify-end">
						<button
							type="button"
							disabled={!email || resetPasswordMutation.isPending}
							onClick={onSendReset}
							className="px-4 py-2 rounded-lg border border-purple-600 text-purple-700 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{resetPasswordMutation.isPending
								? "Sending..."
								: "Send reset email"}
						</button>
					</div>
				</section>

				{/* Security */}
				<section className="bg-white border rounded-xl p-6 mt-6">
					<div className="flex items-center gap-2">
						<LockIcon className="w-5 h-5 text-purple-700" />
						<h2 className="text-lg font-semibold text-gray-900">Security</h2>
					</div>

					<p className="text-sm text-gray-600 mt-2">
						Sign out of this device or all devices.
					</p>

					<div className="mt-5 border-t pt-5 flex flex-wrap gap-3">
						<button
							type="button"
							onClick={onSignOut}
							disabled={busy}
							className="px-4 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{logoutMutation.isPending ? "Signing out..." : "Sign out"}
						</button>

						<button
							type="button"
							onClick={onSignOutAll}
							disabled={busy}
							className="px-4 py-2 rounded-lg border border-purple-700 text-purple-700 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{logoutAllMutation.isPending
								? "Signing out..."
								: "Sign out from all devices"}
						</button>
					</div>

					<p className="text-xs text-gray-500 mt-3">
						“Sign out from all devices” calls{" "}
						<span className="font-mono">POST /auth/logout/all</span>.
					</p>
				</section>
			</div>
		</div>
	);
}
