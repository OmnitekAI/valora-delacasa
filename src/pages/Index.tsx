
import React, { useState } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import Calculator from '../components/Calculator';
import Header from '../components/Header';

const Index = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    if (theme === 'dark') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };
  
  // Set initial theme class
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header toggleTheme={toggleTheme} />
        <Calculator />
      </div>
    </LanguageProvider>
  );
};

export default Index;
