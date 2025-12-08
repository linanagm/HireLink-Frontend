import React, { useState } from 'react';

const AccountSettingsForm = () => {
  // State for general settings
  const [generalSettings, setGeneralSettings] = useState({
    companyName: '',
    adminContactEmail: '',
    phoneNumber: '',
    timeZone: '',
    defaultCurrency: '',
    languagePreference: '',
    industryTag: ''
  });

  // Separate state for password settings
  const [passwordSettings, setPasswordSettings] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGeneralSettingsSubmit = (e) => {
    e.preventDefault();
    console.log('General settings submitted:', generalSettings);
    
    // You can add API call here
    // Example: saveGeneralSettings(generalSettings);
    
    alert('General settings saved successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Validate password fields
    if (!passwordSettings.oldPassword) {
      alert('Please enter your current password');
      return;
    }
    
    if (!passwordSettings.newPassword) {
      alert('Please enter a new password');
      return;
    }
    
    if (passwordSettings.newPassword !== passwordSettings.confirmPassword) {
      alert('New password does not match confirmation');
      return;
    }
    
    if (passwordSettings.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    console.log('Password update submitted:', passwordSettings);
    
    // You can add API call here
    // Example: updatePassword(passwordSettings);
    
    // Clear password fields after successful submission
    setPasswordSettings({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    alert('Password updated successfully!');
  };

  const handleDeleteAccount = () => {
    const confirmDelete = document.getElementById('confirmDelete')?.checked;
    
    if (!confirmDelete) {
      alert('Please check the confirmation box first');
      return;
    }
    
    if (window.confirm('Are you absolutely sure? This action cannot be undone!')) {
      console.log('Deleting account...');
      // Add your delete account API call here
      alert('Account deletion request submitted.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>
        
        {/* General Settings Form */}
        <form onSubmit={handleGeneralSettingsSubmit} className="space-y-6">
          {/* Company Information Section */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Company Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={generalSettings.companyName}
                  onChange={handleGeneralSettingsChange}
                  placeholder="Enter company name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="adminContactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Contact Email *
                </label>
                <input
                  type="email"
                  id="adminContactEmail"
                  name="adminContactEmail"
                  value={generalSettings.adminContactEmail}
                  onChange={handleGeneralSettingsChange}
                  placeholder="Enter admin contact email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={generalSettings.phoneNumber}
                  onChange={handleGeneralSettingsChange}
                  placeholder="Enter phone number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700 mb-1">
                  Time Zone
                </label>
                <select
                  id="timeZone"
                  name="timeZone"
                  value={generalSettings.timeZone}
                  onChange={handleGeneralSettingsChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Time Zone</option>
                  <option value="GMT">GMT (Greenwich Mean Time)</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="CET">CET (Central European Time)</option>
                  <option value="EET">EET (Eastern European Time)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Preferences</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="defaultCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                  Default Currency
                </label>
                <select
                  id="defaultCurrency"
                  name="defaultCurrency"
                  value={generalSettings.defaultCurrency}
                  onChange={handleGeneralSettingsChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Currency</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EGP">Egyptian Pound (E£)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="languagePreference" className="block text-sm font-medium text-gray-700 mb-1">
                  Language Preference
                </label>
                <select
                  id="languagePreference"
                  name="languagePreference"
                  value={generalSettings.languagePreference}
                  onChange={handleGeneralSettingsChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Language</option>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="industryTag" className="block text-sm font-medium text-gray-700 mb-1">
                Industry Tag
              </label>
              <input
                type="text"
                id="industryTag"
                name="industryTag"
                value={generalSettings.industryTag}
                onChange={handleGeneralSettingsChange}
                placeholder="e.g., Technology, Finance, Healthcare"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Save Button for General Settings */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Save General Settings
            </button>
          </div>
        </form>

        {/* Privacy & Security Section */}
        <div className="border-t pt-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Privacy & Security</h2>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password *
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={passwordSettings.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your current password"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password *
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordSettings.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordSettings.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Delete Account Section */}
        <div className="border-t pt-6 mt-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-xl font-bold text-red-700 mb-2">Delete Company Account</h2>
            <p className="text-gray-600 mb-3">
              Once you delete your account, all your company data will be permanently deleted.
            </p>
            
            <div className="flex items-start mb-4">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="confirmDelete"
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
              </div>
              <label htmlFor="confirmDelete" className="ml-2 text-sm text-gray-700">
                I understand this action is irreversible
              </label>
            </div>
            
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsForm;