import React, { useState, useEffect } from 'react'
import VerifyemailComponent from '../../components/Main/VerifyemailComponent'
import { Helmet } from 'react-helmet'

export default function VaerifyEmail() {

    let [ Count , SetCount ] = useState()

      
    
    useEffect (() => {}, [])


    
      return (
    <div>
        <Helmet>
            <title>Verify Email</title>
            
        </Helmet>
        <VerifyemailComponent />
    </div>

  )
}
