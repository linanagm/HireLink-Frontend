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
