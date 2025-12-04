import { createContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../services/token.service';

 

export const AuthContext = createContext(0);




export function AuthProvider ({children}) {

    const[ currentUser , setCurrentUser ] = useState( null );
    const[ token , setToken ] = useState(null);
    


   useEffect(() => {
        //check localstorage first for remember me
        // const savedUser = localStorage.getItem("user");
        // if (savedUser) {
        //     setUser(JSON.parse(savedUser));
        //     return;
        // }


        //check sessionStorage otherWise
        // const sessionUser = sessionStorage.getItem("user");
        // if (sessionUser) {
        //     setUser(JSON.parse(sessionUser));
        //     return;
        // }


        
    }, [] );


    
    const saveLogin = (token, rememberMe) => {
        //setUser(userData);
        setCurrentUser(getCurrentUser(token));
        if (rememberMe) {
            setToken(token)
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("user", JSON.stringify(getCurrentUser(token)));
        
        } else {
            setToken(token)
            sessionStorage.setItem("token", JSON.stringify(token));
            sessionStorage.setItem("user", JSON.stringify(getCurrentUser(token)));
          
        }
    }  


    const logout = () => {
      //  setUser(null);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
    }

        
    return (
        <AuthContext.Provider 
        
        value={ { token, setToken ,saveLogin , logout } }>

            {children}

        </AuthContext.Provider>
    )






}