'use client';

import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
  src?: string | null;
  alt: string;
  className?: string;
  category?: string;
}

const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  sports: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
  business: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
  science: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop',
  health: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
  entertainment: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop',
  general: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
};

const CATEGORY_GRADIENTS: Record<string, { bg: string; icon: string; label: string }> = {
  technology: { bg: 'from-blue-600 via-indigo-600 to-cyan-500', icon: '💻', label: 'Tech & Innovation' },
  sports: { bg: 'from-amber-600 via-orange-600 to-rose-500', icon: '🏆', label: 'Sports & Athletics' },
  business: { bg: 'from-emerald-600 via-teal-600 to-cyan-600', icon: '📈', label: 'Markets & Finance' },
  science: { bg: 'from-purple-600 via-violet-600 to-indigo-600', icon: '🔬', label: 'Science & Discovery' },
  health: { bg: 'from-rose-600 via-pink-600 to-purple-600', icon: '🩺', label: 'Health & Wellness' },
  entertainment: { bg: 'from-fuchsia-600 via-pink-600 to-amber-500', icon: '🎬', label: 'Culture & Arts' },
  general: { bg: 'from-blue-600 via-purple-600 to-pink-600', icon: '🌐', label: 'Global Headlines' },
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  category = 'general',
}) => {
  const catKey = category.toLowerCase();
  const defaultFallback = DEFAULT_CATEGORY_IMAGES[catKey] || DEFAULT_CATEGORY_IMAGES.general;
  const gradientInfo = CATEGORY_GRADIENTS[catKey] || CATEGORY_GRADIENTS.general;

  const [imgSrc, setImgSrc] = useState<string>(src || defaultFallback);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [fallbackFailed, setFallbackFailed] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(src || defaultFallback);
    setHasError(false);
    setFallbackFailed(false);
    setIsLoaded(false);
  }, [src, defaultFallback]);

  const handleError = () => {
    if (!hasError && imgSrc !== defaultFallback) {
      setHasError(true);
      setImgSrc(defaultFallback);
    } else {
      setFallbackFailed(true);
      setIsLoaded(true);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      {/* Decorative Gradient Fallback if images fail entirely */}
      {fallbackFailed ? (
        <div className={`w-full h-full bg-gradient-to-br ${gradientInfo.bg} flex flex-col items-center justify-center p-4 text-center select-none`}>
          <span className="text-4xl sm:text-5xl mb-2 filter drop-shadow-md">{gradientInfo.icon}</span>
          <span className="text-xs sm:text-sm font-bold text-white/95 uppercase tracking-wider drop-shadow">
            {gradientInfo.label}
          </span>
        </div>
      ) : (
        <>
          {/* Skeleton while loading */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />
          )}

          <img
            src={imgSrc}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={handleError}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          />
        </>
      )}
    </div>
  );
};

export default ImageWithFallback;
