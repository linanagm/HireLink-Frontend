import React , { useState, useEffect } from 'react'
import Footer from '../Main/Footer'
import { Outlet } from 'react-router-dom'
import NavbarComponent from '../Main/Navbar'


export default function MainLayOut() {

    let [ Count , SetCount ] = useState(0)

      useEffect (() => {}, [])
    
      return (
    <div className='flex flex-col min-h-screen w-max-screen'>
      <div className='w-full h-10 py-7'>
          <NavbarComponent/>

      </div>
      
      <div className='flex-grow container  mx-auto py-4 '>
        <Outlet/>
      </div>
      
      
      <Footer/>
    </div>
  )
}

