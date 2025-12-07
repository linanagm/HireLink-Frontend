import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
//import { getCurrentUser } from "../services/token.service";

export default function RoleRoute({ allowed = [], redirect = "/login", forbidden = "/unauthorized" }) {
//  const { currentUser } = useAuth();

const location = useLocation();
const { currentUser } = useAuth();
console.log('current user role route: \n',currentUser);

  // 1. User NOT logged in → redirect to login
  if (!currentUser) {
    return <Navigate to={redirect} state={{ from: location }} replace />;
  }

  // 2. Normalize user roles (string OR array)
  const roles = currentUser.roles || (currentUser.role ? [currentUser.role] : []);

  // 3. If no restriction passed → allow
  if (allowed.length === 0) {
    return <Outlet />;
  }

  // 4. Check authorization
  const permitted = roles.some(r => allowed.includes(r));

  if (permitted) {
    return <Outlet />;
  }

  // 5. User is logged in but not authorized
  return <Navigate to={forbidden} replace />;
}
