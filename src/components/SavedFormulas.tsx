
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Formula } from '../types';
import { getFormulas, deleteFormula, deleteAllFormulas } from '../services/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Save, Trash } from 'lucide-react';

interface SavedFormulasProps {
  onLoadFormula: (formula: Formula) => void;
}

const SavedFormulas: React.FC<SavedFormulasProps> = ({ onLoadFormula }) => {
  const { t } = useLanguage();
  const [formulas, setFormulas] = useState<Formula[]>([]);
  
  useEffect(() => {
    const loadFormulas = () => {
      const savedFormulas = getFormulas();
      setFormulas(savedFormulas);
    };
    
    loadFormulas();
    
    // Add event listener for storage changes
    window.addEventListener('storage', loadFormulas);
    
    return () => {
      window.removeEventListener('storage', loadFormulas);
    };
  }, []);
  
  const handleDeleteFormula = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteFormula(id);
    setFormulas(formulas.filter(formula => formula.id !== id));
  };
  
  const handleDeleteAll = () => {
    if (window.confirm(t('storage.deleteAll') + '?')) {
      deleteAllFormulas();
      setFormulas([]);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{t('storage.formulas')}</CardTitle>
        {formulas.length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleDeleteAll}>
            <Trash className="h-4 w-4 mr-2" />
            {t('storage.deleteAll')}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {formulas.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {t('storage.noFormulas')}
          </div>
        ) : (
          <div className="space-y-2">
            {formulas.map((formula) => (
              <div
                key={formula.id}
                className="flex items-center justify-between p-3 rounded-md bg-secondary hover:bg-secondary/80 cursor-pointer"
                onClick={() => onLoadFormula(formula)}
              >
                <div>
                  <div className="font-medium">{formula.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(formula.updatedAt)}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleDeleteFormula(formula.id, e)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedFormulas;
