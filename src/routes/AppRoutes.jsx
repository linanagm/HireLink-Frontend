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
import TalentProfile from '../pages/Main/talent/TalentProfile'
import EditTalentProfile from '../pages/Main/talent/EditTalentProfile'
import ProfileAvatar from '../pages/Main/talent/ProfileAvatar'
import FindJob from '../pages/Main/talent/FindJob'
import MyApplications from '../pages/Main/talent/MyApplications'
import ApplicationDetails from '../pages/Main/talent/ApplicationDetails'
import EditApplication from '../pages/Main/talent/EditApplication'
import JobProposal from '../pages/Main/talent/JobProposal'
import TalentAccountSettings from '../pages/Main/talent/TalentAccountSettings'

//employer routes
import EmployerProfile from '../pages/Main/employer/EmployerProfile'
import EditProfile from '../pages/Main/employer/EditProfile'
import PostAJob from '../pages/Main/employer/PostAJob'
import JobsList from '../pages/Main/employer/JobsList'
import JobDetails from '../pages/Main/employer/JobDetails'
import MyApplicants from '../pages/Main/employer/MyApplicants'
import SearchTalents from '../pages/Main/employer/SearchTalents'
import EditJob from '../pages/Main/employer/EditJob'


//layouts
import MainLayOut from '../components/Layouts/MainLayout'
import AuthLayOut from '../components/Layouts/AuthLayout'





/******************************************* Routes ******************************************/



export default function AppRoutes() {
  const routes = createBrowserRouter([

 
    

    //1-public routes
  { path: "/" ,
    element: <MainLayOut /> , 
    
    children: [
            //public routes
            { index: true ,   element:  <Home /> },
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
            { index: true ,  element: <AuthLayOut />  },
            { path:"register" ,  element:<Register />},
            { path:"login", element:<Login />},
            
  ]
  },
  
  //3-talent routes
  { path: "talent", element: <MainLayOut /> ,
    children: [
      { path: "findjob" , element: <FindJob />}, //recommenditionjobs
      { path: "profile" , element: <TalentProfile />},
      { path: "profile/edit" , element: <EditTalentProfile />},
      { path: "profile/avatar" , element: <ProfileAvatar />},

      { path: "applications" , element: <MyApplications />},
      { path: "applications/:applicationId" , element: <ApplicationDetails />},
      { path: "applications/:applicationId/edit" , element: <EditApplication />},
     
      { path: "jobs/:jobId/proposal" , element: <JobProposal />},
      { path: "profile/settings" , element: <TalentAccountSettings />}

  ]},

  //4-empolyer routes
  { path: "employer", element: <MainLayOut /> ,
    children: [
      { path : "profile" , element: <EmployerProfile />},
      { path : "profile/edit" , element: <EditProfile />},
      { path : "jobs" , element: <JobsList />},
      { path : "jobs/new" , element: <PostAJob />},
      { path : "jobs/:jobId" , element: <EditJob />},
      { path : "jobs/:jobId/applicants" , element: <MyApplicants />},
      { path : "jobs/:jobId/applicants/search" , element: <SearchTalents />},
      { path : "jobs/:jobId" , element: <JobDetails />},

      
    ]},


  //Not Found route
  { path: "*" , element: <NotFound />}

]);


  return <>
              <RouterProvider router={routes}></RouterProvider>
        </>
    
    
}


