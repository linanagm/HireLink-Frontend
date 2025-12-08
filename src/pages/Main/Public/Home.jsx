import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'
import heroImage from '../../../assets/images/home.svg'

export default function Home() {

    let [ Count , SetCount ] = useState(0)

      useEffect (() => {}, [])
    
      return (
        
    <div className='container '>
      <Helmet>
        <title>Home</title>
      </Helmet>
  
      <div className='hero-section flex  max-w-screen-xl justify-between items-center mx-auto py-7 '>
        
        <div className='flex-col  py-11 gap-5  '>
            <div className='text-2xl font-bold '>        
        
              <h1 className='text-7xl py-4 font-bold text-black'><span className='text-fuchsia-800'>Connecting</span>
              You to the World’s <span className='text-fuchsia-800'>
              Best Tech Talent.</span></h1>
              
              
            </div>
            <div className='flex flex-col justify-center items-center  py-4'>
                <span>Discover, evaluate, and hire top tech professionals for projects of any size. Flexible hiring models designed for your success.</span>
            </div>
            <NavLink  to={'/register'} className='my-btn-outline  class="text-success bg-neutral-primary border border-success hover:bg-success hover:text-white focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Success</>
'> Join Us</NavLink>


        </div>

        <img src={heroImage} className=''/>
      
      </div>

    </div>
  )
}
