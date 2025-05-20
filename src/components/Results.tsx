
import React from 'react';
import { FormulaResult } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatTime } from '../services/calculator';
import { CalendarArrowUp, Chart, ChartPie } from 'lucide-react';

interface ResultsProps {
  results: FormulaResult | null;
}

const Results: React.FC<ResultsProps> = ({ results }) => {
  const { t } = useLanguage();

  if (!results) return null;

  // Calculate percentages for pie chart display
  const ingredientsPercentage = (results.ingredientsCost / results.totalCost) * 100;
  const laborPercentage = (results.laborCost / results.totalCost) * 100;
  const profitPercentage = (results.profit / results.retailPrice) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('results.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">{t('results.ingredientsCost')}</span>
            <span className="text-2xl font-bold">{formatCurrency(results.ingredientsCost)}</span>
          </div>
          
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">{t('results.laborCost')}</span>
            <span className="text-2xl font-bold">{formatCurrency(results.laborCost)}</span>
            <span className="text-xs text-muted-foreground">{formatTime(results.timePerUnit)} per unit</span>
          </div>
          
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">{t('results.totalCost')}</span>
            <span className="text-2xl font-bold">{formatCurrency(results.totalCost)}</span>
          </div>
        </div>
        
        <div className="bg-secondary p-4 rounded-lg my-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">{t('results.retailPrice')}</div>
              <div className="text-3xl font-bold">{formatCurrency(results.retailPrice)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t('results.profit')}</div>
              <div className="text-3xl font-bold">{formatCurrency(results.profit)}</div>
              <div className="text-sm text-muted-foreground">{profitPercentage.toFixed(1)}% margin</div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">{t('results.costBreakdown')}</h4>
          <div className="w-full bg-secondary rounded-full h-4">
            <div className="flex rounded-full h-4 overflow-hidden">
              <div 
                className="bg-blue-500" 
                style={{ width: `${ingredientsPercentage}%` }}
                title={`${t('results.ingredientsCost')}: ${formatCurrency(results.ingredientsCost)}`}
              ></div>
              <div 
                className="bg-green-500" 
                style={{ width: `${laborPercentage}%` }}
                title={`${t('results.laborCost')}: ${formatCurrency(results.laborCost)}`}
              ></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              {t('results.ingredientsCost')} ({ingredientsPercentage.toFixed(1)}%)
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              {t('results.laborCost')} ({laborPercentage.toFixed(1)}%)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Results;
