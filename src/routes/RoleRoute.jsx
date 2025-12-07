import { Navigate, Outlet, useLocation } from "react-router-dom";
//import { useAuth } from "../hooks/useAuth";
import { getCurrentUser } from "../services/token.service";

export default function RoleRoute({ 
  allowed = [], 
  redirect = "/login", 
  forbidden = "/unauthorized" 
}) {
//  const { currentUser } = useAuth();

const location = useLocation();

//get user from token
const token = localStorage.getItem("token");
const user = token ? getCurrentUser(token) : null;

console.log('current user role route: \n', user);

  // 1. User NOT logged in → redirect to login
  if (!user) {
    return <Navigate to={redirect} state={{ from: location }} replace />;
  }

  // 2. Normalize user roles (string OR array)
//  const roles = currentUser.roles || (currentUser.role ? [currentUser.role] : []);

//user exists but role not allowed
  if (!allowed.includes(user.role)) {
    return <Navigate to={forbidden} replace />;
  }

  // 3. If no restriction passed → allow
  // if (allowed.length === 0) {
  //   return <Outlet />;
  // }

  // 4. Check authorization
//  const permitted = roles.some(r => allowed.includes(r));

  // if (permitted) {
  //   return <Outlet />;
  // }

  // 5. User is logged in but not authorized
  return <Outlet />;
}
