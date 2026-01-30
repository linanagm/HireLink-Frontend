import { ShieldOff } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Unauthorized() {
	return (
		<>
			<Helmet>
				<title>403 | Unauthorized</title>
			</Helmet>
			<div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
				<div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
					<div className="flex justify-center mb-4 text-slate-500">
						<ShieldOff size={48} />
					</div>

					<h1 className="text-2xl font-bold text-slate-900 mb-2">
						Access Denied
					</h1>

					<p className="text-slate-600 mb-6">
						You don’t have permission to access this page.
					</p>

					<div className="flex gap-3 justify-center">
						<Link
							to="/"
							className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
						>
							Go Home
						</Link>

						{/* <Link
						to="/login"
						className="px-5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
					>
						Login
					</Link> */}
					</div>
				</div>
			</div>
		</>
	);
}
