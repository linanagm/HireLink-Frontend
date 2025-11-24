import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

export default function Home() {

    let [ Count , SetCount ] = useState()

      useEffect (() => {}, [])
    
      return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
 
      
      home
    </>
      )
}
