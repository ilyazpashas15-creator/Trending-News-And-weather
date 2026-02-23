import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientWrapper from './ClientWrapper';
import { ThemeProvider } from '@/context/ThemeContext';
import Footer from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} bg-[#1a2942] dark:bg-[#0d1929]`}>
        <ThemeProvider>
          <ClientWrapper>
            <div className="min-h-screen flex flex-col">
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
