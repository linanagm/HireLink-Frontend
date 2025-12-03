import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useSearchParams } from 'react-router-dom'
import axiosClient from '../../services/axiosClient'
import SuccessCard from '../../components/Main/SuccessCard'

export default function VaerifyEmail() {

    let [ Count , SetCount ] = useState()
    const [ searchParams ] = useSearchParams();
    const [message, setMessage] = useState('verifying...');   

    
      useEffect(() => {

    const vt = searchParams.get("vt"); // هيرجع قيمة التوكن
    if (!vt) {
      setMessage("Expired verification url.");
      return;
    }
    
    
    const verifyUser = async () => {
      try {

        const response = await axiosClient.post("/auth/verify", { verificationToken: vt });
        
        
        if (response.data.success) {

          setMessage("Your email has been verified!");
        } else {
          
          setMessage("Error: " + response.data.message);
        }

      } catch (error) {
        console.log('error: ', error );
        
        setMessage("Some thing went wrong.!!!!");
      }
    };

    verifyUser();
  }, [searchParams]);



    
      return (
    <div>
        <Helmet>
            <title>Verify Email</title>
            
        </Helmet>
        <SuccessCard 
        
        message={message}
        buttonText={"Login now"}
        buttonLink={'/login'}

        
        />


        {/* <VerifyemailComponent message={message} /> */}
    </div>

  )
}
