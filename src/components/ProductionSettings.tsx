
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductionSettingsProps {
  timeMinutes: number;
  yieldsUnits: number;
  hourlyWage: number;
  markup: number;
  setTimeMinutes: (value: number) => void;
  setYieldsUnits: (value: number) => void;
  setHourlyWage: (value: number) => void;
  setMarkup: (value: number) => void;
}

const ProductionSettings: React.FC<ProductionSettingsProps> = ({
  timeMinutes,
  yieldsUnits,
  hourlyWage,
  markup,
  setTimeMinutes,
  setYieldsUnits,
  setHourlyWage,
  setMarkup,
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('calculator.time')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="time-minutes">{t('calculator.timeMinutes')}</Label>
          <Input
            id="time-minutes"
            type="number"
            min="0"
            step="1"
            value={timeMinutes || ''}
            onChange={(e) => setTimeMinutes(parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="yields-units">{t('calculator.yieldsUnits')}</Label>
          <Input
            id="yields-units"
            type="number"
            min="1"
            step="1"
            value={yieldsUnits || ''}
            onChange={(e) => setYieldsUnits(parseInt(e.target.value) || 1)}
            placeholder="1"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="hourly-wage">{t('calculator.hourlyWage')}</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">$</span>
            <Input
              id="hourly-wage"
              type="number"
              min="0"
              step="0.01"
              className="pl-6"
              value={hourlyWage || ''}
              onChange={(e) => setHourlyWage(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="markup">{t('calculator.markup')}</Label>
          <div className="relative">
            <Input
              id="markup"
              type="number"
              min="0"
              step="1"
              value={markup || ''}
              onChange={(e) => setMarkup(parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionSettings;
