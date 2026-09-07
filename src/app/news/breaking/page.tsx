'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import SiteHeader from '@/components/ui/SiteHeader';
import NewsSection from '@/components/ui/NewsSection';

export default function NewsBreakingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 page-enter">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            Live Coverage
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white section-heading">
            Breaking News
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Up-to-the-minute updates and fast-developing stories from around the globe
          </p>
        </div>

        <NewsSection defaultCategory="general" defaultCountry="in" showTitle={false} />
      </main>
    </div>
  );
}