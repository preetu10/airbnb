// contexts/I18nContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface I18nContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Translation dictionaries
const translations = {
  en: {
    'nav.homes': 'Homes',
    'nav.experiences': 'Experiences', 
    'nav.services': 'Services',
    'nav.becomeHost': 'Become a host',
    'modal.title': 'What would you like to host?',
    'modal.home': 'Home',
    'modal.experience': 'Experience',
    'modal.service': 'Service',
    'modal.next': 'Next',
    'lang.english': 'English',
    'lang.bangla': 'বাংলা'
  },
  bn: {
    'nav.homes': 'হোমস',
    'nav.experiences': 'অভিজ্ঞতা',
    'nav.services': 'সেবা',
    'nav.becomeHost': 'হোস্ট হন',
    'modal.title': 'আপনি কী হোস্ট করতে চান?',
    'modal.home': 'হোম',
    'modal.experience': 'অভিজ্ঞতা',
    'modal.service': 'সেবা',
    'modal.next': 'পরবর্তী',
    'lang.english': 'English',
    'lang.bangla': 'বাংলা'
  }
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<string>('en');

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocaleState(savedLocale);
  }, []);

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: string): string => {
    const translation = translations[locale as keyof typeof translations];
    return translation[key as keyof typeof translation] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};