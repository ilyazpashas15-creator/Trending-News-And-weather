'use client';

import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Introduction</h2>
          <p className="mb-4">
            Weather App ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you use our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Information We Collect</h2>
          <p className="mb-4">We may collect information about you in various ways, including:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Location data to provide accurate weather information</li>
            <li>Usage data to improve our services</li>
            <li>Device information for optimization purposes</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Provide accurate weather forecasts for your location</li>
            <li>Improve and optimize our website</li>
            <li>Analyze usage patterns and trends</li>
            <li>Send you updates and notifications (with your consent)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal information 
            against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of certain data collection</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Contact Us</h2>
          <p className="mb-4">
            If you have questions about this Privacy Policy, please contact us at{' '}
            <a href="/contact" className="text-blue-500 hover:text-blue-600">our contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
