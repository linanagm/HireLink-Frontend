import React , { useState, useEffect } from 'react'
import circleImage from '../../assets/images/circle.svg'
import Hlogo from '../../assets/images/H.svg'
export default function MainLayOut() {

    let [ Count , SetCount ] = useState(0)

      useEffect (() => {}, [])
    
      return (
    <div className=' relative -right-5 -top-5  md:top-3 md:right-3  lg:top-0 lg:right-0  items-center justify-center w-100 ' >
      <img src={circleImage} className='absolute -right-5 top-0  w-64 h-64z-40'/>
      <img src={Hlogo} className=' absolute top-10 right-10 items-center z-50 justify-center w-15 h-15'/>
    </div>
  )
}

