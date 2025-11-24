import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'


function App() {

  const [Count, SetCount] = useState(0)

  return (
    <>
        <AppRoutes/>
    </>
    
  )
}

export default App
