import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "@/services/token.service";

export default function GuestRoute({ redirect = "/" }) {
  const token = localStorage.getItem("token");
  const user = token ? getCurrentUser(token) : null;

  // if user exists, block access to guest pages
  if (user) {
    return <Navigate to={redirect} replace />;
  }

  // allow access
  return <Outlet />;
}
