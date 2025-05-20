
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Formula, FormulaResult, Ingredient } from '../types';
import { calculateResults } from '../services/calculator';
import { saveFormula, exportFormulas, importFormulas } from '../services/storage';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, CalendarArrowDown, FileExport, FileImport } from 'lucide-react';

import IngredientsList from './IngredientsList';
import ProductionSettings from './ProductionSettings';
import Results from './Results';
import ProfitGoalCalculator from './ProfitGoalCalculator';
import SavedFormulas from './SavedFormulas';

const Calculator: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Formula state
  const [formulaName, setFormulaName] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [timeMinutes, setTimeMinutes] = useState<number>(30);
  const [yieldsUnits, setYieldsUnits] = useState<number>(10);
  const [hourlyWage, setHourlyWage] = useState<number>(15);
  const [markup, setMarkup] = useState<number>(200);
  
  // Results state
  const [results, setResults] = useState<FormulaResult | null>(null);
  const [currentFormulaId, setCurrentFormulaId] = useState<string | null>(null);
  
  // Dialog states
  const [importDialogOpen, setImportDialogOpen] = useState<boolean>(false);
  const [exportDialogOpen, setExportDialogOpen] = useState<boolean>(false);
  const [importData, setImportData] = useState<string>('');
  const [exportData, setExportData] = useState<string>('');
  
  // Effect to calculate results when inputs change
  useEffect(() => {
    if (ingredients.length > 0 && timeMinutes > 0 && yieldsUnits > 0) {
      handleCalculate();
    }
  }, [ingredients, timeMinutes, yieldsUnits, hourlyWage, markup]);
  
  const createFormulaObject = (): Formula => {
    return {
      id: currentFormulaId || Date.now().toString(),
      name: formulaName || 'Untitled Formula',
      ingredients,
      productionTime: {
        timeMinutes,
        yieldsUnits
      },
      hourlyWage,
      markup,
      createdAt: currentFormulaId ? new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };
  
  const handleCalculate = () => {
    const formula = createFormulaObject();
    const calculatedResults = calculateResults(formula);
    setResults(calculatedResults);
  };
  
  const handleSaveFormula = () => {
    if (ingredients.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one ingredient",
        variant: "destructive"
      });
      return;
    }
    
    const formula = createFormulaObject();
    saveFormula(formula);
    setCurrentFormulaId(formula.id);
    
    toast({
      title: "Success",
      description: "Formula saved successfully"
    });
  };
  
  const handleLoadFormula = (formula: Formula) => {
    setFormulaName(formula.name);
    setIngredients(formula.ingredients);
    setTimeMinutes(formula.productionTime.timeMinutes);
    setYieldsUnits(formula.productionTime.yieldsUnits);
    setHourlyWage(formula.hourlyWage);
    setMarkup(formula.markup);
    setCurrentFormulaId(formula.id);
    
    // Results will be calculated by the useEffect
  };
  
  const handleReset = () => {
    setFormulaName('');
    setIngredients([]);
    setTimeMinutes(30);
    setYieldsUnits(10);
    setHourlyWage(15);
    setMarkup(200);
    setResults(null);
    setCurrentFormulaId(null);
  };
  
  const handleExport = () => {
    const data = exportFormulas();
    setExportData(data);
    setExportDialogOpen(true);
  };
  
  const handleImport = () => {
    const success = importFormulas(importData);
    
    if (success) {
      toast({
        title: "Success",
        description: "Formulas imported successfully"
      });
      setImportDialogOpen(false);
      setImportData('');
      
      // Trigger storage event to update the SavedFormulas component
      window.dispatchEvent(new Event('storage'));
    } else {
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">{t('nav.calculator')}</TabsTrigger>
          <TabsTrigger value="saved">{t('nav.saved')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                <div className="space-y-1">
                  <CardTitle>{t('calculator.formulaName')}</CardTitle>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <FileExport className="h-4 w-4 mr-2" />
                    {t('calculator.export')}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setImportDialogOpen(true)}>
                    <FileImport className="h-4 w-4 mr-2" />
                    {t('calculator.import')}
                  </Button>
                </div>
              </div>
              <Input
                placeholder={t('calculator.formulaName')}
                value={formulaName}
                onChange={(e) => setFormulaName(e.target.value)}
                className="mt-2"
              />
            </CardHeader>
            <CardContent className="space-y-6">
              <IngredientsList
                ingredients={ingredients}
                setIngredients={setIngredients}
              />
              
              <ProductionSettings
                timeMinutes={timeMinutes}
                yieldsUnits={yieldsUnits}
                hourlyWage={hourlyWage}
                markup={markup}
                setTimeMinutes={setTimeMinutes}
                setYieldsUnits={setYieldsUnits}
                setHourlyWage={setHourlyWage}
                setMarkup={setMarkup}
              />
              
              <div className="flex space-x-2 pt-4">
                <Button onClick={handleSaveFormula} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  {t('calculator.save')}
                </Button>
                <Button variant="outline" onClick={handleReset} className="flex-1">
                  {t('calculator.reset')}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Results results={results} />
              <ProfitGoalCalculator 
                formula={createFormulaObject()} 
                results={results} 
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved">
          <SavedFormulas onLoadFormula={handleLoadFormula} />
        </TabsContent>
      </Tabs>
      
      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('calculator.import')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="import-json">JSON Data</Label>
              <Textarea
                id="import-json"
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder='[{"id":"1","name":"My Formula",...}]'
                rows={10}
              />
            </div>
            <Button onClick={handleImport} className="w-full">
              {t('calculator.import')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('calculator.export')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="export-json">JSON Data</Label>
              <Textarea
                id="export-json"
                value={exportData}
                readOnly
                rows={10}
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Copy this JSON data and save it to import later
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calculator;
