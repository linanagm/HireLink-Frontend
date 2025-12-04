import React, { useState, useEffect } from 'react'
import loginImage from '../../assets/images/login.svg'
import { Helmet } from 'react-helmet'
import LoginForm from '../../components/auth/LoginForm'

export default function Login() {

    let [ Count , SetCount ] = useState()

      useEffect (() => {}, [])
    
     return (<>
        <Helmet>
          <title>Login</title>  
        </Helmet>
    
    
    <div>
      
        <div className = {` flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto justify-between md:px-5 lg:px-0  py-64 md:py-7 px-7  gap-3 `}>
             
             {/* /*******************   image   ******************** */}
              <div className=' w-1/2 bg-blue-600'>
                  <img src={loginImage} className='w-full h-auto ' alt="sign up" />
              </div>

            
              <div className=' w-full lg:w-1/2 '>
            
                  <h2 className='text-3xl font-semi-bold text-heading pb-2'>Login</h2>
                                
                  
                  {/* ************* register form ******************** */}
                   <LoginForm  />
                              
              </div>
             

      </div>

    </div>
      


    </>
  )
}

