import React , { useState, useEffect } from 'react'
import Styles from './MainLayOut.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
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

