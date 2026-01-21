import { Navigate, useLocation } from "react-router-dom";
export default function ProtectedRoute({ children, redirect = "/login" }) {
	const location = useLocation();
	const hasToken =
		localStorage.getItem("token") || sessionStorage.getItem("token");
	if (!hasToken)
		return <Navigate to={redirect} state={{ from: location }} replace />;

	return children;
}
