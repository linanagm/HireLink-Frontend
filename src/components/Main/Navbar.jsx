import React, { useEffect, useContext, useState } from 'react'
 import logo from '../../assets/images/HL.svg'
 import {  Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import 'flowbite';
import profileImage from '../../assets/images/profile/profile-picture.svg'

export default function NavbarComponent() {
    const {token, currentUser, logout  } = useContext(AuthContext);
    const [open , setOpen ] = useState(false)
    const [openNotify , setOpenNotify ] = useState(false)
    const navigate = useNavigate();

      
    useEffect(() => {      
    }, []);
      return (

    
//  home page Navba
    <nav className="bg-neutral-primary static flex flex-wrap  w-full h-16 max-w-screen-2xl z-20 top-0 start-0 border-b border-default mx-auto p-4 justify-evenly items-center">
      
        {/* left side */}
        <div className="w-1/2 h-full flex items-center justify-start gap-7">
                {/* HL logo */}
          <NavLink to={""} className=" flex items-center space-x-3 rtl:space-x-reverse">
                <img src={logo} className="h-7" alt="HireLink Logo" />
                <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">HireLink</span>
          </NavLink>
          
            {/* mobile collapse button mobile view*/}
          <div className="inline-flex md:order-2 md:hidden lg:hidden space-x-3 md:space-x-0 rtl:space-x-reverse">       
          
                <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-cta" aria-expanded="false">
            
                  <span className="sr-only">Open main menu</span>
            
                  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/></svg>
              
                </button>
          
          </div>

            {/* navlink desktop only */}
          <div className=" items-center justify-between hidden  md:flex md:w-auto md:order-1 " id="navbar-cta">


            {/* home nav tabs */}
            {!token && (
                
            <ul className=" font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
          
                  <li>
                    <NavLink to={""} className="block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0  text-neutral-800 hover:text-fuchsia-800" aria-current="page">Home</NavLink>
                  </li>
              
                  <li>
                    <NavLink to={"about"} className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent  text-neutral-800 hover:text-fuchsia-800">About</NavLink>
                  </li>
              
                  <li>
                    <NavLink to={"contact"} className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent  text-neutral-800 hover:text-fuchsia-800">Contact</NavLink>
                  </li>

            </ul>
  
            )}
            
            {/* talent nav tabs */}
            {token && currentUser.role === 'TALENT' &&  (

              // talent nav tabs
               <ul className=" font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                
              <li>
                <NavLink to={'/'} className="block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0  text-neutral-800 hover:text-fuchsia-800" aria-current="page">Find Job</NavLink>
              </li>
          
              <li>
                <NavLink to={"/applications"} className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent  text-neutral-800 hover:text-fuchsia-800">My Applications</NavLink>
              </li>
              </ul>
            )}


            {token && currentUser.role === 'EMPLOYER' &&  (

              // talent nav tabs
               <ul className=" font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                
              <li>
                <NavLink to={""} className="block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0  text-neutral-800 hover:text-fuchsia-800" aria-current="page">Dashboard</NavLink>
              </li>
          
              <li>
                <NavLink to={"/jobs/new"} className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent  text-neutral-800 hover:text-fuchsia-800">Post a job</NavLink>
              </li>

              <li>
                <NavLink to={"/jobs/:jobId/applicants/search"} className="block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0  text-neutral-800 hover:text-fuchsia-800" aria-current="page">Search Talents</NavLink>
              </li>
          
              <li>
                <NavLink to={"about"} className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent  text-neutral-800 hover:text-fuchsia-800">Manage Listings</NavLink>
              </li>

              </ul>
            )}
         
                    
          </div>


        </div>

          {/* right buttons */}
        <div className=' w-1/2 h-full flex items-center justify-between gap-20   md:flex md:w-auto md:order-1 ' id="navbar-cta">
          
          {/* Search input */}
          <form className="w-1/2 md:max-w-md flex items-start px-4 mx-4">   
                <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
                <div className="relative">
                    <button className="absolute inset-y-0 start-0 flex items-center ps-3 ">
                        <i className="fa-solid fa-magnifying-glass text-fuchsia-800 mr-2"></i>
                    </button>
                    <input type="search" id="search" className="block w-full   rounded-xl  placeholder:text-body px-16" placeholder="Search" required />
                </div>
          </form>
          
          <div className='w-1/2  flex items-center '>
              {/* login & sign up buttons */}
            { !token ?  (
              
              <ul className='flex flex-col lg:flex-row gap-7 item-center justify-items-end'>
              
                    <li>
                    <NavLink to={'login'} className='my-btn-outline box-border border border-col  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none'>Login
                    </NavLink>                      
                    </li>

                    <li>
                      <NavLink to={'register'} className='my-btn-solid  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none'> Sign up
                      </NavLink>                        
                    </li>
                
              </ul>
          
            ) : (

            // avatar & notification - talent
            <ul className='flex flex-col lg:flex-row gap-7  justify-items-end  px-14'>

                {/* Notification */}
              <li className="relative">
                    {/* notification icon */}
                  <button
                    onClick={() => {setOpenNotify(!openNotify); setOpen(false) }}
                    className="flex text-sm items-center justify-center rounded-full focus:text-slate-400 focus:ring-gray-300"
                    type="button"
                  >
                    <i className="fa-regular fa-bell text-slate-600 text-2xl"> </i>
                    
                  </button>

              {/* notification Dropdown */}
              {openNotify && !open && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-xl z-50">

                  {/* Menu */}
                  <ul className="p-2 text-sm font-medium text-gray-700">
                    <li>
                      <Link
                        to={'talent/profile'}
                        className="flex items-center p-2 rounded text-slate-800 hover:bg-slate-100 hover:text-black"
                      >
                                            Notification
                      </Link>
                    </li>
                  
                  </ul>
                </div>

                )}
              </li>    

                  {/* Avatar Dropdown */}
              <li className="relative">
              
                <button
                  onClick={() => {setOpen(!open); setOpenNotify(false) }}
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                  type="button"
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={currentUser?.image || profileImage}
                    alt="user avatar"
                  />
                </button>

                {/* Dropdown */}
                {open && !openNotify && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-xl z-50">
                    
                    {/* Profile header */}
                    <div className="p-3 flex items-center gap-2 bg-gray-100 rounded-t-xl">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={currentUser.image || profileImage}
                        alt="profile avatar"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {currentUser.name || "User Name"}
                        </div>
                        <div className="text-sm text-gray-600 truncate">
                          {currentUser.email || "name@email.com"}
                        </div>
                      </div>
                      
                    </div>

                    {/* Menu */}
                    <ul className="p-2 text-sm font-medium text-gray-700">
                      <li>
                        <Link
                          to={'talent/profile'}
                          className="flex items-center p-2 rounded text-slate-800 hover:bg-slate-100 hover:text-black"
                        >
                          <i className="fa-regular fa-user text-slate-800 mr-2"></i>
                          Account
                        </Link>
                      </li>

                      <li>
                        <Link
                          to={'talent/profile//settings'}
                          className="flex items-center p-2 rounded text-slate-800 hover:bg-slate-100 hover:text-black"
                        >
                          <i className="fa-solid fa-gear text-slate-800 mr-2"></i>
                          Setting & Privacy
                        </Link>
                      </li>

                      <li>
                        <button
                          onClick={() => {
                            logout();
                            navigate("/");
                          }}
                          className="flex items-center w-full p-2 text-red-600 rounded hover:bg-gray-100"
                        >
                          <i class="fa-solid fa-arrow-right-from-bracket text-slate-800 mr-2"></i>
                          Sign out
                        </button>
                      </li>


                    </ul>
                  </div>

                )}
              </li>    

            









            </ul>)}

          </div>
          
        
        </div>  

    </nav>
    
    

)
}



