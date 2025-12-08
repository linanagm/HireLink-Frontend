import React, { useState } from "react";
import { Link } from "react-router-dom";

const applicationsData = [
  {
    title: "UI/UX Designer for Mobile App",
    company: "BoldTech Inc.",
    date: "March 15, 2025",
    status: "Under Review",
    statusColor: "text-blue-600",
  },
  {
    title: "Frontend Developer for E-commerce Site",
    company: "ShopSphere Ltd.",
    date: "April 10, 2025",
    status: "Interview Scheduled",
    statusColor: "text-purple-600",
  },
  {
    title: "Product Designer for SaaS Platform",
    company: "CloudNest Solutions",
    date: "March 25, 2025",
    status: "Pending",
    statusColor: "text-yellow-600",
  },
  {
    title: "Graphic Designer for Marketing Campaign",
    company: "Creative Minds Co.",
    date: "April 5, 2025",
    status: "Accepted",
    statusColor: "text-green-600",
  },
  {
    title: "Frontend Developer for Fintech App",
    company: "FinanceHub Inc.",
    date: "April 15, 2025",
    status: "Accepted",
    statusColor: "text-green-600",
  },
  {
    title: "Data Analyst for Retail Analytics",
    company: "Insightful Data Corp.",
    date: "March 30, 2025",
    status: "Rejected",
    statusColor: "text-red-600",
  },
];

export default function App() {
  const [statusFilter, setStatusFilter] = useState("");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const statusOptions = [
    "Under Review",
    "Interview Scheduled",
    "Pending",
    "Accepted",
    "Rejected",
  ];

  const filteredApplications = statusFilter
    ? applicationsData.filter(job => job.status === statusFilter)
    : applicationsData;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-purple-600">H</h1>

        <div className="flex gap-6 items-center">
          <Link to="/talent/findjob" className="text-gray-500 hover:text-black">
            Find Jobs
          </Link>
          <a className="text-purple-600 font-semibold" href="#">
            My Applications
          </a>
        </div>

        <input 
          type="text"
          className="border px-4 py-2 rounded-full w-80"
          placeholder="Search"
        />

        <div className="flex gap-3 items-center">
          {/* أيقونة الإشعارات */}
          <button className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" 
                 className="h-6 w-6 text-gray-600" 
                 fill="none" viewBox="0 0 24 24" 
                 stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" 
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6 6 0 00-5-5.917V4a1 1 0 10-2 0v1.083A6 6 0 006 11v3c0 .386-.149.735-.405 1.005L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>

          {/* صورة البروفايل */}
          <img
            src="https://via.placeholder.com/40"
            className="w-10 h-10 rounded-full object-cover border"
            alt="profile"
          />

        </div>
      </nav>

      {/* Filters */}
      <div className="px-10 mt-6 flex gap-4 relative">
        <div className="relative">
          <button
            className="bg-white border px-4 py-2 rounded-md whitespace-nowrap"
            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
          >
            {statusFilter || "Status"}
          </button>

          {statusDropdownOpen && (
            <div className="absolute mt-1 bg-white border rounded-md shadow-lg z-10">
              {statusOptions.map((status, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                  onClick={() => {
                    setStatusFilter(status);
                    setStatusDropdownOpen(false);
                  }}
                >
                  {status}
                </div>
              ))}
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 whitespace-nowrap"
                onClick={() => {
                  setStatusFilter("");
                  setStatusDropdownOpen(false);
                }}
              >
                Clear
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Applications List */}
      <div className="px-10 mt-6 space-y-5">
        {filteredApplications.map((job, idx) => (
          <div key={idx} className="bg-purple-100 rounded-xl p-6 flex justify-between items-start">
            <div>
              <h2 className="font-semibold text-lg">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500">{job.date}</p>

              <span className={`mt-2 inline-block font-semibold ${job.statusColor}`}>
                ● {job.status}
              </span>
            </div>

            <Link
              to={`/jobs/${idx}`}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
