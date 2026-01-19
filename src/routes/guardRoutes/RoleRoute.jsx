import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "../../components/UI/Loading";
import { useAuth } from "../../hooks/useAuth";
export default function RoleRoute({
	allowed = [],
	redirect = "/",
	forbidden = "/unauthorized",
	children,
}) {
	const { token, currentUser } = useAuth();
	const location = useLocation();
	console.log("currentUser role route : ", currentUser);

	// Not logged in
	if (!token) {
		return <Navigate to={redirect} state={{ from: location }} replace />;
	}

	//token exist but no current user -> user not loaded yet => wait no direct
	if (!currentUser) {
		return <Loading />;
	}

	// Logged in but not allowed
	if (!allowed.includes(currentUser.role)) {
		return <Navigate to={forbidden} replace />;
	}

	// Allowed
	return children || <Outlet />;
}
