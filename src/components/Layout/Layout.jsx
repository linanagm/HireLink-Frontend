import React, { useState, useEffect } from 'react'
import Styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'


export default function LayOut() {

    let [ Count , SetCount ] = useState()

      useEffect (() => {}, [])
    
      return (
    <div>
      <Navbar/>


        <Outlet/>
     
    
      <Footer/>
    </div>
  )
}
