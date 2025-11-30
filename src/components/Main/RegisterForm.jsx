import React, {  useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { signup } from '../../fakeData/fakeApi';
//import { handleRegister } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { SignUpSchema } from '../../utils/validation/SignUpSchema';

export default function RegisterForm({ role }) {

      let navigate = useNavigate();

      const { loginUser } = useAuth(""); //to store user has logged in
      const [ message , setMessage ] = useState("");
      const [ error , setError ] = useState(false);
      const [ isLoading , setIsLoading ] = useState(false);

      
      
      useEffect (() => {}, [])

      function handleRegister (formValues){

        setIsLoading(true);
        
        const values = {...formValues , role};

          
          const res = signup(values);

          if (res.success === false) {

            console.log('sign up error message: ', res.message);
            setIsLoading(false);
            
            setError(true);
            
            setMessage(`${res.message}`);

          } else {

            setError(false);
           
            setIsLoading(false);
           
            setMessage("signup successfull check console for verification link");
            
            console.log('success' . res);
            
            loginUser ({ 
              user: {...values}, 
              accessToken: res.accessToken, 
              refreshToken: res.refreshToken
             });
            
            navigate('/register/verify-email');
            
          }
      } 


      //username
      const nameLabel = role === 'talent' ? 'Username' : 'Company Name';
      const namePlaceholder = role === 'talent' ? 'Enter your name' : 'Enter your company name';
  
      // email
      const emailLabel = role === 'talent' ? 'Email' : 'Company Email';
      const emailPlaceholder = role === 'talent' ? 'Enter your email' : 'Enter your company email';  
        
  
  let formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
          rePassword: '',
        },
        validationSchema: SignUpSchema,
        onSubmit: handleRegister
    })


    if (formik.password !== formik.rePassword) {
        alert('Passwords do not match');
        return;
      };
      
      // Final user data  
      //const userData = {...formik.values, role};    
    
      return (<>

                  <form onSubmit={formik.handleSubmit} className= " font-sans pt-2">
                    
                    <div className="mb-5 transition-all duration-300">
                      
                      <label htmlFor="username" className="block mb-2.5 text-sm font-medium  text-heading">{nameLabel}</label>
                      
                      {/* name input */}
                      <input 
                      type="text" 
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="name" 
                      id="username" 
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm  rounded border-slate-300 focus:ring-brand transition  focus:border-brand block w-full px-3 py-3 shadow-xs placeholder:text-body" 
                      placeholder={namePlaceholder} 
                       />

                        {/* name error alert */}
                        {formik.errors.name? <div class="flex items-start sm:items-center p-2 mb-2 mt-2 text-xs text-red-700 bg-red-50 rounded" role="alert">
                        <svg className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                        <p><span className="font-medium me-1">alert!</span>{formik.errors.name}</p>
                      </div>
                      : null}
                      
        

                    </div>

                    {/* email input */}
                    <div className="mb-5 transition-all duration=300">
                      <label htmlFor="email" className="block mb-2.5 text-sm font-medium  text-heading">{emailLabel}</label>
                      <input 
                      type="email" 
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="email" 
                      id="useremail" 
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm  rounded border-slate-300 focus:ring-brand transition  focus:border-brand block w-full px-3 py-3 shadow-xs placeholder:text-body" 
                      placeholder={emailPlaceholder} 
                       />
                      
                      {/* email error alert */}
                       {formik.errors.email? <div class="flex items-start sm:items-center p-2 mb-2 mt-2 text-xs text-red-700 bg-red-50 rounded" role="alert">
                        <svg className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                        <p><span className="font-medium me-1">alert!</span>{formik.errors.email}</p>
                      </div>
                      : null}
                      
                       
                    </div>

                    {/* password input */}
                    <div className="mb-5">
                      <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
                      <input 
                      type="password"
                      value={formik.values.password} 
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="password" 
                      id="userpassword" 
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded border-slate-300 focus:ring-brand transition focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
                      placeholder="••••••••"  
                      />
                      {/* password error aler */}
                      {formik.errors.password? <div class="flex items-start sm:items-center p-2 mb-2 mt-2 text-xs text-red-700 bg-red-50 rounded" role="alert">
                        <svg className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                        <p><span className="font-medium me-1">alert!</span>{formik.errors.password}</p>
                      </div>
                      : null}
                      

                      
                    </div>

                    {/* confirm password input */}
                  <div className="mb-5">
                      <label htmlFor="password"  className="block mb-2.5 text-sm font-medium text-heading">Confirm Password</label>
                      <input 
                      type="password" 
                      value={formik.values.rePassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="rePassword" 
                      id="userrePassword" 
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded border-slate-300 focus:ring-brand transition focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
                      placeholder="••••••••" 
                      />

                    {/* password error aler */}
                      {formik.errors.rePassword? <div class="flex items-start sm:items-center p-2 mb-2 mt-2 text-xs text-red-700 bg-red-50 rounded" role="alert">
                        <svg className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                        <p><span className="font-medium me-1">alert!</span>{formik.errors.rePassword}</p>
                      </div>
                      : null}
                      
                    
                  </div>

                    {/********************* button ************************/}
                    <button 
                    type="submit" 
                    className="bg-fuchsia-700  w-full hover:bg-fuchsia-800 text-white box-border border rounded hover:bg-brand-medium focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                        {isLoading? <i class="fa-solid fa-spinner fa-spin"></i>: 'Submit' }
                        
                      
                    </button>


                    {/* ********************* login link ************************ */}
                    <div className='w-full flex  items-center justify-center pt-2 '>
                          <NavLink to="/login" className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-400 ">
                              Already have an account? Login
                          </NavLink>

                    </div>
 
                    {/* ****************** error or success message *************/}
                     { message? 

                     <div class="flex items-start sm:items-center p-2 mb-2 mt-2 text-xs text-red-700 bg-red-50 rounded" role="alert">
                        <svg className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                        <p><span className="font-medium me-1">alert!</span>{ message }</p>
                      </div>
                      : null}
                    

                    
                  
                  </form>
              </>
  )
}
