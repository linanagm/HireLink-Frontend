import { RouterProvider, createBrowserRouter } from 'react-router-dom'

//Public Pages
import Home from '../pages/public/Home/Home'
import About from '../pages/public/About/About'
import Contact from '../pages/public/Contact/Contact'
import JobList from '../pages/public/JobList/JobList'
import JobPublicDetails from '../pages/public/JobPublicDetails/JobPublicDetails'
import TalentList from '../pages/public/TalentList/TalentList'
import TalentPublicDetails from '../pages/public/TalentPublicDetails/TalentPublicDetails'
import NotFound from '../pages/public/NotFound/NotFound'

//Auth Pages
import Register from '../pages/Auth/Register/Register'
import Login from '../pages/Auth/Login/Login'

//layouts
import MainLayOut from '../layouts/MainLayOut/MainLayOut'
import AuthLayOut from '../layouts/AuthLayOut/AuthLayOut'








export default function AppRoutes() {
  const routes = createBrowserRouter([

    //1-public routes
  { path: "/" , element: <MainLayOut /> , 
    
    children: [
            //public routes
            { index: true ,   element: <Home /> },
            { path:"about" ,  element:<About />},
            { path:"contact", element:<Contact />},

            //Public Jobs
            { path:"jobs" , element:<JobList />},
            { path:"jobs/:jobId" , element:<JobPublicDetails />},
            
            //Public Talents list
            { path:"talents" , element:<TalentList />},
            { path:"talents/:talentId" ,element:<TalentPublicDetails />}
  ]
},

  //2-auth routes
  { path: "/auth" , element: <AuthLayOut />, 
    
    children: [
            //auth routes
            { index: true ,   element: <authLayOut /> },
            { path:"register" ,  element:<Register />},
            { path:"login", element:<Login />},
            
  ]
  },
  
  //3-talent routes

  //4-emplyer routes

  //Not Found route
  { path: "*" , element: <NotFound />}

]);


  return <>
              <RouterProvider router={routes}></RouterProvider>
        </>
    
    
}