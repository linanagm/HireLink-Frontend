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
