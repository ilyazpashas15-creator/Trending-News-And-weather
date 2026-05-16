'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">About Us</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Welcome to Weather App</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Weather App is your comprehensive source for accurate weather forecasts, world time information, 
            and astronomical data. We provide real-time weather updates, detailed forecasts, and a suite of 
            time-related tools to help you plan your day effectively.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our mission is to provide accessible, accurate, and comprehensive weather and time information 
            to users worldwide. We believe that everyone should have access to reliable weather data to 
            make informed decisions about their daily activities.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>Real-time weather updates for locations worldwide</li>
            <li>5-day weather forecasts with detailed information</li>
            <li>World clock with multiple time zones</li>
            <li>Calendar and date calculators</li>
            <li>Sun, moon, and space information</li>
            <li>Latest news from around the world</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Have questions or feedback? We'd love to hear from you. Visit our{' '}
            <a href="/contact" className="text-blue-500 hover:text-blue-600">Contact page</a> to get in touch.
          </p>
        </section>
      </div>
    </div>
  );
}
