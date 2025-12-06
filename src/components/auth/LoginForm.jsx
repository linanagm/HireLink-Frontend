import React, { useState, useEffect, useContext } from 'react'
import { useFormik } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { login } from '../../services/authService';
import { LoginSchema } from '../../utils/validation/authValidationjs';
import { AuthContext } from '../../context/AuthContext';


export default function LoginForm() {

    const { saveLogin } = useContext(AuthContext);
    const [ isLoading, setIsLoading ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)   
    const [ rememberMeChecked , setRememberMeChecked ] = useState(false)
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [ apiError, setApiError] = useState('');
    const navigate = useNavigate();


    useEffect (() => {}, [])

      async function  handleLogin (formValues){
        
              setIsLoading(true);
      
              try {

                if (isLogedIn) return Navigate('/register/signup-success');
                console.log('formValues: \n', JSON.stringify(formValues));
                
                //send request to backend to register user
                const data = await login(formValues);
                
                if (data.success===false) {
                  setIsLoading(false);
                  setApiError(`${data.message}`);
                  //console.log('login error: ' , data.message);
                  setIsLogedIn(false);

                } else {
      
                  setIsLoading(false);    
                  setApiError(`${data.message}`);
                  setIsLogedIn(true); 
                  saveLogin(data.data.token, rememberMeChecked);
                  navigate('/talent/findjob');
                  //***will change according to uder id ***
                  
                }
            
              } catch (error) {
                setApiError(`${error.response?.data?.message || error.message}`);
              }
                
            }
    
      let formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: handleLogin
      })
        useEffect (() => {}, [])
      
  return (<>

                  <form 
                  onSubmit={formik.handleSubmit}
                  onChange={formik.handleChange}
                  className= " font-sans pt-2">
                    
              

                    <div className="mb-5 transition-all duration=300">
                      <label htmlFor="email" className="block mb-2.5 text-sm font-medium  text-heading">Your email</label>
                      <input 
                      type="email" 
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="email" 
                      id="useremail" 
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm  rounded border-slate-300 focus:ring-brand transition  focus:border-brand block w-full px-3 py-3 shadow-xs placeholder:text-body" 
                      placeholder='Enter your email' 
                       />

                    </div>
                          {/* email error */}
                           {formik.errors.email && formik.touched.email?  ( 
                          <div className="p-4 -mt-2 mb-4 text-sm bg-red-50 text-red-800 rounded-lg" >
                              <span className="font-medium">Alert!</span> {formik.errors.email}
                          </div>) :null} 

                            {/* password field */}
                    <div className="relative  mb-5">
                      <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
                      <input 
                      type={showPassword ? "text" : "password"}

                      value={formik.values.password} 
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="password" 
                      id="userpassword" 
                      className=" bg-neutral-secondary-medium  border border-default-medium text-heading text-sm rounded border-slate-300 focus:ring-brand transition focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
                      placeholder="••••••••"  
                      />
                      <span onClick={() => setShowPassword(prev => !prev)}
                       className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer text-gray-500">
                        {showPassword ? 
                        <i class="fa-regular fa-eye"></i> 
                        : <i class="fa-regular fa-eye-slash"></i>

                      }
                        
                        
                        </span>
                       
                  </div>
                  {/*  password error */} 
                           {formik.errors.password && formik.touched.password?  ( 
                          <div className="p-4 mb-4 mt-2 text-sm bg-red-50 text-red-800 rounded-lg" >
                              <span className="font-medium"></span> {formik.errors.password}
                          </div>) :null} 

                   {/* remember me  + Forot your password */}
                   <div className='text-sm flex flex-colitems-center justify-between py-3 mb-3'>

                            <div className='relative flex items-center text-md text-slate-700'>
                              <span onClick={() => setRememberMeChecked(prev => !prev) }className='absolute left-0'>
                                {rememberMeChecked ? <i class="fa-regular fa-square-check"></i> :<i class="fa-regular fa-square"></i>}
                                
                              </span>
                              
                              <p className='mx-3 px-3'>Remember me</p>
                            </div>
                            <Link to="/forgot-password" className='text-red-700 hover:underline hover:text-red-600'>Forgot password?</Link>


                   </div>

                    {/********************* button ************************/}
                    
                    <button 
                    
                    type="submit" 
                    
                    className="bg-fuchsia-700  w-full hover:bg-fuchsia-800 text-white box-border border rounded hover:bg-brand-medium focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                      
                      {isLoading? <i className="fa-solid fa-spinner fa-spin"></i>: 'Login' }
                      
                    </button>

                              
                    {/* ********************* login link ************************ */}

                    
                    <div className='w-full flex  items-center justify-center '>
                      <p className='text-slate-700 text-xs'>Don't have an account
                          <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-400 ">
                               Sign Up
                          </Link>
                          </p>

                    </div>

                    {/* ****************** API error *************/}
                               
                    {apiError && (
                      <p className="font-small text-red-600 mt-2">
                        Error! {apiError}
                      </p>
                    )}
                  
                  </form>
              </>
  )

}
