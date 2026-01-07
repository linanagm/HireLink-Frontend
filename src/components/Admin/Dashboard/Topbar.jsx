import React from "react";
import Icon from "./Icon";

export default function Topbar({ search, setSearch }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Manage Talent and Employer users, review statuses, and track analytics.
        </p>
      </div>

      <div className="flex items-center gap-2">

        <div className="relative w-full sm:w-80">
        
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            <Icon name="search" />
          </div>
        
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or ID..."
            className="w-full rounded-2xl bg-white py-2.5 pl-11 pr-3 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
          />
        
        </div>

        <button className="hidden sm:inline-flex items-center rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
          Search
        </button>
        
        <button className="hidden sm:inline-flex items-center rounded-2xl bg-fuchsia-800  px-2 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-fuchsia-700">
          Log out
        </button>
        
      </div>

      
    </div>
  );
}
