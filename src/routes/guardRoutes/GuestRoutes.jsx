import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function GuestRoute() {
	const { currentUser } = useAuth();
	const location = useLocation();

	if (currentUser) {
		return <Navigate to={location.state?.from?.pathname || "/"} replace />;
	}

	return <Outlet />;
}
