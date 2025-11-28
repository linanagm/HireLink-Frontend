import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'


export default function About() {

    let [ Count , SetCount ] = useState()

      useEffect (() => {}, [])
    
      return (
    <div>
      <Helmet>
        <title>About</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    <div className='h-lvh w-full'>
          About
    </div>
 
      
    </div>
  )
}
