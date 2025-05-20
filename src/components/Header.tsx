
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { Calendar, Save, FileExport, FileImport } from 'lucide-react';

interface HeaderProps {
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="border-b border-border mb-6">
      <div className="container flex flex-col sm:flex-row justify-between items-center py-4">
        <div>
          <h1 className="text-2xl font-bold">{t('app.title')}</h1>
          <p className="text-muted-foreground">{t('app.subtitle')}</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
          >
            {language === 'en' ? 'Español' : 'English'}
          </Button>
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {t('nav.theme')}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
