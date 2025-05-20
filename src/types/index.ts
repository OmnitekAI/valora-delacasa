
export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  cost: number;
}

export interface ProductionTime {
  timeMinutes: number;
  yieldsUnits: number;
}

export interface Formula {
  id: string;
  name: string;
  ingredients: Ingredient[];
  productionTime: ProductionTime;
  hourlyWage: number;
  markup: number;
  createdAt: string;
  updatedAt: string;
}

export interface FormulaResult {
  ingredientsCost: number;
  timePerUnit: number;
  laborCost: number;
  totalCost: number;
  retailPrice: number;
  profit: number;
}

export interface ProfitGoalResult {
  monthlyUnits: number;
  monthlyCost: number;
  monthlyTime: number; // in minutes
  timePercentage: number; // percentage of full-time work
}
