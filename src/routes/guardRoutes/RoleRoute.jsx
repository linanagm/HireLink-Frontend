import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RoleRoute({
	allowed = [],
	redirect = "/",
	forbidden = "/unauthorized",
	children,
}) {
	const { currentUser } = useAuth();
	const location = useLocation();
	console.log("currentUser role route : ", currentUser);

	// Not logged in
	if (!currentUser) {
		return <Navigate to={redirect} state={{ from: location }} replace />;
	}

	// Logged in but not allowed
	if (!allowed.includes(currentUser.role)) {
		return <Navigate to={forbidden} replace />;
	}

	// Allowed
	return children || <Outlet />;
}
