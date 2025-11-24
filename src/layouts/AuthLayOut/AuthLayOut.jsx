import React, { useState, useEffect } from 'react'
import Styles from './AuthLayOut.module.css'
import { Outlet } from 'react-router-dom'

export default function AuthLayOut() {

    let [ Count , SetCount ] = useState()

      useEffect (() => {}, [])
    
      return (
    <div>
      <Outlet />
    </div>
  )
}
