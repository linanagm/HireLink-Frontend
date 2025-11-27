import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import { ThemeInit } from '../.flowbite-react/init'


function App() {

  const [Count, SetCount] = useState(0)

  return (
    <>
        <ThemeInit/>
        <AppRoutes/>
        
    </>
    
  )
}

export default App
