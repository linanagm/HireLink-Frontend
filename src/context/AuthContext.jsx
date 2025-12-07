import { createContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../services/token.service';



export const AuthContext = createContext(0);




export function AuthProvider ({children}) {

    const[ currentUser , setCurrentUser ] = useState( null );
    const[ token , setToken ] = useState(null);
    const[ isAuthenticated , setIsAuthenticated ] = useState(false);
    


   useEffect(() => {
        //check localstorage first for remember me
        
        const savedToken = localStorage.getItem("token");

        if ( savedToken ) {
            setCurrentUser(getCurrentUser(token));
            setToken(JSON.parse(savedToken));
            setIsAuthenticated(true);
            return;
        }


        //check sessionStorage otherWise
        
        const sessionToken = sessionStorage.getItem("token");
        if (sessionToken) {
            setCurrentUser(getCurrentUser(sessionToken));
            setToken(JSON.parse(sessionToken));
             setIsAuthenticated(true);
            return;
        }


        
    }, [] );


    
    const saveLogin = (token, rememberMe) => {
        //setUser(userData);
        const userData  = getCurrentUser(token);
        setToken(token);
        setCurrentUser(userData);
        setIsAuthenticated(true);
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
        setIsAuthenticated(false);
    }

        
    return (
        <AuthContext.Provider 
        
        value={ { 
            token, 
            currentUser, 
            isAuthenticated, 
            setToken , 
            setCurrentUser,
            setIsAuthenticated, 
            saveLogin,
            logout
         } }
        >

            {children}

        </AuthContext.Provider>
    )






}