import AppRoutes from './routes/AppRoutes'
import { ThemeInit } from '../.flowbite-react/init'
import { AuthProvider } from './context/AuthContext'


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
