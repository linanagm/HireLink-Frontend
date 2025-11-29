import { createContext, useEffect, useState } from 'react';


// import {
//     login,
//     signup,
//     logout,
//     verifyEmail,
//     getCurrentUser,
//     refreshToken 

// } from '../services/auth.js'
 

export const AuthContext = createContext();

export function AuthProvider ({ children }) {

    const[ user , setUser ] = useState( () => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null
    }
    );
    //const[ loading , setLoading ] = useState(true); // display spinner first thing
    //const[ error , setError ] = useState(null);
    const[ tokens , setTokens ] = useState(() => {
        const saved = localStorage.getItem("tokens");
        return saved ? JSON.parse(saved) : null
    });


    // Load user on start
   // useEffect(( ) =>{
    //     const loadUser = async () => {
    //         const res = await getCurrentUser();
    //         if (res.success) setUser(res.data);
    //         setLoading(false);
            
    //     }
    //     loadUser();
    // }, []);

    //dignup
    // const signupUser = async (data) => {
    //     const res = await signup(data);
    //     if (!res.success) {
    //         setError(res.message);
    //         return res;
    //     }
    //     setError(null);
    //     return res;
    // }


    // //login
    // const loginUser = async (data) => {
    //     const res = await login(data);
    //     if (!res.success) {
    //         setError(res.message);
    //         return res;
    //     }
    //     setError(null);
        
    //     const userRes = getCurrentUser();
    //     if (userRes.success) setUser(userRes.data);
    //     return res;
    // }


    // //verify email
    // const verifyEmailUser = async (email) => {
    //     const res = await verifyEmail(email);
        
    //     return res;
    // }


    // //logout
    // const logoutUser = async () => {
    //     logout();
    //     setUser(null);
    // }

    // //refresh token
    // const refreshAccess = async () => {
    //    return refreshToken();
    // }

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