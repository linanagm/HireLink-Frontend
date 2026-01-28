import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
			<Helmet>
				<title>404 | Page Not Found</title>
				<meta name="description" content="Page not found" />
			</Helmet>

			<div className="text-center max-w-md">
				<h1 className="text-7xl font-extrabold text-fuchsia-700">404</h1>

				<h2 className="mt-4 text-2xl font-bold text-slate-800">
					Page not found
				</h2>

				<p className="mt-3 text-slate-600">
					The page you’re looking for doesn’t exist or was moved. Probably not
					your fault. Probably.
				</p>

				<Link
					to="/"
					className="inline-block mt-6 px-6 py-3 rounded-xl
					bg-fuchsia-700 text-white font-medium
					hover:bg-fuchsia-800 transition"
				>
					Back to Home
				</Link>
			</div>
		</div>
	);
}
