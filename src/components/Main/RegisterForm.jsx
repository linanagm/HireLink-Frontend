import React, {  useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { signup } from '../../fakeData/fakeApi';
//import { handleRegister } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';

export default function RegisterForm({ role }) {

      const { loginUser } = useAuth(""); //to store user has logged in

      const [ message , setMessage ] = useState("");

      
      useEffect (() => {}, [])

      function handleRegister (formValues){

        const values = {...formValues , role};

          if (values.password !== values.rePassword) {
            setMessage( "Error : Passwords do not match");
            
            
            return
          }  

          const res = signup(values);

          if (res.success === false) {
            console.log('sign up error message: ', res.message);
            res.error = true;
            setMessage(`${res.message}`);

          } else {
            setMessage("signup successfull check console for verification link");
            res.error = false;
            loginUser ({ user: {...values}, accessToken: res.accessToken, refreshToken: res.refreshToken });
            
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

                    </div>

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
                    </div>
                    
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
                  </div>

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
                  </div>

                    {/********************* button ************************/}
                    <button 
                    type="submit" 
                    className="bg-fuchsia-700  w-full hover:bg-fuchsia-800 text-white box-border border rounded hover:bg-brand-medium focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                      Submit
                    </button>


                    {/* ********************* login link ************************ */}
                    <div className='w-full flex  items-center justify-center '>
                          <NavLink to="/login" className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-400 ">
                              Already have an account? Login
                          </NavLink>

                    </div>

                    
                    {/* ****************** error or success message *************/}
                    {message && (
                    <p className={`mt-2 text-sm ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
                      {message}
                    </p>
                        )}

                  
                  </form>
              </>
  )
}
