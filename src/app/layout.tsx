import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import ClientWrapper from './ClientWrapper';
import { ThemeProvider } from '@/context/ThemeContext';
import Footer from '@/components/ui/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'My Weather & News App',
  description: 'A modern weather and news application with real-time data',
  icons: {
    icon: '/search-icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${outfit.variable} bg-[#0a0f1e] dark:bg-[#05070f] text-slate-100 antialiased`}>
        {/* Ambient background layers */}
        <div className="neural-lattice" aria-hidden="true" />
        <div className="ambient-orbs" aria-hidden="true" />
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
