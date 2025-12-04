import { jwtDecode } from "jwt-decode";


export const getCurrentUser = () => {
    const token = localStorage.getItem("token");
    
    return token ? jwtDecode(token) : null;
};