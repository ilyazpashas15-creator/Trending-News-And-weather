import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import ClientWrapper from './ClientWrapper';
import { ThemeProvider } from '@/context/ThemeContext';
import Footer from '@/components/ui/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#060913' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://myweatherapp.com'),
  title: {
    default: 'Trending News & Weather | Real-Time Forecasts & World Headlines',
    template: '%s | Trending News & Weather',
  },
  description:
    'Real-time weather forecasts, severe condition alerts, interactive world clock, and trending news coverage across Technology, Sports, Finance, Science, and World events.',
  keywords: [
    'weather forecast',
    'trending news',
    'live weather radar',
    'breaking headlines',
    'technology news',
    'sports news',
    'world clock',
    'time zones',
    'weather alerts',
  ],
  authors: [{ name: 'Trending News & Weather Team' }],
  creator: 'Trending News & Weather',
  publisher: 'Trending News & Weather',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/search-icon.svg',
    shortcut: '/search-icon.svg',
    apple: '/search-icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myweatherapp.com',
    siteName: 'Trending News & Weather',
    title: 'Trending News & Weather | Real-Time Forecasts & World Headlines',
    description:
      'Accurate 5-day weather forecasts, personalized location alerts, and live trending headlines across Technology, Sports, Finance, and World events.',
    images: [
      {
        url: '/city-skyline-blur.svg',
        width: 1200,
        height: 630,
        alt: 'Trending News & Weather Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trending News & Weather',
    description:
      'Real-time weather forecasts, severe condition alerts, and live trending headlines.',
    images: ['/city-skyline-blur.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Trending News & Weather',
        url: 'https://myweatherapp.com',
        applicationCategory: 'NewsApplication, WeatherApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        description:
          'Live weather forecast, severe weather alerts, world clock, and trending global news.',
      },
      {
        '@type': 'NewsMediaOrganization',
        name: 'Trending News & Weather',
        url: 'https://myweatherapp.com',
        logo: 'https://myweatherapp.com/search-icon.svg',
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} ${outfit.variable} font-sans bg-slate-50 text-slate-900 dark:bg-[#060913] dark:text-slate-100 antialiased transition-colors duration-300 selection:bg-purple-500 selection:text-white`}
      >
        {/* Ambient background layers */}
        <div className="neural-lattice pointer-events-none" aria-hidden="true" />
        <div className="ambient-orbs pointer-events-none" aria-hidden="true" />
        
        <ThemeProvider>
          <ClientWrapper>
            <div className="min-h-screen flex flex-col relative z-10">
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
