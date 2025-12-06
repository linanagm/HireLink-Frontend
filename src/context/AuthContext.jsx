import { createContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../services/token.service';



export const AuthContext = createContext(0);




export function AuthProvider ({children}) {

    const[ currentUser , setCurrentUser ] = useState( null );
    const[ token , setToken ] = useState(null);
    


   useEffect(() => {
        //check localstorage first for remember me
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
            return;
        }


        //check sessionStorage otherWise
        const sessionUser = sessionStorage.getItem("user");
        if (sessionUser) {
            setCurrentUser(JSON.parse(sessionUser));
            return;
        }


        
    }, [] );


    
    const saveLogin = (token, rememberMe) => {
        //setUser(userData);
        const userData  = getCurrentUser(token);
        setToken(token);
        setCurrentUser(userData);
        console.log('User data: \n' , userData );
        
        if (rememberMe) {
            
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("user", JSON.stringify(userData));
        
        } else {
        
            sessionStorage.setItem("token", JSON.stringify(token));
            sessionStorage.setItem("user", JSON.stringify(userData));
          
        }
    }  


    const logout = () => {
      //  setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        setToken(null);
        setCurrentUser(null);
    }

        
    return (
        <AuthContext.Provider 
        
        value={ { token, setToken ,saveLogin , logout, currentUser } }
        >

            {children}

        </AuthContext.Provider>
    )






}