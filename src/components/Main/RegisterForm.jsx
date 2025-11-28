import { Button } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import signupImage from '../../assets/images/signup.svg'
import { NavLink } from 'react-router-dom'

export default function RegisterForm() {

    let [ activeTab , SetActiveTab ] = useState('talent')
    // username
    const nameLabel = activeTab === 'talent' ? 'Username' : 'Company Name';
    const namePlaceholder = activeTab === 'talent' ? 'Enter your name' : 'Enter your company name';

    // email
    const emailLabel = activeTab === 'talent' ? 'Email' : 'Company Email';
    const emailPlaceholder = activeTab === 'talent' ? 'Enter your email' : 'Enter your company email';  
     
    
      useEffect (() => {}, [])
    
      return (<>

          <div className=' flex flex-wrap flex-col md:flex-row max-w-screen-xl mx-auto items-center justify-center py-64 md:py-7  gap-3'>
              <div className=' bg-slate-500'>
                  <img src={signupImage} className=''/>
              </div>

            
              <div className='w-11/12 md:w-1/2'>
            
                  <h2 className='text-3xl font-semi-bold text-heading pb-2'>Sign Up</h2>
                                
                                {/************* tabs ******************** */}
                  <div class="text-sm font-medium text-center text-body border-b border-default ">
                    <ul class="flex flex-wrap -mb-px">

                        <li className="me-2">
                            <button 
                              onClick={() => SetActiveTab('talent')}
                              className={`inline-block p-4  rounded-t-base font-thin transition-colors duration-300 
                                ${
                                  activeTab === 'talent'
                                  ? 'text-fuchsia-800 border-b-2 border-fuchsia-800'
                                  : ' text-gray-900 border-b border-transparent hover:text-fuchsia-800 hover:border-fuchsia-800 '
                                }`}
                              >
                              Talent
                            </button>
                        </li>
                      
                        <li class="me-2">
                            <button 
                              onClick={() => SetActiveTab("employer")} 
                              className={`inline-block p-4 rounded-t-base 
                                 ${
                                  activeTab === 'employer'
                                  ? 'text-fuchsia-800 border-b-2 border-fuchsia-800'
                                  : ' text-gray-900 border-b border-transparent hover:text-fuchsia-800 hover:border-fuchsia-800 '
                                }`} 
                              aria-current="page"
                              >
                                Employer
                            </button>
                        </li>
                    </ul>
                  </div>

                                   {/* ***************** inputs ****************** */}

                  <form className= " font-sans pt-2">
                    
                    <div className="mb-5 transition-all duration-300">
                      
                      <label htmlFor="username" className="block mb-2.5 text-sm font-medium  text-heading">{nameLabel}</label>
                      
                      <input 
                      type="text" 
                      name="username" 
                      id="username" 
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm  rounded border-slate-300 focus:ring-brand transition  focus:border-brand block w-full px-3 py-3 shadow-xs placeholder:text-body" 
                      placeholder={namePlaceholder} 
                       />

                    </div>

                    <div className="mb-5 transition-all duration=300">
                      <label htmlFor="email" className="block mb-2.5 text-sm font-medium  text-heading">{emailLabel}</label>
                      <input type="email" name="email" id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm  rounded border-slate-300 focus:ring-brand transition  focus:border-brand block w-full px-3 py-3 shadow-xs placeholder:text-body" placeholder={emailPlaceholder}  />
                    </div>
                    
                    <div className="mb-5">
                      <label htmlFor="password" class="block mb-2.5 text-sm font-medium text-heading">Your password</label>
                      <input type="password" name="password" id="password" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded border-slate-300 focus:ring-brand transition focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••"  />
                  </div>

                  <div className="mb-5">
                      <label htmlFor="password"  class="block mb-2.5 text-sm font-medium text-heading">Confirm Password</label>
                      <input type="password" name="password" id="password" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded border-slate-300 focus:ring-brand transition focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••" required />
                  </div>

                    {/********************* button ************************/}
                    <button type="submit" className="bg-fuchsia-700  w-full hover:bg-fuchsia-800 text-white box-border border rounded hover:bg-brand-medium focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</button>
                  
                  </form>
              </div>

        
          </div>
</>
  )
}
