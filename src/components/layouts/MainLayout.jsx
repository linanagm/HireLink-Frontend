import React , { useState, useEffect } from 'react'
import Footer from '../Main/Footer'
import { Outlet } from 'react-router-dom'
import NavbarComponent from '../Main/Navbar'


export default function MainLayOut() {

    let [ Count , SetCount ] = useState(0)

      useEffect (() => {}, [])
    
      return (
    <div>
      <NavbarComponent/>

        <div className='container mx-auto py-4 '>
                <Outlet/>
        </div>
      
    
      <Footer/>
    </div>
  )
}

