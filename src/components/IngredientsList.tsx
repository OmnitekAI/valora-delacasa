
import React from 'react';
import { Ingredient } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { Plus, X } from 'lucide-react';

interface IngredientsListProps {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients, setIngredients }) => {
  const { t } = useLanguage();

  const handleAddIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: '',
      quantity: 0,
      unit: '',
      cost: 0
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const handleIngredientChange = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients(
      ingredients.map(ing => 
        ing.id === id ? { ...ing, [field]: value } : ing
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t('calculator.ingredients')}</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={handleAddIngredient}
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('calculator.addIngredient')}
        </Button>
      </div>
      
      {ingredients.length > 0 && (
        <div className="grid grid-cols-12 gap-2 mb-2 text-sm font-medium text-muted-foreground">
          <div className="col-span-4">{t('calculator.name')}</div>
          <div className="col-span-2">{t('calculator.quantity')}</div>
          <div className="col-span-2">{t('calculator.unit')}</div>
          <div className="col-span-3">{t('calculator.cost')}</div>
          <div className="col-span-1"></div>
        </div>
      )}

      {ingredients.map((ingredient) => (
        <div key={ingredient.id} className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-4">
            <Input
              type="text"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(ingredient.id, 'name', e.target.value)}
              placeholder={t('calculator.name')}
            />
          </div>
          <div className="col-span-2">
            <Input
              type="number"
              min="0"
              step="0.01"
              value={ingredient.quantity || ''}
              onChange={(e) => handleIngredientChange(ingredient.id, 'quantity', parseFloat(e.target.value) || 0)}
              placeholder={t('calculator.quantity')}
            />
          </div>
          <div className="col-span-2">
            <Input
              type="text"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(ingredient.id, 'unit', e.target.value)}
              placeholder={t('calculator.unit')}
            />
          </div>
          <div className="col-span-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">$</span>
              <Input
                type="number"
                min="0"
                step="0.01"
                className="pl-6"
                value={ingredient.cost || ''}
                onChange={(e) => handleIngredientChange(ingredient.id, 'cost', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="col-span-1 flex justify-end">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              onClick={() => handleRemoveIngredient(ingredient.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      
      {ingredients.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          {t('calculator.addIngredient')} to get started
        </div>
      )}
    </div>
  );
};

export default IngredientsList;
