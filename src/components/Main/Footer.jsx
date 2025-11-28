import React, { useState, useEffect } from 'react'
import footerBanner from '../../assets/images/footer.svg'
import whiteLogo from '../../assets/images/H-white.svg'
import { NavLink } from 'react-router-dom'


export default function Footer() {

    let [ Count , SetCount ] = useState()

      useEffect (() => {}, [])
    
      return <>
      
    <footer className=" relative bottom-0 right-0 left-0  h-52 items-center justify-center gap-2  text-slate-200 ">

        <img src={footerBanner} className="h-full w-full absolute inset-0 object-cover " alt="footer background" />
        <div className='h-full w-full absolute inset-0 object-cover bg-black opacity-10'></div>
        <div className="absolute inset-0 h-full text-center mx-auto w-full max-w-screen-xl p-4 py-6 px-11lg:py-8 ">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center">

                {/* left side -> logo */}
                <div className="mb-6 md:mb-0 items-center justify-center text-xs  gap-3">
                  <span className=" text-body text-sm sm:text-center">Copyright © 2023 H.<br/>All Rights Reserved.

                  </span>
                 

                    <NavLink to={""} className="flex items-center justify-center p-2 ">
                        <img src={whiteLogo} className="h-7 me-3" alt="FlowBite Logo" />
                    </NavLink>

                </div>
               
               {/* right side -> lists */}
                <div className="flex  sm:gap-6 text-sm  px-10  ">

                    {/* company section */}
                    <div className='w-60'>
                        <h2 className="mb-6 text-sm font-normal text-heading   !important font-">Company</h2>
            
                        <ul className="text-body">
                            <li className="mb-4">
                                <NavLink to={'/about'} className="text-white text-xs !important hover:underline">About Us</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/contact'} className=" text-xs hover:underline">Contact Us</NavLink>
                            </li>
                        </ul>
            
                    </div>

                    {/* support us section */}
                    <div className=' w-60'>
            
                        <h2 className="mb-6 text-sm font-normal text-heading ">Support us</h2>
            
                        <ul className="text-body font-medium">
                            <li className="mb-4">
                                <NavLink to={''} className=" text-xs hover:underline ">Help Center</NavLink>
                            </li>
                            <li>
                                <NavLink to={''} className=" text-xs hover:underline">Terms of services</NavLink>
                            </li>
                            <li>
                                <NavLink to={''} className=" text-xs hover:underline">Legal</NavLink>
                            </li>
                            <li>
                                <NavLink to={''} className=" text-xs hover:underline">Privacy policy</NavLink>
                            </li>
                            <li>
                                <NavLink to={''} className=" text-xs hover:underline">Status</NavLink>
                            </li>
                        </ul>
            
                    </div>

                    {/* legal section */}
                    <div className="w-60 ">
                        <h2 className="mb-6 text-sm font-normal text-heading ">Legal</h2>
                      
                        <ul className="text-body font-medium">
                            <li className="mb-4">
                                <NavLink to={"#"} className="hover:underline">Terms of Service</NavLink>
                            </li>
                            <li>
                                <NavLink to={"#"} className="hover:underline">Cookie Policy</NavLink>
                            </li>
                        </ul>
          
                    </div>

                    {/* socials */}
                    <div className='lg:flex-col  justify-between items-center text-lg'>
                        <ul className='flex gap-3'>
                            <li><i className="fa-brands fa-facebook"></i></li>
                            <li><i className="fa-brands fa-youtube"></i></li>
                            <li><i className="fa-brands fa-instagram"></i></li>
                        </ul>

        
                        

                    </div>
                    
                    
                    
  
                </div>

            </div>

        </div>

    </footer>

      </>
  
}
