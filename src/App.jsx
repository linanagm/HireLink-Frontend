import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import { ThemeInit } from '../.flowbite-react/init'
import { AuthProvider } from './context/AuthContext'

import AppRoutes from './routes/AppRoutes';
import { ThemeInit } from '../.flowbite-react/init';

function App() {
  return (
    <>
        <ThemeInit/>
        <AuthProvider>
            <AppRoutes/>
        
        </AuthProvider>
        
    </>
  );
}

export default App;
