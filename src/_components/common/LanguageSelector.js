'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSelector() {
  const { language, changeLanguage, supportedLanguages } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="bg-black text-white px-3 py-1 rounded text-sm outline-none cursor-pointer hover:text-maroon transition-colors"
      suppressHydrationWarning
    >
      {supportedLanguages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.code.toUpperCase()}
        </option>
      ))}
    </select>
  );
} 