import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function GuestRoute({ redirect = "/" }) {
  
  const { currentUser } = useAuth();
  

  // if user exists, block access to guest pages
  if (currentUser) {
    return <Navigate to={redirect} replace />;
  }

  // allow access
  return <Outlet />;
}
