import { createContext, useEffect, useState } from 'react';
import { getData, saveTokens } from '../services/auth.js';
 

export const AuthContext = createContext();




export function AuthProvider ({ children }) {

    const[ user , setUser ] = useState( getData("users") );
    
    const[ tokens , setTokens ] = useState(saveTokens());


   useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }

        if (tokens) {
            localStorage.setItem("tokens", JSON.stringify(tokens));
        } else {
            localStorage.removeItem("tokens");
        }
    }, [ user,tokens]);


    const loginUser = ({ user, accessToken, refreshToken }) => {
        setUser(user);
        setTokens({ accessToken, refreshToken });
    }

    const logoutUser = () => {
        setUser(null);
        setTokens(null);
    }


    return (
        <AuthContext.Provider 
        value={{ user, tokens, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    )






}