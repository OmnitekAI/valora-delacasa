
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FormulaResult, ProfitGoalResult } from '../types';
import { formatCurrency, formatTime, calculateProfitGoal } from '../services/calculator';
import { Formula } from '../types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CalendarArrowUp, ChartBar } from 'lucide-react';

interface ProfitGoalCalculatorProps {
  formula: Formula;
  results: FormulaResult | null;
}

const ProfitGoalCalculator: React.FC<ProfitGoalCalculatorProps> = ({ formula, results }) => {
  const { t } = useLanguage();
  const [monthlyProfitGoal, setMonthlyProfitGoal] = useState<number>(1000);
  const [goalResults, setGoalResults] = useState<ProfitGoalResult | null>(null);

  const handleCalculateGoal = () => {
    if (!results) return;
    const goalData = calculateProfitGoal(formula, results, monthlyProfitGoal);
    setGoalResults(goalData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profitGoal.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profit-goal">{t('profitGoal.monthlyTarget')}</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">$</span>
            <Input
              id="profit-goal"
              type="number"
              min="0"
              step="100"
              className="pl-6"
              value={monthlyProfitGoal || ''}
              onChange={(e) => setMonthlyProfitGoal(parseFloat(e.target.value) || 0)}
              placeholder="1000"
            />
          </div>
        </div>
        
        <Button 
          onClick={handleCalculateGoal}
          disabled={!results}
          className="w-full"
        >
          {t('profitGoal.calculate')}
        </Button>
        
        {goalResults && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <ChartBar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t('profitGoal.unitsNeeded')}</span>
                </div>
                <span className="text-2xl font-bold">{goalResults.monthlyUnits.toLocaleString()}</span>
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.round(goalResults.monthlyUnits / 30)} per day
                </div>
              </div>
              
              <div className="bg-secondary p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <CalendarArrowUp className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t('profitGoal.timeRequired')}</span>
                </div>
                <span className="text-2xl font-bold">{formatTime(goalResults.monthlyTime)}</span>
                <div className="text-xs text-muted-foreground mt-1">
                  {goalResults.timePercentage.toFixed(1)}% of full-time work
                </div>
              </div>
            </div>
            
            <div className="bg-secondary p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">{t('profitGoal.costRequired')}</div>
              <div className="text-2xl font-bold">{formatCurrency(goalResults.monthlyCost)}</div>
            </div>
            
            <div className="w-full bg-secondary rounded-full h-6">
              <div 
                className="bg-primary rounded-full h-6 flex items-center justify-end px-2 text-xs font-semibold" 
                style={{ width: `${Math.min(100, goalResults.timePercentage)}%` }}
              >
                {goalResults.timePercentage <= 15 ? '' : `${goalResults.timePercentage.toFixed(0)}%`}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Full-time work capacity (160 hours/month)
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfitGoalCalculator;
