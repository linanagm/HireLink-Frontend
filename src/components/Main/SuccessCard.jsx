import React, {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import correctImage from '../../assets/images/correct.svg'


export default function SuccessCard({
    
    to,
    status,
    message,
    routeText,
    buttonText,
    buttonLink
    
}) {



      useEffect (() => {}, [])
    
      return (
    
        
      <div className='w-full h-full bg-red-500'>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col bg-neutral-primary-soft max-w-md h-auto border item-center justify-center border-default rounded-base shadow-xs p-7 rounded-t-3xl">
           
                { status  && (
                            <img className="fixed top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-t-base w-1/5  right-1/2 py-2" 
                            
                            src={correctImage}  
                            alt="success" />
              
)}
                
                <div className="p-6 text-center ">

                    {/* You've successfully signed up! */}
                    <h5 className='text-slate-700 font-sans text-2xl mb-3'> {message} </h5>
                    


                    {routeText && to  &&  (
                        <Link to={to}  className='text-blue-700 hover:underline hover:text-blue-500 '>
                        {/* <p>Please check your email to verify your account</p> */}
                        <p>{routeText}</p>
                        <br/>
                        </Link>
                
                    )}
                        
                    {/* to= {"profile/edit"} */}
                    {buttonLink && buttonText && (
                        <Link to={buttonLink}  className="inline-flex items-center my-3 text-white rounded-lg bg-fuchsia-700 box-border border border-transparent hover:bg-fuchsia-600 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                            
                            {buttonText}
                            <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                        </Link>
                    
                    )}
                    
                </div>


            </div>

      </div>

        
    
  )
}
