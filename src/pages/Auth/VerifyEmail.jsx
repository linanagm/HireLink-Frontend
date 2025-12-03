import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axiosClient from '../../services/axiosClient'
import SuccessCard from '../../components/Main/SuccessCard'

export default function VaerifyEmail() {
    const [ isLoading , setIsLoading ] = useState(true);
    const [ isError , setIsError ] = useState(false)
    const [ searchParams ] = useSearchParams();
    const [message, setMessage] = useState('verifying...');   
   // const navigate = useNavigate();
    
      useEffect(() => {

        const vt = searchParams.get("vt"); 
        if (!vt) {
          setMessage("Expired verification url.");
          setIsError(true);
          setIsLoading(false);
          return;
        }
        
        const verifyUser = async () => {
          try {

            const res = await axiosClient.post("/auth/verify", { verificationToken: decodeURIComponent(vt) } )
            if (res.data.statusCode === 200 || res.data.success === true) {

              setMessage(res.data.message || "Email verified successfully");
              setIsError(false);
        
            }else{
              setMessage(res.data.message || 'Verification failed');
              setIsError(true);
            }
          

          } catch (error) {
            console.log('varification error: ', error );
            
        }finally{
          setIsLoading(false);
        }
        setIsError(false);
      }

        verifyUser();
      }, [searchParams ]);

    

    
      return (
    <div>
        <Helmet>
            <title>Verify Email</title>
            
        </Helmet>
        <SuccessCard 
        isError={isError}
        message={message}
        buttonText={isLoading ? 'Verifying...' : 'Login now'}
        buttonLink={isLoading ? null : '/login'}

        
        />

    </div>

  )
}
