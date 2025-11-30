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

//loading component
const Loading = lazy (()=>import('../components/UI/Loading'))

//Auth Pages
const Register = lazy(()=>import('../pages/Auth/Register'));
const Login = lazy(()=>import('../pages/Auth/Login'))


//verify email
const VerifyEmail = lazy(()=>import('../pages/Auth/VerifyEmail'))

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
    element: <Suspense className='text-9xl' fallback={<Loading />}><MainLayOut /></Suspense> , 
    
    children: [
            //public routes
            { index: true ,   element:  <Suspense fallback={<Loading />}><Home /></Suspense>},
            
            { path:"about" ,  element:<Suspense fallback={<Loading />}> <About /></Suspense>},
            { path:"contact", element:<Suspense fallback={<Loading />}> <Contact /></Suspense>},

            //Public Jobs
            { path:"jobs" , element:<Suspense  fallback={<Loading />}><JobList /></Suspense>},
            { path:"jobs/:jobId" , element:<Suspense  fallback={<Loading />}><JobPublicDetails /></Suspense>},
            
            //Public Talents list
            { path:"talents" , element:<Suspense fallback={<Loading />}><TalentList /></Suspense>},
            { path:"talents/:talentId" ,element:<Suspense className='text-9xl' fallback={<Loading />}><TalentPublicDetails /></Suspense>}
  ]
},


  //2-auth routes
  { path: "/" , element: <Suspense  fallback={<Loading />}><AuthLayOut /></Suspense>, 
    children: [
            //auth routes
            
            { path:"register", element:<Suspense  fallback={<Loading />}><Register /> </Suspense>}, 
            { path:"login", element:<Suspense  fallback={<Loading />}><Login /></Suspense>},
            
  ]
  },
  { path: 'register/verify-email' ,  element: <Suspense fallback={<Loading />}><VerifyEmail /></Suspense>},
  
  //3-talent routes
  { path: "talent", element: <Suspense className='text-9xl' fallback={<Loading />}><MainLayOut /></Suspense> ,
    children: [
      { path: "findjob" , element: <Suspense className='text-9xl' fallback={<Loading />}><FindJob /></Suspense>}, //recommenditionjobs
      { path: "profile" , element: <Suspense className='text-9xl' fallback={<Loading />}><TalentProfile /></Suspense>},
      { path: "profile/edit" , element: <Suspense className='text-9xl' fallback={<Loading />}><EditTalentProfile /></Suspense>},
      { path: "profile/avatar" , element: <Suspense className='text-9xl' fallback={<Loading />}><ProfileAvatar /></Suspense>},

      { path: "applications" , element: <Suspense className='text-9xl' fallback={<Loading />}><MyApplications /></Suspense>},
      { path: "applications/:applicationId" , element: <Suspense className='text-9xl' fallback={<Loading />}><ApplicationDetails /></Suspense>},
      { path: "applications/:applicationId/edit" , element: <Suspense className='text-9xl' fallback={<Loading />}><EditApplication /></Suspense>},
     
      { path: "jobs/:jobId/proposal" , element: <Suspense className='text-9xl' fallback={<Loading />}><JobProposal /></Suspense>},
      { path: "profile/settings" , element: <Suspense className='text-9xl' fallback={<Loading />}><TalentAccountSettings /></Suspense>}

  ]},

  //4-empolyer routes
  { path: "employer", element: <Suspense className='text-9xl' fallback={<Loading />}><MainLayOut /></Suspense> ,
    children: [
      { path : "profile" , element: <Suspense className='text-9xl' fallback={<Loading />}><EmployerProfile /></Suspense>},
      { path : "profile/edit" , element: <Suspense className='text-9xl' fallback={<Loading />}><EditProfile /></Suspense>},
      { path : "jobs" , element: <Suspense className='text-9xl' fallback={<Loading />}><JobsList /></Suspense>},
      { path : "jobs/new" , element: <Suspense className='text-9xl' fallback={<Loading />}><PostAJob /></Suspense>},
      { path : "jobs/:jobId" , element: <Suspense className='text-9xl' fallback={<Loading />}><EditJob /></Suspense>},
      { path : "jobs/:jobId/applicants" , element: <Suspense className='text-9xl' fallback={<Loading />}><MyApplicants /></Suspense>},
      { path : "jobs/:jobId/applicants/search" , element: <Suspense className='text-9xl' fallback={<Loading />}><SearchTalents /></Suspense>},
      { path : "jobs/:jobId" , element: <Suspense className='text-9xl' fallback={<Loading />}><JobDetails /></Suspense>},

      
    ]},


  //Not Found route
  { path: "*" , element: <Suspense className='text-9xl' fallback={<Loading />}><NotFound /></Suspense>}

]);


  return <>
              <RouterProvider router={routes}></RouterProvider>
        </>
    
    
};


