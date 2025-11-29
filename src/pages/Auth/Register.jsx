import React, { useState, useEffect } from 'react'
import RegisterForm from '../../components/Main/RegisterForm'
import signupImage from '../../assets/images/signup.svg'

export default function Register() {

    
    const [role , setRole] = useState('talent');
        
    
      useEffect (() => {}, [])
    
      return (
    
      <div className=' flex  flex-col lg:flex-row items-center max-w-screen-xl mx-auto justify-between md:px-5 lg:px-0  py-64 md:py-7 px-7  gap-3'>
             
             {/* /*******************   image   ******************** */}
              <div className=' w-1/2 bg-blue-600'>
                  <img src={signupImage} className='w-full h-auto ' alt="sign up" />
              </div>

            
              <div className=' w-full lg:w-1/2 '>
            
                  <h2 className='text-3xl font-semi-bold text-heading pb-2'>Sign Up</h2>
                                
                  {/*******************   tabs   ******************** */}
                  <div className="text-sm font-medium text-center text-body border-b border-default ">
                    <ul className="flex flex-wrap -mb-px">

                        <li className="me-2">
                            <button 
                              onClick={() => {setRole('talent')}}
                              className={`inline-block p-4  rounded-t-base font-thin transition-colors duration-300 
                                ${
                                  role === 'talent'
                                  ? 'text-fuchsia-800 border-b-2 border-fuchsia-800'
                                  : ' text-gray-900 border-b border-transparent hover:text-fuchsia-800 hover:border-fuchsia-800 '
                                }`}
                              >
                              Talent
                            </button>
                        </li>
                      
                        <li className="me-2">
                            <button 
                              onClick={() =>  setRole('employer')} 
                              className={`inline-block p-4 rounded-t-base 
                                 ${
                                  role === 'employer'
                                  ? 'text-fuchsia-800 border-b-2 border-fuchsia-800'
                                  : ' text-gray-900 border-b border-transparent hover:text-fuchsia-800 hover:border-fuchsia-800 '
                                }`} 
                              aria-current="page"
                              >
                                Employer
                            </button>
                        </li>
                    </ul>
                  </div >

                  {/* ************* register form ******************** */}
                      <RegisterForm role={role} />
                  
                      
              </div>

      </div>



    
  )
}
