import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import LayOut from './components/Layout/Layout'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import NotFound from './components/NotFound/NotFound'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const routes = createBrowserRouter([

  { path: "" , element: <LayOut /> , children: [
    
    { index: true , element: <Register /> },

    { path: "login" , element: <Login /> },
    
    { path: "home" , element: <Home />},
    
    { path: "contact" , element: <Contact />},
    
    { path: "about" , element: <About />},

    { path: "*" , element: <NotFound />},

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
