
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'app.title': 'Pricing Calculator',
    'app.subtitle': 'Calculate retail pricing from cost',
    'calculator.ingredients': 'Ingredients',
    'calculator.addIngredient': 'Add Ingredient',
    'calculator.name': 'Name',
    'calculator.quantity': 'Quantity',
    'calculator.unit': 'Unit',
    'calculator.cost': 'Cost',
    'calculator.remove': 'Remove',
    'calculator.time': 'Production Time',
    'calculator.timeMinutes': 'Time (minutes)',
    'calculator.yieldsUnits': 'Yields (units)',
    'calculator.hourlyWage': 'Hourly Wage',
    'calculator.markup': 'Markup (%)',
    'calculator.calculate': 'Calculate',
    'calculator.save': 'Save Formula',
    'calculator.load': 'Load Formula',
    'calculator.import': 'Import',
    'calculator.export': 'Export',
    'calculator.reset': 'Reset',
    'calculator.formulaName': 'Formula Name',
    'results.title': 'Results',
    'results.ingredientsCost': 'Ingredients Cost',
    'results.laborCost': 'Labor Cost',
    'results.totalCost': 'Total Cost',
    'results.retailPrice': 'Retail Price',
    'results.profit': 'Profit',
    'results.costBreakdown': 'Cost Breakdown',
    'profitGoal.title': 'Profit Goal Analysis',
    'profitGoal.monthlyTarget': 'Monthly Profit Target',
    'profitGoal.unitsNeeded': 'Units Needed',
    'profitGoal.costRequired': 'Total Cost Required',
    'profitGoal.timeRequired': 'Time Required',
    'profitGoal.timePercent': 'Percentage of Full-time',
    'profitGoal.calculate': 'Calculate Goal',
    'nav.calculator': 'Calculator',
    'nav.saved': 'Saved Formulas',
    'nav.language': 'Language',
    'nav.theme': 'Theme',
    'storage.formulas': 'Saved Formulas',
    'storage.formulaList': 'Your Formulas',
    'storage.noFormulas': 'No saved formulas yet',
    'storage.deleteAll': 'Delete All',
    'storage.delete': 'Delete',
  },
  es: {
    'app.title': 'Calculadora de Precios',
    'app.subtitle': 'Calcular precios minoristas a partir del costo',
    'calculator.ingredients': 'Ingredientes',
    'calculator.addIngredient': 'Añadir Ingrediente',
    'calculator.name': 'Nombre',
    'calculator.quantity': 'Cantidad',
    'calculator.unit': 'Unidad',
    'calculator.cost': 'Costo',
    'calculator.remove': 'Eliminar',
    'calculator.time': 'Tiempo de Producción',
    'calculator.timeMinutes': 'Tiempo (minutos)',
    'calculator.yieldsUnits': 'Produce (unidades)',
    'calculator.hourlyWage': 'Salario por Hora',
    'calculator.markup': 'Margen (%)',
    'calculator.calculate': 'Calcular',
    'calculator.save': 'Guardar Fórmula',
    'calculator.load': 'Cargar Fórmula',
    'calculator.import': 'Importar',
    'calculator.export': 'Exportar',
    'calculator.reset': 'Reiniciar',
    'calculator.formulaName': 'Nombre de la Fórmula',
    'results.title': 'Resultados',
    'results.ingredientsCost': 'Costo de Ingredientes',
    'results.laborCost': 'Costo de Mano de Obra',
    'results.totalCost': 'Costo Total',
    'results.retailPrice': 'Precio Minorista',
    'results.profit': 'Ganancia',
    'results.costBreakdown': 'Desglose de Costos',
    'profitGoal.title': 'Análisis de Meta de Ganancia',
    'profitGoal.monthlyTarget': 'Meta de Ganancia Mensual',
    'profitGoal.unitsNeeded': 'Unidades Necesarias',
    'profitGoal.costRequired': 'Costo Total Requerido',
    'profitGoal.timeRequired': 'Tiempo Requerido',
    'profitGoal.timePercent': 'Porcentaje de Tiempo Completo',
    'profitGoal.calculate': 'Calcular Meta',
    'nav.calculator': 'Calculadora',
    'nav.saved': 'Fórmulas Guardadas',
    'nav.language': 'Idioma',
    'nav.theme': 'Tema',
    'storage.formulas': 'Fórmulas Guardadas',
    'storage.formulaList': 'Tus Fórmulas',
    'storage.noFormulas': 'Aún no hay fórmulas guardadas',
    'storage.deleteAll': 'Eliminar Todo',
    'storage.delete': 'Eliminar',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
