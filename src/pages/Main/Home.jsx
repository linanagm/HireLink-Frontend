import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import heroImage from '../../assets/images/home.svg'
import { NavLink } from 'react-router-dom'

export default function Home() {

  const [Count, SetCount] = useState(0)

  useEffect(() => {}, [])

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-black ${
      isActive ? "bg-gray-200 font-semibold" : "bg-white hover:bg-gray-100"
    }`

  return (
    <div className='container'>
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* EMPLOYER TABS */}
        <nav className="w-full bg-white shadow px-8 py-4 flex flex-wrap gap-4">

      <NavLink to="/employer/jobs" className={linkClass} title="Employer Dashboard">Dashboard</NavLink>
      <NavLink to="/talents" className={linkClass} title="Talent List">Talent List</NavLink>
      <NavLink to="/employer/jobs/new" className={linkClass} title="Post A Job">Post A Job</NavLink>
      <NavLink to="/employer/profile" className={linkClass} title="Employer Profile">Employer Profile</NavLink>
      <NavLink to="/employer/profile/edit" className={linkClass} title="Edit Profile">Edit Profile</NavLink>
      <NavLink to="/employer/jobs/:jobId/applicants" className={linkClass} title="My Applicants">My Applicants</NavLink>
      <NavLink to="/employer/jobs/:jobId" className={linkClass} title="Job Details">Job Details</NavLink>
      <NavLink to="/employer/profile/settings" className={linkClass} title="Account Settings">Account Settings</NavLink>
    </nav>

      {/* HERO SECTION */}
      <div className='hero-section flex max-w-screen-xl justify-between items-center mx-auto py-7'>
        
        <div className='flex-col py-11 gap-5'>
          
          <h1 className='text-7xl py-4 font-bold text-black'>
            <span className='text-fuchsia-800'>Connecting</span> You to the World’s 
            <span className='text-fuchsia-800'> Best Tech Talent.</span>
          </h1>

          <div className='flex flex-col justify-center items-center py-4'>
            <span>
              Discover, evaluate, and hire top tech professionals for projects of any size. 
              Flexible hiring models designed for your success.
            </span>
          </div>

          <NavLink 
            to="/register" 
            className="my-btn-outline text-success bg-neutral-primary border border-success hover:bg-success hover:text-white focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Join Us
          </NavLink>
        </div>

        <img src={heroImage} alt="" />
      </div>
    </div>
  )
}
