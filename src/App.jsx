import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home'
import LayOut from './layouts/MainLayOut/Layout'
import Login from './components/Login/Login'
import Register from './pages/Register/Register'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import NotFound from './pages/NotFound/NotFound'
import TalentProfile from './pages/talent/TalentDetails/Talent-details'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const routes = createBrowserRouter([

  { path: "" , element: <LayOut /> , children: [
    
    { index: true , element: <Register /> },

    { path: "login" , element: <Login /> },
    
    { path: "home" , element: <Home />},
    
    { path: "contact" , element: <Contact />},
    
    { path: "about" , element: <About />},

    { path: "talent/profile" , element: <TalentProfile />},//talent only
   
   


    
    { path: "*" , element: <NotFound />}
  ]}

]);

function App() {
  const [Count, SetCount] = useState(0)

  return (
    <>

        <RouterProvider router={routes}></RouterProvider>


    </>
    
  )
}

export default App
