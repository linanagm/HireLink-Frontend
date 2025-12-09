import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/HL.svg';
import profileImage from '../../assets/images/profile/profile-picture.svg';
import { useAuth } from '../../hooks/useAuth';

export default function NavbarComponent() {
  const { token, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);

  // Toggle functions
  const toggleProfile = () => {
    setOpenProfile(!openProfile);
    setOpenNotify(false);
  };

  const toggleNotify = () => {
    setOpenNotify(!openNotify);
    setOpenProfile(false);
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Role-based tabs
  const roleTabs = {
    TALENT: [
      { to: '/talent/findjob', label: 'Find Job' },
      { to: '/talent/applications', label: 'My Applications' },
    ],
    EMPLOYER: [
      { to: '/employer/dashboard', label: 'Dashboard' },
      { to: '/employer/jobs/new', label: 'Post a Job' },
      { to: '/employer/jobs/:jobId/applicants/search', label: 'Search Talents' },
      
    ],
  };

  // Render tabs based on authentication and role
  const renderTabs = () => {
    if (!token) {
      return [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
      ];
    }
    
    
    return roleTabs[currentUser?.role] || [];
  };

  const tabs = renderTabs();
  console.log('navbar tabs: \n', tabs);
  

  // Profile path based on role (assuming standard paths; adjust if needed)
  const profilePath = currentUser?.role === 'TALENT' ? '/talent/profile' : '/employer/profile';
  const settingsPath = `${profilePath}/settings`;

  return (
    <nav className="fixed top-0 left-0 right-0 flex flex-wrap w-full h-20 max-w-screen-2xl bg-neutral-100 hover:bg-neutral-50 z-200 border-b border-default mx-auto p-4 pb-7 justify-between items-center">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-7 w-1/2">
        <NavLink to="/" className="flex items-center space-x-2" aria-label="HireLink Home">
          <img src={logo} className="h-7" alt="HireLink Logo" />
        </NavLink>

        {/* NAV TABS (Desktop) */}
        <div className="hidden md:flex">
          <ul className="flex font-medium space-x-8 p-0">
            {tabs.map((tab) => (
              <li key={tab.to}>
                <NavLink
                  to={tab.to}
                  end
                  className={({ isActive }) =>
                    `block py-2 text-neutral-800 hover:text-fuchsia-800 ${
                      isActive ? 'text-fg-brand' : ''
                    }`
                  }
                >
                  {tab.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-10 w-1/2 justify-end">
        {/* SEARCH BAR */}
        <form className="hidden md:flex w-1/2" role="search">
          <div className="relative w-full">
            <button
              type="button"
              className="absolute inset-y-0 left-0 flex items-center pl-3"
              aria-label="Search"
            >
              <i className="fa-solid fa-magnifying-glass text-fuchsia-800"></i>
            </button>
            <input
              type="search"
              placeholder="Search"
              className="w-full rounded-xl px-10 py-2.5 border border-default outline-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Search input"
            />
          </div>
        </form>

        {/* AUTH BUTTONS OR PROFILE */}
        {!token ? (
          <ul className="flex gap-7">
            <li>
              <NavLink className="my-btn-outline px-4 py-2.5" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="my-btn-solid px-4 py-2.5" to="/register">
                Sign up
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="flex gap-7 items-center">
            {/* NOTIFICATIONS */}
            <li className="relative">
              <button
                onClick={toggleNotify}
                className="text-2xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
                aria-label="Notifications"
              >
                <i className="fa-regular fa-bell"></i>
              </button>

              {openNotify && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-xl border z-50">
                  <ul className="p-2">
                    <li>
                      <Link className="p-2 block hover:bg-slate-100" to="#">
                        Notification
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* PROFILE */}
            <li className="relative">
              <button
                onClick={toggleProfile}
                className="rounded-full focus:outline-none focus:ring-4 focus:ring-gray-300"
                aria-label="User profile"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={currentUser?.image || profileImage}
                  alt="User avatar"
                />
              </button>

              {openProfile && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-xl border z-50">
                  {/* HEADER */}
                  <div className="p-3 flex items-center gap-2 bg-gray-100 rounded-t-xl">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={currentUser?.image || profileImage}
                      alt="Profile avatar"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {currentUser?.name || 'User Name'}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {currentUser?.email}
                      </div>
                    </div>
                  </div>

                  {/* LINKS */}
                  <ul className="p-2 text-sm font-medium">
                    <li>
                      <Link
                        to={profilePath}
                        className="flex items-center p-2 text-gray-600 hover:bg-slate-100 hover:text-gray-900"
                      >
                        <i className="fa-regular fa-user mr-2"></i>
                        Account
                      </Link>
                    </li>

                    <li>
                      <Link
                        to={settingsPath}
                        className="flex items-center p-2 text-gray-600 hover:bg-slate-100 hover:text-gray-900"
                      >
                        <i className="fa-solid fa-gear mr-2"></i>
                        Settings & Privacy
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-2 text-red-600 hover:bg-gray-100 focus:outline-none"
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
  