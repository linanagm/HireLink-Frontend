import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
import Loading from '../pages/Main/Loading'


const ProtectedRoute = lazy(()=>import('../routes/ProtectedRoute'));
const RoleRoute = lazy(()=>import('../routes/RoleRoute'));

//Public Pages
const Home = lazy (()=>import ('../pages/Main/Home'));
const About = lazy (()=> import('../pages/Main/About'));
const Contact = lazy(()=> import('../pages/Main/Contact'));
const JobList = lazy (()=> import('../pages/Main/JobList'));
const JobPublicDetails = lazy (()=> import('../pages/Main/JobPublicDetails'));
const TalentList = lazy(()=> import ('../pages/Main/TalentList'));
const TalentPublicDetails = lazy(()=>import('../pages/Main/TalentPublicDetails'));


const NotFound = lazy(()=>import('../pages/Main/NotFound'));
const Unauthorized = lazy(()=>import('../pages/Main/Unauthorized')); 


//Auth Pages
const Register = lazy(()=>import('../pages/Auth/Register'));
const Login = lazy(()=>import('../pages/Auth/Login'))

//register-success
const SignupSuccess = lazy(()=>import('../pages/Auth/SignupSuccess')) 

//verify email
const VerifyEmail = lazy(()=>import('../pages/Auth/VerifyEmail'))

//forgot password
const ForgotPassword = lazy(()=>import('../pages/Auth/ForgotPassword'))


//Moderator pages
const ModeratorDashboard = lazy(()=>import('../pages/Main/moderator/ModeratorDashboard'))

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
const EmployerDashboard = lazy(()=>import('../pages/Main/Employer/Dashboard'))
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
const DashboardLayout = lazy(()=>import('../components/Layouts/DashboardLayout'))


/******************************************* Routes ******************************************/



export default function AppRoutes() {

  const routes = createBrowserRouter([

    //1-public routes
  { path: "/" ,
    element: (<Suspense  fallback={<Loading />}><MainLayOut /></Suspense>) , 
    
    children: [
            //public routes
            { index: true ,   element:(<Suspense fallback={<Loading />}>  <Home /></Suspense>) },
            
            { path:"about" ,  element:(<Suspense fallback={<Loading />} > <About /></Suspense>)},
            { path:"contact", element:(<Suspense fallback={<Loading />}><Contact /></Suspense>)},

            //Public Jobs
            { path:"jobs" , element:(<Suspense fallback={<Loading />}> <JobList /></Suspense>)},
            { path:"jobs/:jobId" , element:(<Suspense  fallback={<Loading />}><JobPublicDetails /></Suspense>)},
            
            //Public Talents list
            { path:"talents" , element:(<Suspense  fallback={<Loading />}><TalentList /></Suspense>)},
            { path:"talents/:talentId" ,element:(<Suspense  fallback={<Loading />}><TalentPublicDetails /></Suspense>)}
  ]
},


  //2-auth routes
  { path: "/" , element: (<Suspense  fallback={<Loading />}><AuthLayOut /></Suspense>), 
    children: [
            //auth routes
            { index: true ,  element: (<Suspense fallback={<Loading />}><Register /></Suspense>) },
            { path:"register", element: (<Suspense fallback={<Loading />}><Register /></Suspense>) }, 
            { path:"login", element: (<Suspense fallback={<Loading />}><Login /></Suspense>) },
            
  ]
  },

  { path: 'register/signup-success' ,  element: (<Suspense fallback={<Loading />}><SignupSuccess /></Suspense>)  },
  { path: '/verify' ,  element: (<Suspense fallback={<Loading />}><VerifyEmail /></Suspense>) },
  { path: '/forgot-password' ,  element: (<Suspense fallback={<Loading />}><ForgotPassword /></Suspense>) },
  { path: '/unauthorized' ,  element: (<Suspense fallback={<Loading />}><Unauthorized /></Suspense>) },



  //3-talent routes
  { path: "talent", element: (<ProtectedRoute><Suspense  fallback={<Loading />}><MainLayOut /></Suspense></ProtectedRoute> ),
    children: [
      //{ path: "talent" , element: (<Suspense  fallback={<Loading />}><FindJob /></Suspense>)}, //recommenditionjobs

      { path: "findjob" , element: (<Suspense  fallback={<Loading />}><FindJob /></Suspense>)}, //recommenditionjobs
      { path: "profile" , element: (<Suspense fallback={<Loading />}><TalentProfile /></Suspense>)},
      { path: "profile/edit" , element: (<Suspense  fallback={<Loading />}><EditTalentProfile /></Suspense>)},
      { path: "profile/avatar" , element: (<Suspense  fallback={<Loading />}><ProfileAvatar /></Suspense>)},

      { path: "applications" , element: (<Suspense  fallback={<Loading />}><MyApplications /></Suspense>)},
      { path: "applications/:applicationId" , element: (<Suspense fallback={<Loading />}><ApplicationDetails /></Suspense>)},
      { path: "applications/:applicationId/edit" , element: (<Suspense fallback={<Loading />}><EditApplication /></Suspense>)},
     
      { path: "jobs/:jobId/proposal" , element: (<Suspense  fallback={<Loading />}><JobProposal /></Suspense>)},
      { path: "profile/settings" , element: (<Suspense  fallback={<Loading />}><TalentAccountSettings /></Suspense>)}

  ]},

  //4-empolyer routes
  { path: "employer", element: (<ProtectedRoute><RoleRoute allowed={["EMPLOYER"]}> <Suspense  fallback={<Loading />}><MainLayOut /></Suspense></RoleRoute></ProtectedRoute>) ,
    
  children: [
      { path : "dashboard" , element: (<Suspense  fallback={<Loading />}><EmployerDashboard /></Suspense>)},
      { path : "profile" , element: (<Suspense  fallback={<Loading />}><EmployerProfile /></Suspense>)},
      { path : "profile/edit" , element: (<Suspense c fallback={<Loading />}><EditProfile /></Suspense>)},
      { path : "jobs" , element: (<Suspense  fallback={<Loading />}><JobsList /></Suspense>)},
      { path : "jobs/new" , element: (<Suspense  fallback={<Loading />}><PostAJob /></Suspense>)},
      { path : "jobs/:jobId" , element: (<Suspense  fallback={<Loading />}><EditJob /></Suspense>)},
      { path : "jobs/:jobId/applicants" , element: (<Suspense  fallback={<Loading />}><MyApplicants /></Suspense>)},
      { path : "jobs/:jobId/applicants/search" , element: (<Suspense  fallback={<Loading />}><SearchTalents /></Suspense>)},
      { path : "jobs/:jobId" , element: (<Suspense  fallback={<Loading />}><JobDetails /></Suspense>)},

      
    ]},

    //4-admin
  { path: "employer", element: (<ProtectedRoute><RoleRoute allowed={['ADMIN']}> <Suspense  fallback={<Loading />}><DashboardLayout /></Suspense></RoleRoute></ProtectedRoute>),
    children: [
      { path : "dashboard" , element: (<Suspense  fallback={<Loading />}><ModeratorDashboard /></Suspense>)},
      
  ]},

    

  //Not Found route
  { path: "*" , element: (<Suspense  fallback={<Loading />}><NotFound /></Suspense>)}

]);


  return <>
              <RouterProvider router={routes}></RouterProvider>
        </>
    
    
};


