import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Main/Footer'
import NavbarComponent from '../Main/Navbar'

export default function AuthLayOut() {

    let [ Count , SetCount ] = useState()

      useEffect (() => {}, [])
    
      return (
    <div>
      <NavbarComponent />
      <Outlet />
      <Footer />
    </div>
  )
}
