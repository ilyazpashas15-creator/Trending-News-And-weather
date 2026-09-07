'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import SiteHeader from '@/components/ui/SiteHeader';
import NewsSection from '@/components/ui/NewsSection';

export default function NewsWorldPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 page-enter">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white section-heading">
            World News
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Real-time reporting and global headlines from verified international sources
          </p>
        </div>

        <NewsSection defaultCategory="general" defaultCountry="us" useWorldAPI={true} showTitle={false} />
      </main>
    </div>
  );
}