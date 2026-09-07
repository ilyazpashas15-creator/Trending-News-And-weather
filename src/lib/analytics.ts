/**
 * Analytics Utility for Tracking Page Views & User Interactions
 * Adheres to Step 07 of Task1.md
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
    dataLayer?: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

/**
 * Tracks a page view event
 */
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }

  // Plausible Analytics
  if (window.plausible) {
    window.plausible('pageview', { props: { path: url } });
  }

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] 📊 Pageview: ${url}`);
  }
};

/**
 * Tracks a custom user interaction event (e.g. bookmarks, shares, search, category changes)
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: params });
  }

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ⚡ Event "${eventName}":`, params);
  }
};
