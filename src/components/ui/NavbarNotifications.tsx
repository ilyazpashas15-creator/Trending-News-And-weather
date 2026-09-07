'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NotificationAlert {
  id: string;
  type: 'weather' | 'news';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  severity?: 'high' | 'medium' | 'info';
  link?: string;
}

const INITIAL_NOTIFICATIONS: NotificationAlert[] = [
  {
    id: 'notif-1',
    type: 'weather',
    title: 'Precipitation & Rain Alert',
    message: 'Scattered clouds and light showers expected across central Bengaluru in the next 2 hours.',
    time: '8m ago',
    unread: true,
    severity: 'medium',
    link: '/weather/alerts',
  },
  {
    id: 'notif-2',
    type: 'news',
    title: 'Breaking Tech Wire',
    message: 'Major breakthrough in next-generation clean energy data center cooling solutions announced.',
    time: '24m ago',
    unread: true,
    severity: 'info',
    link: '/#news',
  },
  {
    id: 'notif-3',
    type: 'weather',
    title: 'UV Index Advisory',
    message: 'Moderate UV index (Rating: 3-4) recorded. Sun protection advised for outdoor activities.',
    time: '1h ago',
    unread: false,
    severity: 'info',
    link: '/weather',
  },
  {
    id: 'notif-4',
    type: 'news',
    title: 'Market Insights Update',
    message: 'Global equity indices gain momentum following positive macroeconomic inflation data.',
    time: '3h ago',
    unread: false,
    severity: 'info',
    link: '/#news',
  },
];

const NavbarNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationAlert[]>(INITIAL_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'weather' | 'news'>('all');
  const popoverRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markItemRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  return (
    <div ref={popoverRef} className="relative">
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100/80 dark:hover:bg-white/10 transition-all duration-200 touch-target flex items-center justify-center"
        aria-label={`Notifications (${unreadCount} unread)`}
        title="Notifications & Alerts"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Pulse badge */}
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
            <span className="relative inline-flex items-center justify-center rounded-full h-3.5 w-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-[9px] font-extrabold text-white">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* Notifications Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white/95 dark:bg-[#0c1324]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Alerts & Updates
              </span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-pink-100 dark:bg-pink-950/70 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-500/30">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                >
                  Mark read
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5 border-b border-slate-100/60 dark:border-white/5">
            {(['all', 'weather', 'news'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                  activeFilter === filter
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {filter === 'all' ? 'All Alerts' : filter}
              </button>
            ))}
          </div>

          {/* Notification Items List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-white/5 scrollbar-none">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markItemRead(item.id)}
                  className={`p-3.5 transition-colors cursor-pointer flex gap-3 ${
                    item.unread
                      ? 'bg-purple-50/50 dark:bg-purple-950/20 hover:bg-purple-50 dark:hover:bg-purple-950/30'
                      : 'hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="text-xl flex-shrink-0 mt-0.5">
                    {item.type === 'weather' ? '⚡' : '📰'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p
                        className={`text-xs sm:text-sm font-bold truncate ${
                          item.unread
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 flex-shrink-0">
                        {item.time}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {item.message}
                    </p>

                    {item.link && (
                      <Link
                        href={item.link}
                        onClick={() => setIsOpen(false)}
                        className="inline-block mt-2 text-[11px] font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        View details →
                      </Link>
                    )}
                  </div>

                  {item.unread && (
                    <div className="w-2 h-2 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                  )}
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-400">
                No notifications in this category.
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-2.5 bg-slate-50/80 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs px-4">
              <span className="text-[11px] text-slate-400">Real-time Weather & News Alerts</span>
              <button
                type="button"
                onClick={clearNotifications}
                className="text-[11px] text-slate-400 hover:text-red-500 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarNotifications;
