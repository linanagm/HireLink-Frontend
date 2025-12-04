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
          try {
            const verificationToken = params.get("vt");
            
            if (!verificationToken) {
              setStatus('error')
              setMessage( "Missing verification token.");
              return;
            }

            //call api
            const res = await verifyEmail( verificationToken  );
            console.log('response : \n',res);
            
            setStatus('success');
            setMessage(res.message);

          } catch (error) {

            console.log('varification error: ', error );
            
            setStatus('error');

            if (error.response.data.message){
            
              setMessage(error.response.data.message);
            
            }else {
            
              setMessage("Network error, Please try again.");
            
            }
          }
          setIsVerified(true);

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
