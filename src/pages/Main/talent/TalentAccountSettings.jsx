// AccountSettings.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
function PencilIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" />
    </svg>
  );
}

export default function AccountSettings() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    timezone: "",
    currency: "",
    language: "",
    industry: "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [twoFA, setTwoFA] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handlePassChange(e) {
    const { name, value } = e.target;
    setPasswords((s) => ({ ...s, [name]: value }));
  }

  function saveAccount(e) {
    e.preventDefault();
    // هنا تبعتي البيانات للـ backend
    console.log("save account", form);
    alert("Account settings saved (mock)");
  }

  function updatePassword(e) {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("New password and confirm don't match");
      return;
    }
    // كود ابديت باسورد
    console.log("update password", passwords);
    alert("Password updated (mock)");
  }

  function deleteAccount() {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    // نادِ على API لحذف الحساب
    alert("Account deleted (mock)");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-2xl font-extrabold text-purple-600">H</div>
            <nav className="flex items-center gap-6 text-sm text-gray-600">
             <div className="flex gap-6 items-center">
                       <Link to="/talent/findjob" className="text-purple-500 hover:text-black">
                         Find Jobs
                       </Link>
                       <Link to="/talent/applications" className="text-purple-500 hover:text-black">
                          My Applications
                       </Link>
                     </div>
             
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                className="w-80 pl-4 pr-10 py-2 rounded-full border border-gray-200 text-sm bg-white"
                placeholder="Search"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </button>
            </div>

            <button className="p-2 rounded-md hover:bg-gray-100">⚙️</button>
            <button className="p-2 rounded-md hover:bg-gray-100">🔔</button>

            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-yellow-300 flex items-center justify-center text-white font-bold">
              M
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-md border border-gray-200 p-8 shadow-sm">
          <h2 className="font-semibold text-lg text-gray-800 mb-6">Account Settings</h2>

          <form onSubmit={saveAccount} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left col */}
            <div className="space-y-4">
              <label className="block">
                <div className="text-xs text-gray-600 mb-1">Full Name</div>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                />
              </label>

              <label className="block">
                <div className="text-xs text-gray-600 mb-1">Phone Number</div>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                />
              </label>

              <label className="block">
                <div className="text-xs text-gray-600 mb-1">Default Currency</div>
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Default Currency</option>
                  <option value="USD">USD</option>
                  <option value="EGP">EGP</option>
                </select>
              </label>

              <label className="block">
                <div className="text-xs text-gray-600 mb-1">Industry Tag</div>
                <input
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  placeholder='e.g., "UI/UX Designer"'
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                />
              </label>

              <div>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Right col */}
            <div className="space-y-4">
              <label className="block">
                <div className="text-xs text-gray-600 mb-1">Email</div>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                />
              </label>

              <label className="block">
                <div className="text-xs text-gray-600 mb-1">Time Zone</div>
                <input
                  name="timezone"
                  value={form.timezone}
                  onChange={handleChange}
                  placeholder="Time Zone"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                />
              </label>

              <label className="block">
                <div className="text-xs text-gray-600 mb-1">Language Preference</div>
                <select
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Language Preference</option>
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </label>

              <div className="mt-4 bg-gray-50 border border-gray-100 p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Two-Factor Authentication (2FA)</div>
                    <div className="text-xs text-gray-500">Add an extra layer of security to your account</div>
                  </div>

                  <label className="flex items-center cursor-pointer">
                    <div className={`w-11 h-6 flex items-center rounded-full p-1 ${twoFA ? "bg-purple-600" : "bg-gray-300"}`}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow transform ${twoFA ? "translate-x-5" : ""}`} />
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={twoFA}
                      onChange={() => setTwoFA((v) => !v)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </form>

          {/* Privacy & Security */}
          <div className="mt-8">
            <h3 className="font-medium text-gray-800 mb-4">Privacy &amp; Security</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form onSubmit={updatePassword} className="space-y-3">
                <label className="block">
                  <div className="text-xs text-gray-600 mb-1">Old Password</div>
                  <input
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handlePassChange}
                    type="password"
                    placeholder="Old Password"
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                  />
                </label>

                <label className="block">
                  <div className="text-xs text-gray-600 mb-1">New Password</div>
                  <input
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePassChange}
                    type="password"
                    placeholder="New Password"
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                  />
                </label>

                <label className="block">
                  <div className="text-xs text-gray-600 mb-1">Confirm New Password</div>
                  <input
                    name="confirmNewPassword"
                    value={passwords.confirmNewPassword}
                    onChange={handlePassChange}
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                  />
                </label>

                <div>
                  <button className="bg-white border border-purple-600 text-purple-600 px-4 py-2 rounded-md text-sm">
                    Update Password
                  </button>
                </div>
              </form>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Delete Company Account</div>
                  <p className="text-xs text-gray-500 mb-4">This action cannot be undone. All your data will be permanently deleted.</p>
                </div>

                <div>
                  <button
                    onClick={deleteAccount}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}
