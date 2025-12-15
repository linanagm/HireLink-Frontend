import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik'
import { contactUsSchema } from '../../../utils/validation/generalValidation'
import FormInput from '../../../components/UI/FormInput';
import contactImage from '../../../assets/images/contact.svg'
import Button from '../../../components/UI/Button';

export default function Contact() {

  const [success, setSuccess] = useState(false);

    const handleContactUs = async (values ,  { resetForm }) => {

      //هتتغير لما نربط الباك اند
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(values);
        //---------------------

        setSuccess(true);
        resetForm();
    };

    let [ Count , SetCount ] = useState(0)

     const formik = useFormik({
         initialValues: { 
          name: "", 
          email: "", 
          subject: "", 
          message: "", 
        }, validationSchema:contactUsSchema ,
         onSubmit:handleContactUs
})
        

      useEffect (() => {}, [])
    
      return (
    <div>
      <Helmet>
        <title>Contact Us</title>
        <meta name="description" content="Helmet application" />
      </Helmet>


        <div className='flex md:flex-col min-w-screen items-center justify-center'>
          
          <h1 className='w-full text-center font-bold p-6 text-3xl'>Contact Us</h1>
          
          <div className='flex flex-col md:flex-row w-full max-w-6xl flex-1 items-center rounded-3xl shadow-md shadow-slate-100'>
            
            <div className='w-full md:w-1/2  flex justify-center items-center p-6"'>
              <img src={contactImage} alt="contact" className='max-w-full h-auto' />
            </div>
          
            <div className='w-full md:w-1/2 p-8 flex items-center'>

              <form 
              onSubmit={formik.handleSubmit}
              className='w-full bg-white p-6 rounded-xl shadow space-y-4'>
                    <FormInput 
                    label="Name" 
                    name="name" 
                    type="text" 
                    value={formik.values.name} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    required 
                    />

                    <FormInput 
                    label="Email" 
                    name="email" 
                    type="email" 
                    value={formik.values.email} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    required />
                    
                    <FormInput 
                    label="Subject" 
                    name="subject" 
                    type="text" 
                    value={formik.values.subject} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    required 
                    />

                    <div className="flex flex-col">
                      <label className="mb-1 font-semibold">Message</label>
                      <textarea
                        name="message"
                        rows="4"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border p-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                      />
                    </div>              
                    
                    
                    <Button
                        type="submit"
                        loading={formik.isSubmitting}
                    >
                        Send Message
                    </Button>
                    
                    {success && (
                      <p className="text-green-600 mt-2">
                        Thanks! We received your message.
                      </p>
                    )}

              </form>
            </div>


          </div>
          
        </div>
                                           
        
      
    </div>
  )
}
