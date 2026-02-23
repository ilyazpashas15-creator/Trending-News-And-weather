'use client';

import React from 'react';
import Link from 'next/link';

export default function SunMoonSpacePage() {
  const sections = [
    {
      title: 'Sunrise & Sunset',
      description: 'View sunrise and sunset times for different locations around the world.',
      icon: '🌅',
      href: '/sun-moon-space/sunrise-sunset',
      color: 'from-orange-400 to-pink-500'
    },
    {
      title: 'Moon Phases',
      description: 'Track the current moon phase and upcoming lunar events.',
      icon: '🌙',
      href: '/sun-moon-space/moon-phases',
      color: 'from-blue-400 to-purple-500'
    },
    {
      title: 'Solar Eclipse',
      description: 'Information about upcoming solar eclipses and viewing locations.',
      icon: '🌑',
      href: '/sun-moon-space/solar-eclipse',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Lunar Eclipse',
      description: 'Track upcoming lunar eclipses and their visibility.',
      icon: '🌕',
      href: '/sun-moon-space/lunar-eclipse',
      color: 'from-gray-400 to-blue-500'
    },
    {
      title: 'Planet Positions',
      description: 'View current positions of planets in our solar system.',
      icon: '🪐',
      href: '/sun-moon-space/planets',
      color: 'from-purple-400 to-pink-500'
    },
    {
      title: 'ISS Tracker',
      description: 'Track the International Space Station in real-time.',
      icon: '🛰️',
      href: '/sun-moon-space/iss',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      title: 'NASA Picture of the Day',
      description: 'Explore stunning astronomy images from NASA.',
      icon: '🌌',
      href: '/sun-moon-space/nasa-apod',
      color: 'from-indigo-400 to-purple-500'
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center border-2 border-blue-300 p-4 rounded-lg">
          Sun, Moon & Space
        </h1>
      </div>
      <p className="mb-8 text-center text-gray-600 dark:text-gray-300 text-lg">
        Explore astronomical phenomena, track celestial events, and discover the wonders of space.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <Link
            key={index}
            href={section.href}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
            
            <div className="relative p-8 h-full flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="text-6xl mb-4">{section.icon}</div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  {section.title}
                </h2>
                <p className="text-white/90 text-sm leading-relaxed">
                  {section.description}
                </p>
              </div>
              
              <div className="mt-6 flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
                Explore
                <svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          About Astronomical Data
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">🌍 Location-Based</h3>
            <p className="text-sm">
              Get accurate sunrise, sunset, and astronomical data based on your specific location coordinates.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">📅 Real-Time Updates</h3>
            <p className="text-sm">
              Access up-to-date information about celestial events, moon phases, and planetary positions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">🔭 NASA Integration</h3>
            <p className="text-sm">
              Explore stunning astronomy images and data directly from NASA's extensive archives.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">🛰️ ISS Tracking</h3>
            <p className="text-sm">
              Follow the International Space Station's orbit and see who's currently in space.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

