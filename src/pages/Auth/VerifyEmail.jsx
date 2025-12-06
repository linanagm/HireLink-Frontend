import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import {  useNavigate, useSearchParams } from 'react-router-dom'
import SuccessCard from '../../components/Main/SuccessCard'
import {  verifyEmail } from '../../services/authService'

export default function VaerifyEmail() {
    const [ params ] = useSearchParams();
    const [message, setMessage] = useState('verifying...');   
    const [status , setStatus] = useState('loading');
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();
    
      useEffect(() => {
        async function doVerify () {

          if(isVerified) return;
          
          
            const verificationToken = params.get("vt");
            
            if (!verificationToken) {
              setStatus('error')
              setMessage( "Missing verification token.");
              setIsVerified(true);
              return;
            }

        try {

            //call api
            const data = await verifyEmail( verificationToken  );
            //console.log('response : \n',data);
    
            if (data.ok || data.message === "email already verified") {
              setStatus('success');
              setMessage('Email verified successfully.');
            } else {
              setStatus('error');
              setMessage(data.message || "Verification failed.");
            }


          } catch (error) {

            console.log('varification error: ', error );
            
            setStatus('error');
            setMessage("Network error, Please try again.");
            
          }
          
          setIsVerified(true);

          // remove params from url
        navigate('/verify', { replace: true });
        setTimeout(() => { navigate('/login'); }, 3000);    
        
        }
        doVerify();
        

      },[] );


    
      return (
    <div>
        <Helmet>
            <title>Verify Email</title>
            
        </Helmet>
        <SuccessCard 

        status={status}
        message={message}
        buttonText={status==='loading' ? 'Verifying...' : 'Login now'}
        buttonLink={status==='loading' ? null : '/login'}

        
        />

    </div>

  )
}
