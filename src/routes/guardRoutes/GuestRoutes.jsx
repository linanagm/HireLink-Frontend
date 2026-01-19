import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "../../components/UI/Loading";
import { useAuth } from "../../hooks/useAuth";

export default function GuestRoute() {
	const { token, currentUser } = useAuth();
	const location = useLocation();

	if (token && currentUser) return <Loading />;
	if (currentUser) {
		return <Navigate to={location.state?.from?.pathname || "/"} replace />;
	}

	return <Outlet />;
}
