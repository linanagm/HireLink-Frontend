import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import { ThemeInit } from '../.flowbite-react/init'
import { AuthProvider } from './context/AuthContext'


function App() {

  const [Count, SetCount] = useState(0)

  return (
    <>
        <ThemeInit/>
        <AuthProvider>
            <AppRoutes/>
        
        </AuthProvider>
        
    </>
    
  )
}

export default App
