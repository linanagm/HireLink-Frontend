import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

export default function JobList() {

    let [ Count , SetCount ] = useState()

      useEffect (() => {}, [])
    
      return (
    <div>
      <Helmet>
        <title>Jobs List</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
 
      jobList
    </div>
  )
}
