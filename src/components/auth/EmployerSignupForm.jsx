import React, {  useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { EmployerRegisterSchema} from '../../utils/validation/authValidationjs.js';
import { register } from '../../services/authService.js';



export default function EmployerSigupForm({ role }) {

      const navigate = useNavigate();
      const [ apiError, setApiError] = useState('');
      const [ isLoading , setIsLoading ] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      
      useEffect (() => {}, [])

      async function  handleRegister (formValues){
        
        setIsLoading(true);
              // eslint-disable-next-line no-unused-vars
              const {rePassword , ...rest} = formValues;

        let valuesToSubmit = {
                    email:formValues.email,
                    password:formValues.password,
                    role: role.toUpperCase(),
                    profileData: {
                      companyName: formValues.name,
                   }
                
              }

          
            
        try {

          //send request to backend to register user
          const {data} = await register(JSON.stringify(valuesToSubmit));
          console.log( 'data : ', data );
          
          if (data.success===false) {
            
            setIsLoading(false);
            setApiError(`${data.message}`);
            console.log('api error: ' , data.message);

          } else {

            setIsLoading(false);           
            setApiError(`${data.message}`);
            console.log('data' , data);      
            navigate('/register/signup-success');
            
          }
      
        } catch (error) {
          setApiError(`${error.response?.data?.message || error.message}`);
        }
          
      }
            
      
      let formik = useFormik({
            initialValues: {
              name: '',
              email: '',
              password: '',
              rePassword: '',
            },
            validationSchema: EmployerRegisterSchema,
            onSubmit: handleRegister
        })

   
      return (<>

                  <form onSubmit={formik.handleSubmit} className= " font-sans pt-2">
                    
                      
                    <div className="mb-5 transition-all duration-300">
                      
                      <label htmlFor="username" className="block mb-2.5 text-sm font-medium  text-heading">Company Name</label>
                      
                      <input 
                      type="text" 
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="name" 
                      id="username" 
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm  rounded border-slate-300 focus:ring-brand transition  focus:border-brand block w-full px-3 py-3 shadow-xs placeholder:text-body" 
                      placeholder='Company Name'
                       />
                    </div>

                    {/* name error */}
                           {formik.errors.name && formik.touched.name?  ( 
                          <div className="p-4 mt-2 mb-4 text-sm bg-red-50 text-red-800 rounded-lg" >
                              <span className="font-medium">Alert!</span> {formik.errors.name}
                          </div>) :null}  


                    <div className="mb-5 transition-all duration=300">
                      <label htmlFor="email" className="block mb-2.5 text-sm font-medium  text-heading">Buisness Email Address</label>
                      <input 
                      type="email" 
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="email" 
                      id="useremail" 
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm  rounded border-slate-300 focus:ring-brand transition  focus:border-brand block w-full px-3 py-3 shadow-xs placeholder:text-body" 
                      placeholder='Buisness Email Address'
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
                              <span className="font-medium">Alert!</span> {formik.errors.password}
                          </div>) :null} 


                  {/* repassword field */}
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
                      placeholder="Aa@123456" 
                      />

                  </div>
                      {/* repassword error */}
                      {formik.errors.rePassword && formik.touched.rePassword?  ( 
                    <div className="p-4 mt-2 mb-4 text-sm bg-red-50 text-red-800 rounded-lg" >

                        <span className="font-medium">Alert!</span> {formik.errors.rePassword}

                    </div>) :null} 

                    {/********************* button ************************/}
                    
                    <button 
                    
                    type="submit" 
                    
                    className="bg-fuchsia-700  w-full hover:bg-fuchsia-800 text-white box-border border rounded hover:bg-brand-medium focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                      
                      {isLoading? <i className="fa-solid fa-spinner fa-spin"></i>: 'Sign Up' }
                      
                    </button>


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
