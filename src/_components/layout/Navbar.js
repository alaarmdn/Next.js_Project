'use client';

import Link from 'next/link';
import { Heart, Home } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import LanguageSelector from '@/components/common/LanguageSelector';

export default function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className="bg-black text-white p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          Elevante Cinema
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors group">
            <Home className="w-5 h-5 fill-white text-white group-hover:fill-maroon group-hover:text-maroon transition-colors" />
            <span>Home</span>
          </Link>
          <Link href="/favorites" className="relative flex items-center space-x-1 text-gray-300 hover:text-white transition-colors group">
            <Heart className="w-6 h-6 fill-white text-white group-hover:fill-maroon group-hover:text-maroon transition-colors" />
            <span>watchlist</span>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-maroon text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-900 transition-colors">
                {favorites.length}
              </span>
            )}
          </Link>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
} 