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
- [ ] Privacy page
- [ ] Reuse upload pattern for Employer logo/avatar
