import React , { useState, useEffect } from 'react'
import Navbar from '../Main/Navbar'
import Footer from '../Main/Footer'
import { Outlet } from 'react-router-dom'


export default function MainLayOut() {

    let [ Count , SetCount ] = useState(0)

      useEffect (() => {}, [])
    
      return (
    <div>
      <Navbar/>

        <div className="container mx-auto py-11">
            
            <Outlet/>

        </div>
        
     
    
      <Footer/>
    </div>
  )
}

