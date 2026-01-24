## 🔐 Authentication Flow

The application uses a centralized authentication flow based on React Context,
Axios interceptors, and React Query.

### Overview
- Authentication state is managed globally using `AuthContext`
- Access tokens are attached automatically to API requests via Axios interceptors
- User data is fetched once and reused across the app
- Guards prevent unauthorized access to protected routes

### Auth Lifecycle

1. **Login**
   - User submits email & password
   - Backend returns an access token
   - Token is stored (localStorage or sessionStorage based on remember me)
   - `/auth/me` is called to fetch the current user
   - User is normalized and saved in AuthContext

2. **Auth Initialization**
   - On app load, AuthContext reads token & user from storage
   - App waits for auth initialization before rendering protected routes

3. **Route Protection**
   - `ProtectedRoute`: blocks access if user is not authenticated
   - `RoleRoute`: restricts routes based on user role
   - `GuestRoute`: prevents logged-in users from accessing login/register pages

4. **Token Refresh**
   - Axios response interceptor listens for 401 errors
   - Automatically calls `/auth/refresh`
   - Retries failed requests with the new token
   - Logs out the user if refresh fails

5. **Logout**
   - Calls backend logout endpoint
   - Clears token and user data from storage
   - Resets AuthContext state

### Avatar Handling
- Avatar URL is stored directly in `currentUser.avatarUrl`
- Navbar reads from `currentUser.avatarUrl` only
- After avatar upload:
  - Related queries are invalidated
  - AuthContext is updated immediately
  - Navbar updates without page refresh

### Key Design Decisions
- Single source of truth for user state (`AuthContext`)
- Normalized API responses for predictable frontend behavior
- No direct storage access inside route guards
- UI components remain role-agnostic where possible

### Recent Auth Improvements
- Fixed navbar avatar rendering and fallback behavior
- Updated avatar upload flow to refresh UI instantly without reload
- Improved auth state consistency after login




## Features

### Talent
- Browse jobs (Find Job tab)
- Apply to jobs
- Application status refresh (UI stays in sync after applying)

### Talent Profile
- Upload/Update avatar  (Cloudinary)
- Update headline
- Navbar reflects profile updates (avatar/headline) immediately
- Data fetching/caching via React Query + toast notifications

## Tech Stack & Architecture
- React + Vite
- React Router
- TanStack React Query for server state (queries/mutations, cache invalidation)
- Toast notifications (Toaster)
- Feature-based folder structure (src/features/...)

## Folder Structure (high level)
src/
  features/
    Auth/
    Talent/
      FindJob/
      Applications/
      Profile/
    shared/
  services/
  hooks/
  lib/
  utils/

## Roadmap
- [ ] Complete Talent Profile sections (bio, skills, links, resume, etc.)
- [ ] Settings page (change password, email, delete account...)
- [ ] Reuse upload pattern for Employer logo/avatar

### Employer

## Employer Dashboard

The Employer Dashboard provides employers with a high-level overview of their activity on the platform, including job postings and applications.

This dashboard is implemented **without a dedicated backend dashboard endpoint**.  
Instead, it aggregates data from existing employer APIs on the frontend.

---

### Backend APIs Used

The dashboard relies on the following endpoints:

- **List Employer Jobs**
Returns all jobs created by the authenticated employer.

- **List Applications for a Job**
Returns all applications submitted for a specific job.

---

### How the Dashboard Data Is Built

Since there is no single API that returns dashboard statistics, the frontend aggregates the data as follows:

#### 1. Job Statistics
Derived from `GET /employer/jobs`:

- **Total Job Posts**
- Total number of jobs returned.
- **Active Jobs**
- Jobs where `publishedAt` is not null.

#### 2. Applications Received
- For each job, the frontend fetches:

- The total number of applications is calculated by summing applications across all jobs.

#### 3. Job Summary Table
- Displays the most recent jobs (default: last 5).
- For each job:
- Job title
- Posted date
- Status (`Open` if published, otherwise `Draft`)
- Number of applicants (calculated from job applications)

#### 4. Recent Applicants
- Applications from all jobs are combined into a single list.
- The list is sorted by `createdAt` in descending order.
- The most recent applications (default: last 5) are displayed.

---

### Frontend Implementation

- The dashboard uses a custom React Query hook:
- `useEmployerDashboardAggregated`
- This hook:
- Fetches employer jobs
- Fetches applications for each job
- Aggregates statistics and recent applicants
- React Query caching is used to keep the dashboard responsive and reduce unnecessary refetching.

---

### Notes & Limitations

- The dashboard currently performs **multiple API requests (N+1 pattern)**:
- One request to fetch jobs
- One request per job to fetch applications
- For employers with a large number of jobs, a dedicated backend dashboard endpoint is recommended for better performance.
- Job views are not included, as there is no backend support for tracking views yet.

---

### Future Improvements

- Add a backend endpoint to return aggregated dashboard data in a single request.
- Add job views tracking and analytics.
