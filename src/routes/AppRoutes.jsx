import { RouterProvider, createBrowserRouter } from 'react-router-dom'

//Public Pages
import Home from '../pages/Main/Home'
import About from '../pages/Main/About'
import Contact from '../pages/Main/Contact'
import JobList from '../pages/Main/JobList'
import JobPublicDetails from '../pages/Main/JobPublicDetails'
import TalentList from '../pages/Main/TalentList'
import TalentPublicDetails from '../pages/Main/TalentPublicDetails'
import NotFound from '../pages/Main/NotFound'

//Auth Pages
import Register from '../pages/Auth/Register'
import Login from '../pages/Auth/Login'

//talent pages
import TalentProfile from '../pages/talent/TalentProfile'
import EditTalentProfile from '../pages/talent/EditTalentProfile'
import FindJob from '../pages/talent/FindJob'
import MyApplications from '../pages/talent/MyApplications'

//layouts
import MainLayOut from '../components/layouts/MainLayout'
import AuthLayOut from '../components/layouts/AuthLayOut'




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
            { index: true ,   element: <AuthLayOut /> },
            { path:"register" ,  element:<Register />},
            { path:"login", element:<Login />},
            
  ]
  },
  
  //3-talent routes
  { path: "talent", element: <MainLayOut /> ,
    
    children: [
      { path:"findjob" , element: <FindJob />}, //recommenditionjobs
      { path: "profile" , element: <TalentProfile />},
      { path: "profile/edit" , element: <EditTalentProfile />},
      { path: "applications" , element: <MyApplications />},

  ]},

  //4-emplyer routes

  //Not Found route
  { path: "*" , element: <NotFound />}

]);


  return <>
              <RouterProvider router={routes}></RouterProvider>
        </>
    
    
}