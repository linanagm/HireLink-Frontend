
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Loading from "../pages/Main/Public/Loading";

// Guards
const ProtectedRoute = lazy(() => import("./guardRoutes/ProtectedRoute"));
const RoleRoute = lazy(() => import("./guardRoutes/RoleRoute"));
const GuestRoutes = lazy(() => import("./guardRoutes/GuestRoutes"));

// Layouts
const MainLayout = lazy(() => import("../components/layouts/MainLayout"));
const AuthLayout = lazy(() => import("../components/Layouts/AuthLayout"));
const DashboardLayout = lazy(() =>
  import("../components/Layouts/DashboardLayout")
);

// Public Pages
const Home = lazy(() => import("../pages/Main/Public/Home"));
const About = lazy(() => import("../pages/Main/Public/About"));
const Contact = lazy(() => import("../pages/Main/Public/Contact"));
const TalentList = lazy(() => import("../pages/Main/Public/TalentList"));
const TalentPublicDetails = lazy(() =>
  import("../pages/Main/Public/TalentPublicDetails")
);

const NotFound = lazy(() => import("../pages/Main/Public/NotFound"));
const Unauthorized = lazy(() =>
  import("../pages/Main/Public/Unauthorized")
);

// Auth Pages
const Register = lazy(() => import("../pages/Auth/Register"));
const Login = lazy(() => import("../pages/Auth/Login"));
const VerifyEmail = lazy(() => import("../pages/Auth/VerifyEmail"));
const ForgotPassword = lazy(() =>
  import("../pages/Auth/ForgotPassword")
);
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword"));

// Talent pages
const TalentProfile = lazy(() =>
  import("../pages/Main/talent/TalentProfile")
);
const EditTalentProfile = lazy(() =>
  import("../pages/Main/talent/EditTalentProfile")
);
const ProfileAvatar = lazy(() =>
  import("../pages/Main/talent/ProfileAvatar")
);
const FindJob = lazy(() => import("../pages/Main/talent/FindJob"));
const MyApplications = lazy(() =>
  import("../pages/Main/talent/MyApplications")
);
const ApplicationDetails = lazy(() =>
  import("../pages/Main/talent/ApplicationDetails")
);
const EditApplication = lazy(() =>
  import("../pages/Main/talent/EditApplication")
);
const JobProposal = lazy(() =>
  import("../pages/Main/talent/JobProposal")
);
const TalentAccountSettings = lazy(() =>
  import("../pages/Main/talent/TalentAccountSettings")
);

// Employer routes
const EmployerDashboard = lazy(() =>
  import("../pages/Main/Employer/Dashboard")
);
const EmployerProfile = lazy(() =>
  import("../pages/Main/employer/EmployerProfile")
);
const EditProfile = lazy(() =>
  import("../pages/Main/employer/EditProfile")
);
const PostAJob = lazy(() => import("../pages/Main/employer/PostAJob"));
const JobsList = lazy(() => import("../pages/Main/Public/JobList"));
const JobDetails = lazy(() =>
  import("../pages/Main/employer/JobDetails")
);
const MyApplicants = lazy(() =>
  import("../pages/Main/employer/MyApplicants")
);
const EditJob = lazy(() => import("../pages/Main/employer/EditJob"));

// Moderator pages
const ModeratorDashboard = lazy(() =>
  import("../pages/Main/moderator/ModeratorDashboard")
);

export default function AppRoutes() {
  const router = createBrowserRouter([
    // 1) Public routes
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "talents", element: <TalentList /> },
        { path: "talents/:talentId", element: <TalentPublicDetails /> }
      ]
    },

    // 2) Auth routes (Guest only)
    {
      path: "",
      element: (
        <GuestRoutes>
          <AuthLayout />
        </GuestRoutes>
      ),
      children: [
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "verify", element: <VerifyEmail /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset", element: <ResetPassword /> },
        { path: "unauthorized", element: <Unauthorized /> }
      ]
    },

    // 3) Talent routes
    {
      path: "talent",
      element: (
        <ProtectedRoute>
          <RoleRoute allowed={["TALENT"]}>
            <MainLayout />
          </RoleRoute>
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <FindJob /> },
        { path: "findjob", element: <FindJob /> },

        { path: "profile", element: <TalentProfile /> },
        { path: "profile/edit", element: <EditTalentProfile /> },
        { path: "profile/avatar", element: <ProfileAvatar /> },
        { path: "profile/settings", element: <TalentAccountSettings /> },

        { path: "applications", element: <MyApplications /> },
        { path: "applications/:applicationId", element: <ApplicationDetails /> },
        {
          path: "applications/:applicationId/edit",
          element: <EditApplication />
        },

        { path: "jobs/:jobId/proposal", element: <JobProposal /> }
      ]
    },

    // 4) Employer routes
    {
      path: "employer",
      element: (
        <ProtectedRoute>
          <RoleRoute allowed={["EMPLOYER"]}>
            <MainLayout />
          </RoleRoute>
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <EmployerDashboard /> },
        { path: "dashboard", element: <EmployerDashboard /> },

        { path: "profile", element: <EmployerProfile /> },
        { path: "profile/edit", element: <EditProfile /> },

        { path: "jobs", element: <JobsList /> },
        { path: "jobs/new", element: <PostAJob /> },

     
        { path: "jobs/:jobId/edit", element: <EditJob /> },
        { path: "jobs/:jobId", element: <JobDetails /> },
        { path: "jobs/:jobId/applicants", element: <MyApplicants /> }
      ]
    },

    // 5) Admin / Moderator
    {
      path: "admin",
      element: (
        <ProtectedRoute>
          <RoleRoute allowed={["ADMIN"]}>
            <DashboardLayout />
          </RoleRoute>
        </ProtectedRoute>
      ),
      children: [{ index: true, element: <ModeratorDashboard /> }]
    },

    // 6) Not Found
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

