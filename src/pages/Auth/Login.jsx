import React, { useState, useEffect, useContext } from 'react'
import loginImage from '../../assets/images/login.svg'
import { Helmet } from 'react-helmet'
import LoginForm from '../../components/auth/LoginForm'
import { AuthContext } from '../../context/AuthContext'

export default function Login() {

    let [count , setCount ]= useState();

//    console.log('context object: \n',useAuth);
    

      useEffect (() => {}, [])
    
     return (<>
        <Helmet>
          <title>Login</title>  
        </Helmet>
    
    
    <div>
      
        <div className = {` flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto justify-between md:px-5 lg:px-0  py-64 md:py-7 px-7  gap-3 `}>
             
             {/* /*******************   image   ******************** */}
              <div className=' w-1/2 items-center justify-center bg-blue-600 '>
                  <img src={loginImage} className='w-full h-auto ' alt="sign up" />
              </div>
              
              
              <div className=' w-full lg:w-1/2 items-center justify-center '>
                  <div className=' w-full items-center justify-center'>
                    <h1 className=' text-3xl font-semi-bold text-heading mx-auto pb-2 w-fit'>Login</h1>
                  </div>
                                
                  
                  {/* ************* register form ******************** */}
                   <LoginForm  />
                              
              </div>
             

      </div>

    </div>
      


    </>
  )
}

