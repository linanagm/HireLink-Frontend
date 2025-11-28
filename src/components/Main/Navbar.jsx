import React, { useState, useEffect } from 'react'
import logo from '../../assets/images/HL.svg'
import { NavLink } from 'react-router-dom'


export default function NavbarComponent() {

    let [ Count , SetCount ] = useState(0)

      useEffect (() => {}, [])
    
      return (

    

<NavLink className="bg-neutral-primary static w-full z-20 top-0 start-0 border-b border-default mx-auto p-4 justify-center items-center">

  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 ">
  
        {/* logo */}
      <NavLink to={''} className=" flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-7" alt="HireLink Logo" />
            {/* <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">HireLink</span> */}
      </NavLink>
      
        {/* mobile collapse button */}
      <div className="inline-flex md:order-2 md:hidden lg:hidden space-x-3 md:space-x-0 rtl:space-x-reverse">
      
      
            <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-cta" aria-expanded="false">
        
              <span className="sr-only">Open main menu</span>
        
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/></svg>
          
            </button>
      
      </div>

        {/* navlink desktop only */}
      <div className="items-center justify-between hidden  md:flex md:w-auto md:order-1 " id="navbar-cta">
      
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
      
          <li>
            <NavLink to={''} className="block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</NavLink>
          </li>
      
          <li>
            <NavLink to={'about'} className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">About</NavLink>
          </li>
      
          <li>
            <NavLink to={'contact'} className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Contact</NavLink>
          </li>

          
        </ul>
      
      </div>


      <div className='items-center justify-between hidden  md:flex md:w-auto md:order-1 ' id="navbar-cta">
          <ul className='flex flex-col lg:flex-row gap-2 item-center'>
          
          <li>
            <NavLink to={'login'} className='my-btn-outline box-border border border-col  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none'>Login
                {/* <button  type="button" className=" my-btn-outline bg-brand box-border border border-col hover:bg-var rounded focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Login</button> */}
            </NavLink>
            
          </li>
      
          <li>
            <NavLink to={'register'} className='my-btn-solid  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none'> Sign up
                {/* <button type="button" className=" btn-solid hover:text-black rounded focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Signup</button>             */}
            </NavLink>
            
          </li>
      
        </ul>
      
      
      </div>  
        
      
  </div>

</NavLink>

    
  )
}
