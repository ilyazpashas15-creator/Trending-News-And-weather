'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import SiteHeader from '@/components/ui/SiteHeader';
import NewsSection from '@/components/ui/NewsSection';

export default function NewsArchivePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 page-enter">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white section-heading">
            News Archive & Saved Stories
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Historical dispatches, past headlines, and your saved offline bookmarks
          </p>
        </div>

        <NewsSection defaultCategory="general" defaultCountry="in" showTitle={false} />
      </main>
    </div>
  );
}