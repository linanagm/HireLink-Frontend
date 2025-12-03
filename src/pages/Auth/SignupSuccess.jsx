import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import SuccessCard from '../../components/Main/SuccessCard';


export default function SignupSuccess() {
  
  let [ Count , SetCount ] = useState()

    
    useEffect (() => {}, []);
    
      return (
    <div>
        <Helmet>
            <title>Sign up Successfully</title>
            
        </Helmet>
        <SuccessCard
        to={'https://mail.google.com/mail/u/0/#inbox'}
        //target={'_blank'}
        message={'sign up successfully!!!'}
        routeText={"Check your email to verify your account"}
        //buttonText={"Login now"}
        //buttonLink={'/login'}
     />
    </div>

  )
}
