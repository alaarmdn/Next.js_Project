import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Elevante Cinema',
  description: 'Discover and track your favorite movies',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} pt-16`}>
        <LanguageProvider>
          <FavoritesProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </FavoritesProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
