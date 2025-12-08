import { Navigate, Outlet, useLocation } from "react-router-dom";
//import { useAuth } from "../hooks/useAuth";
//import { getCurrentUser } from "../services/token.service";
import { useAuth } from "../hooks/useAuth";

export default function RoleRoute({ 
  allowed = [], 
  redirect = "/login", 
  forbidden = "/unauthorized",
  children 
}) {

//get current location
const location = useLocation();
const { currentUser } = useAuth();


console.log('current user role route: \n', currentUser);

  
  // 1. User NOT logged in → redirect to login
  if (!currentUser) {
    return <Navigate to={redirect} state={{ from: location }} replace />;
  }

 
//user exists but role not allowed
  if (!allowed.includes(currentUser.role)) {
    return <Navigate to={forbidden} replace />;
  }

 
  // 5. User is logged in but not authorized
  return children || <Outlet />;
}
