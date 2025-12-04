import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

export default function Contact() {

    let [ Count , SetCount ] = useState(0)

      useEffect (() => {}, [])
    
      return (
    <div>
      <Helmet>
        <title>Forgot password</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
        <div className='h-lvh w-full'>
          Forgot Password
        </div>
      
    </div>
  )
}
