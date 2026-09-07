'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { trackEvent } from '@/lib/analytics';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  description?: string;
}

export const triggerShare = async (title: string, url: string, description?: string) => {
  if (typeof window !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title,
        text: description || title,
        url,
      });
      trackEvent('social_share_native', { title, url });
      return true;
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.warn('Native share failed, using fallback modal:', err);
      }
      return false;
    }
  }
  return false;
};

const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  title,
  url,
  description = '',
}) => {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareTargets = [
    {
      name: 'X (Twitter)',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      bg: 'bg-black text-white hover:bg-neutral-800',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.961.95 2.796.95 3.179 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.767-5.77zm3.366 8.163c-.141.396-.713.729-1.026.776-.312.047-.707.086-2.146-.48-1.748-.688-2.883-2.457-2.97-2.573-.087-.116-.708-.941-.708-1.794 0-.853.447-1.272.607-1.444.16-.172.35-.215.466-.215.117 0 .234.001.336.006.107.005.25.04.385.362.142.336.484 1.178.527 1.264.043.086.072.186.014.3-.058.114-.087.186-.173.286-.086.1-.18.223-.257.3-.086.086-.176.18-.076.352.1.172.443.731.95 1.183.653.582 1.203.762 1.375.848.172.086.272.072.373-.043.101-.115.43-.501.545-.673.115-.172.23-.143.387-.086.157.057.994.469 1.166.555.172.086.287.129.33.201.043.072.043.416-.098.812z" />
        </svg>
      ),
      bg: 'bg-emerald-600 text-white hover:bg-emerald-500',
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.5a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
        </svg>
      ),
      bg: 'bg-blue-700 text-white hover:bg-blue-600',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      bg: 'bg-blue-600 text-white hover:bg-blue-500',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      addToast('Link copied to clipboard!', 'success');
      trackEvent('copy_link', { title, url });
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      addToast('Failed to copy link', 'error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        className="relative w-full max-w-md p-6 glass-card-dark rounded-3xl shadow-2xl border border-white/20 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <h3 id="share-modal-title" className="text-lg font-bold text-white">
            Share this Article
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close share dialog"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-slate-300 mb-5 line-clamp-2 font-medium">
          {title}
        </p>

        {/* Social Platforms */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {shareTargets.map((target) => (
            <a
              key={target.name}
              href={target.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('social_share_click', { platform: target.name, url })}
              className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-transform transform active:scale-95 shadow-md ${target.bg}`}
            >
              {target.icon}
              <span>{target.name}</span>
            </a>
          ))}
        </div>

        {/* Copy Link Input Bar */}
        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl p-1.5">
          <input
            type="text"
            readOnly
            value={url}
            className="flex-1 bg-transparent px-3 text-xs text-slate-300 select-all outline-none truncate"
          />
          <button
            onClick={handleCopyLink}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg'
            }`}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialShareModal;
