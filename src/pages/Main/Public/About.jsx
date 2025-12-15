import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import aboutUs from '../../../assets/images/about-us.svg'

export default function About() {

    let [ Count , SetCount ] = useState()

      useEffect (() => {}, [])
    
      return (
    <div>
      <Helmet>
        <title>About</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    
        <section className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We build meaningful digital experiences that connect people with real opportunities.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* Text */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our goal is to create a platform that simplifies hiring and job searching.
              We believe technology should remove barriers, not add new ones.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Us
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Clean and user-friendly design</li>
              <li>• Secure and reliable system</li>
              <li>• Built with modern technologies</li>
              <li>• Focused on real user needs</li>
            </ul>
          </div>

          {/* Image / Placeholder */}
          <div className="flex justify-center">
            <div className="w-72 h-72 bg-white rounded-2xl shadow-lg flex items-center justify-center text-gray-400">
              <img src={aboutUs} alt="our team" />
            </div>
          </div>

        </div>
      </div>
    </section>
  
      
    </div>
  )
}
