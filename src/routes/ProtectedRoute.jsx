import { Navigate } from "react-router-dom"
// export default function ProtectedRoute({ children }) {

//     if (localStorage.getItem("token") !== null || sessionStorage.getItem("token") !== null) {
//         return children;
    
//     } else {
//         return <Navigate to="/login" />;
//     }
        
    
    

// }

export default function ProtectedRoute({ children }) {
  const hasToken =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!hasToken) return <Navigate to="/login" />;

  return children;
}
