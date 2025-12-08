import React from 'react';

const EmployerProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        
        {/* Company Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            TechNest Innovations Inc.
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            Information Technology & Services
          </p>
          <p className="text-gray-500">📍 New York, USA</p>
        </div>

        {/* About Us Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            About Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            TechNest Innovations is a cutting-edge technology company delivering high-quality web and mobile solutions to clients worldwide. Our team of expert developers, designers, and strategists collaborate closely with businesses to build scalable, user-focused products. We value creativity, agility, and transparency.
          </p>
        </div>

        {/* Company Overview */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Company Overview
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="font-medium text-gray-700 w-40">Website:</span>
              <a 
                href="https://www.companysite.com" 
                className="text-blue-600 hover:text-blue-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.companysite.com
              </a>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-700 w-40">Company Size:</span>
              <span className="text-gray-700">51-200 employees</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-700 w-40">Founded:</span>
              <span className="text-gray-700">2017</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-700 w-40">Social Links:</span>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-700 hover:text-blue-900 hover:underline">LinkedIn</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline">X</a>
                <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">Facebook</a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} TechNest Innovations Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;