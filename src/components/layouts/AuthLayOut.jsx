import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Main/Footer'
import CircleFrame from '../Main/CircleFrame'

export default function AuthLayOut() {

    let [ Count , SetCount ] = useState()

      useEffect (() => {}, [])
    
      return (
    <div>
      <CircleFrame />
      
      <div className='container p-7 '>
        
                <Outlet />

      </div>
      
      
    </div>
  )
}
