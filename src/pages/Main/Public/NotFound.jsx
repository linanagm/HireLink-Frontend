import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

export default function NotFound() {

    let [ Count , SetCount ] = useState()

      useEffect (() => {}, [])
    
      return (
    <div>
      <Helmet>
        <title>Not Found</title>
        <meta name="description" content="Helmet application" />
     </Helmet>
        
      notFound
    </div>
  )
}
