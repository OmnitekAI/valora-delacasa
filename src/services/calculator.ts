
import { Formula, FormulaResult, ProfitGoalResult } from '../types';

export const calculateResults = (formula: Formula): FormulaResult => {
  // Calculate ingredients cost
  const ingredientsCost = formula.ingredients.reduce((total, ingredient) => {
    return total + ingredient.cost;
  }, 0);
  
  // Calculate time per unit
  const timePerUnit = formula.productionTime.timeMinutes / formula.productionTime.yieldsUnits;
  
  // Calculate labor cost per unit
  const laborCost = (timePerUnit / 60) * formula.hourlyWage;
  
  // Total cost per unit
  const totalCost = ingredientsCost + laborCost;
  
  // Calculate retail price
  const retailPrice = totalCost * (1 + formula.markup / 100);
  
  // Calculate profit
  const profit = retailPrice - totalCost;
  
  return {
    ingredientsCost,
    timePerUnit,
    laborCost,
    totalCost,
    retailPrice,
    profit
  };
};

export const calculateProfitGoal = (
  formula: Formula, 
  results: FormulaResult,
  monthlyProfitGoal: number
): ProfitGoalResult => {
  // Calculate how many units needed to reach monthly profit
  const monthlyUnits = Math.ceil(monthlyProfitGoal / results.profit);
  
  // Calculate total cost needed
  const monthlyCost = monthlyUnits * results.totalCost;
  
  // Calculate total time needed in minutes
  const monthlyTime = monthlyUnits * results.timePerUnit;
  
  // Calculate what percentage of full-time work this represents
  // Assuming full-time is 40 hours per week, 4 weeks per month = 160 hours = 9600 minutes
  const fullTimeMinutes = 9600;
  const timePercentage = (monthlyTime / fullTimeMinutes) * 100;
  
  return {
    monthlyUnits,
    monthlyCost,
    monthlyTime,
    timePercentage
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  
  if (hours === 0) {
    return `${mins} minutes`;
  } else if (mins === 0) {
    return `${hours} hours`;
  } else {
    return `${hours} hours, ${mins} minutes`;
  }
};
