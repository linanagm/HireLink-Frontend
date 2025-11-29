import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
          <App />
    </AuthProvider>
    
  </StrictMode>,
)
