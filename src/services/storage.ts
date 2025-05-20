
import { Formula } from '../types';

const STORAGE_KEY = 'pricing-calculator-formulas';

export const saveFormula = (formula: Formula): void => {
  const formulas = getFormulas();
  const existingIndex = formulas.findIndex(f => f.id === formula.id);
  
  if (existingIndex >= 0) {
    formulas[existingIndex] = formula;
  } else {
    formulas.push(formula);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formulas));
};

export const getFormulas = (): Formula[] => {
  const formulas = localStorage.getItem(STORAGE_KEY);
  return formulas ? JSON.parse(formulas) : [];
};

export const getFormula = (id: string): Formula | undefined => {
  const formulas = getFormulas();
  return formulas.find(formula => formula.id === id);
};

export const deleteFormula = (id: string): void => {
  const formulas = getFormulas();
  const updatedFormulas = formulas.filter(formula => formula.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFormulas));
};

export const deleteAllFormulas = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const exportFormulas = (): string => {
  const formulas = getFormulas();
  return JSON.stringify(formulas, null, 2);
};

export const importFormulas = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    
    // Basic validation
    if (!Array.isArray(data)) {
      return false;
    }
    
    // Save imported data
    localStorage.setItem(STORAGE_KEY, jsonString);
    return true;
  } catch (error) {
    return false;
  }
};
