import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
//Public Pages

const Home = lazy (()=>import ('../pages/Main/Home'));
const About = lazy (()=> import('../pages/Main/About'));
const Contact = lazy(()=> import('../pages/Main/Contact'));
const JobList = lazy (()=> import('../pages/Main/JobList'));
const JobPublicDetails = lazy (()=> import('../pages/Main/JobPublicDetails'))
const TalentList = lazy(()=> import ('../pages/Main/TalentList'));
const TalentPublicDetails = lazy(()=>import('../pages/Main/TalentPublicDetails'));
const NotFound = lazy(()=>import('../pages/Main/NotFound'))

//Auth Pages
const Register = lazy(()=>import('../pages/Auth/Register'));
const Login = lazy(()=>import('../pages/Auth/Login'))

//talent pages
const TalentProfile = lazy(()=>import('../pages/Main/talent/TalentProfile'))
const EditTalentProfile = lazy(()=>import('../pages/Main/talent/EditTalentProfile'))
const ProfileAvatar = lazy(()=>import('../pages/Main/talent/ProfileAvatar'))
const FindJob = lazy(()=>import('../pages/Main/talent/FindJob'))
const MyApplications = lazy(()=>import('../pages/Main/talent/MyApplications'))
const ApplicationDetails = lazy(()=>import('../pages/Main/talent/ApplicationDetails'))
const EditApplication = lazy(()=>import('../pages/Main/talent/EditApplication'))
const JobProposal = lazy(()=>import('../pages/Main/talent/JobProposal'))
const TalentAccountSettings = lazy(()=>import('../pages/Main/talent/TalentAccountSettings'))

//employer routes
const EmployerProfile = lazy(()=>import('../pages/Main/employer/EmployerProfile'))
const EditProfile = lazy(()=>import('../pages/Main/employer/EditProfile'))
const PostAJob = lazy(()=>import('../pages/Main/employer/PostAJob'))
const JobsList = lazy(()=>import('../pages/Main/employer/JobsList'))
const JobDetails = lazy(()=>import('../pages/Main/employer/JobDetails'))
const MyApplicants = lazy(()=>import('../pages/Main/employer/MyApplicants'))  
const SearchTalents = lazy(()=>import('../pages/Main/Employer/SearchTalents'))
const EditJob = lazy(()=>import('../pages/Main/employer/EditJob'))

//layouts
const MainLayOut = lazy(()=>import('../components/layouts/MainLayout'))
const AuthLayOut = lazy(()=>import('../components/Layouts/AuthLayout'))


/******************************************* Routes ******************************************/



export default function AppRoutes() {

  const routes = createBrowserRouter([

    //1-public routes
  { path: "/" ,
    element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><MainLayOut /></Suspense> , 
    
    children: [
            //public routes
            { index: true ,   element:  <Home /> },
            { path:"home" ,  element:<Home />},
            { path:"about" ,  element:<About />},
            { path:"contact", element:<Contact />},

            //Public Jobs
            { path:"jobs" , element:<Suspense className='text-9xl' fallback={<h1>Loading</h1>}><JobList /></Suspense>},
            { path:"jobs/:jobId" , element:<Suspense className='text-9xl' fallback={<h1>Loading</h1>}><JobPublicDetails /></Suspense>},
            
            //Public Talents list
            { path:"talents" , element:<Suspense className='text-9xl' fallback={<h1>Loading</h1>}><TalentList /></Suspense>},
            { path:"talents/:talentId" ,element:<Suspense className='text-9xl' fallback={<h1>Loading</h1>}><TalentPublicDetails /></Suspense>}
  ]
},


  //2-auth routes
  { path: "/auth" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><AuthLayOut /></Suspense>, 
    children: [
            //auth routes
            { index: true ,  element: <Register />  },
            { path:"register" ,  element:<Register />},
            { path:"login", element:<Login />},
            
  ]
  },
  
  //3-talent routes
  { path: "talent", element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><MainLayOut /></Suspense> ,
    children: [
      { path: "findjob" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><FindJob /></Suspense>}, //recommenditionjobs
      { path: "profile" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><TalentProfile /></Suspense>},
      { path: "profile/edit" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><EditTalentProfile /></Suspense>},
      { path: "profile/avatar" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><ProfileAvatar /></Suspense>},

      { path: "applications" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><MyApplications /></Suspense>},
      { path: "applications/:applicationId" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><ApplicationDetails /></Suspense>},
      { path: "applications/:applicationId/edit" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><EditApplication /></Suspense>},
     
      { path: "jobs/:jobId/proposal" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><JobProposal /></Suspense>},
      { path: "profile/settings" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><TalentAccountSettings /></Suspense>}

  ]},

  //4-empolyer routes
  { path: "employer", element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><MainLayOut /></Suspense> ,
    children: [
      { path : "profile" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><EmployerProfile /></Suspense>},
      { path : "profile/edit" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><EditProfile /></Suspense>},
      { path : "jobs" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><JobsList /></Suspense>},
      { path : "jobs/new" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><PostAJob /></Suspense>},
      { path : "jobs/:jobId" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><EditJob /></Suspense>},
      { path : "jobs/:jobId/applicants" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><MyApplicants /></Suspense>},
      { path : "jobs/:jobId/applicants/search" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><SearchTalents /></Suspense>},
      { path : "jobs/:jobId" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><JobDetails /></Suspense>},

      
    ]},


  //Not Found route
  { path: "*" , element: <Suspense className='text-9xl' fallback={<h1>Loading</h1>}><NotFound /></Suspense>}

]);


  return <>
              <RouterProvider router={routes}></RouterProvider>
        </>
    
    
};


