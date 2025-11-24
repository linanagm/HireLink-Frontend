import React , { useState, useEffect } from 'react'
import Navbar from '../../components/Main/Navbar'
import Footer from '../../components/Main/Footer'
import { Outlet } from 'react-router-dom'


export default function MainLayOut() {

    let [ Count , SetCount ] = useState(0)

      useEffect (() => {}, [])
    
      return (
    <div>
      <Navbar/>


        <Outlet/>
     
    
      <Footer/>
    </div>
  )
}

