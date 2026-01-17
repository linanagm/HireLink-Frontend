import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "../components/UI/Loading";

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
const Home = lazy(() => import("../features/Main/Public/Home"));
const About = lazy(() => import("../features/Main/Public/About"));
const Contact = lazy(() => import("../features/Main/Public/Contact"));

const NotFound = lazy(() => import("../features/Main/Public/NotFound"));
const Unauthorized = lazy(() => import("../features/Main/Public/Unauthorized"));

// Auth Pages
const Register = lazy(() => import("../features/Auth/pages/Register"));
const Login = lazy(() => import("../features/Auth/pages/Login"));
const VerifyEmail = lazy(() => import("../features/Auth/pages/VerifyEmail")); //modal

//modal
const ResetPassword = lazy(
	() => import("../features/Auth/pages/ResetPassword"),
);

// Talent pages
const TalentProfile = lazy(
	() => import("../features/Main/talent/TalentProfile"),
);

const EditTalentProfile = lazy(
	() => import("../features/Main/talent/EditTalentProfile"),
);

const FindJob = lazy(() => import("../features/Main/talent/FindJob"));
const JobDetails = lazy(() => import("../features/Main/Talent/JobDetails"));

const MyApplications = lazy(
	() => import("../features/Main/talent/MyApplications"),
);

const JobProposal = lazy(() => import("../features/Main/talent/JobProposal"));
const TalentAccountSettings = lazy(
	() => import("../features/Main/talent/TalentAccountSettings"),
);

// Employer routes
const EmployerDashboard = lazy(
	() => import("../features/Main/Employer/Dashboard"),
);
const EmployerProfile = lazy(
	() => import("../features/Main/employer/EmployerProfile"),
);
const EditProfile = lazy(() => import("../features/Main/employer/EditProfile"));

const EmployerAccountSettings = lazy(
	() => import("../features/Main/Employer/AccountSettings"),
);
const PostAJob = lazy(() => import("../features/Main/employer/PostAJob"));
const JobsList = lazy(() => import("../features/Main/Public/JobList"));

const MyApplicants = lazy(
	() => import("../features/Main/employer/MyApplicants"),
);
const EditJob = lazy(() => import("../features/Main/employer/EditJob"));

const SearchTalent = lazy(
	() => import("../features/Main/Employer/SearchTalent"),
);

// Moderator pages
const AdminLogin = lazy(() => import("../features/Main/Admin/AdminLogin"));
const AdminDashboard = lazy(
	() => import("../features/Main/Admin/AdminDashboard"),
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
				{ path: "/talent/jobs/:id", element: <JobDetails /> },

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
