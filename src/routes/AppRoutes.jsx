import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "../pages/Main/Public/Loading";

// Guards
const ProtectedRoute = lazy(() => import("./GuardRoutes/ProtectedRoute"));
const RoleRoute = lazy(() => import("./GuardRoutes/RoleRoute"));
const GuestRoutes = lazy(() => import("./GuardRoutes/GuestRoutes"));

// Layouts
const MainLayout = lazy(() => import("../components/layouts/MainLayout"));
const AuthLayout = lazy(() => import("../components/layouts/AuthLayOut"));
const DashboardLayout = lazy(
	() => import("../components/Layouts/DashboardLayout"),
);

// Public Pages
const Home = lazy(() => import("../pages/Main/Public/Home"));
const About = lazy(() => import("../pages/Main/Public/About"));
const Contact = lazy(() => import("../pages/Main/Public/Contact"));

const NotFound = lazy(() => import("../pages/Main/Public/NotFound"));
const Unauthorized = lazy(() => import("../pages/Main/Public/Unauthorized"));

// Auth Pages
const Register = lazy(() => import("../pages/Auth/Register"));
const Login = lazy(() => import("../pages/Auth/Login"));
const VerifyEmail = lazy(() => import("../pages/Auth/VerifyEmail")); //modal

//modal
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword"));

// Talent pages
const TalentProfile = lazy(() => import("../pages/Main/talent/TalentProfile"));

const EditTalentProfile = lazy(
	() => import("../pages/Main/talent/EditTalentProfile"),
);

const FindJob = lazy(() => import("../pages/Main/talent/FindJob"));

const MyApplications = lazy(
	() => import("../pages/Main/talent/MyApplications"),
);

const JobProposal = lazy(() => import("../pages/Main/talent/JobProposal"));
const TalentAccountSettings = lazy(
	() => import("../pages/Main/talent/TalentAccountSettings"),
);

// Employer routes
const EmployerDashboard = lazy(
	() => import("../pages/Main/Employer/Dashboard"),
);
const EmployerProfile = lazy(
	() => import("../pages/Main/employer/EmployerProfile"),
);
const EditProfile = lazy(() => import("../pages/Main/employer/EditProfile"));

const EmployerAccountSettings = lazy(
	() => import("../pages/Main/Employer/AccountSettings"),
);
const PostAJob = lazy(() => import("../pages/Main/employer/PostAJob"));
const JobsList = lazy(() => import("../pages/Main/Public/JobList"));
const JobDetails = lazy(() => import("../pages/Main/employer/JobDetails"));
const MyApplicants = lazy(() => import("../pages/Main/employer/MyApplicants"));
const EditJob = lazy(() => import("../pages/Main/employer/EditJob"));

const SearchTalent = lazy(() => import("../pages/Main/Employer/SearchTalent"));

// Moderator pages
const AdminLogin = lazy(() => import("../pages/Main/Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("../pages/Main/Admin/AdminDashboard"));

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
			],
		},

		// 2) Auth routes (Guest only)
		{
			path: "",
			element: <GuestRoutes />,
			children: [
				{
					element: <AuthLayout />,
					children: [
						{ path: "register", element: <Register /> },
						{ path: "login", element: <Login /> },
						{ path: "verify", element: <VerifyEmail /> },
						{ path: "reset", element: <ResetPassword /> },
					],
				},

				{ path: "unauthorized", element: <Unauthorized /> },
			],
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
				// modal
				{ path: "profile/edit", element: <EditTalentProfile /> },

				{ path: "profile/settings", element: <TalentAccountSettings /> },

				{ path: "applications", element: <MyApplications /> },

				{ path: "jobs/:jobId/proposal", element: <JobProposal /> },
			],
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

				{ path: "profile/settings", element: <EmployerAccountSettings /> },
				// modal
				{ path: "profile/edit", element: <EditProfile /> },

				{ path: "jobs", element: <JobsList /> },
				{ path: "jobs/new", element: <PostAJob /> },

				{ path: "jobs/:jobId", element: <JobDetails /> },
				{ path: "jobs/:jobId/edit", element: <EditJob /> },
				{ path: "jobs/:jobId/applicants", element: <MyApplicants /> },
				{ path: "jobs/:jobId/applicants/search", element: <SearchTalent /> },
			],
		},

		// 5) Admin / Moderator
		{
			path: "admin/login",
			element: <AdminLogin />,
		},

		{
			path: "admin/dashboard",
			element: (
				<ProtectedRoute redirect="/admin/login">
					<RoleRoute
						allowed={["MODERATOR"]}
						redirect="/admin/login"
						forbidden="/unauthorized"
					>
						<DashboardLayout />
					</RoleRoute>
				</ProtectedRoute>
			),
			children: [{ index: true, element: <AdminDashboard /> }],
		},

		// 6) Not Found
		{
			path: "*",
			element: <NotFound />,
		},
	]);

	return (
		<Suspense fallback={<Loading />}>
			<RouterProvider router={router} />
		</Suspense>
	);
}
