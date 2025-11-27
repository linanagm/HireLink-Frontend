import React, { useState, useEffect } from 'react'
import RegisterForm from '../../components/Main/RegisterForm'

export default function Register() {

    let [ Count , SetCount ] = useState()

      useEffect (() => {}, [])
    
      return (
    <div>
      <RegisterForm />
    </div>
  )
}
