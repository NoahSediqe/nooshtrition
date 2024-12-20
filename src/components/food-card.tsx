import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FoodCardProps {
  name: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  onClick?: () => void;
}

export function FoodCard({ name, serving, calories, protein, carbs, fat, onClick }: FoodCardProps) {
  // Calculate total macros for percentage
  const totalMacros = protein + carbs + fat;
  
  // Calculate macro percentages
  const proteinPercent = (protein / totalMacros) * 100;
  const carbsPercent = (carbs / totalMacros) * 100;
  const fatPercent = (fat / totalMacros) * 100;

  return (
    <Card 
      className="w-[250px] hover:shadow-lg hover:scale-105 transition-all duration-200 hover:bg-accent/50"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label={`Food card for ${name}, ${calories} calories`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold truncate" title={name}>
          {name}
        </CardTitle>
        <CardDescription>
          {serving}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-center mb-4">
          {calories}
          <span className="text-lg text-muted-foreground ml-1">cal</span>
        </div>
        
        {/* Macro nutrients bar */}
        <div className="h-2 w-full bg-muted rounded-full mb-4 overflow-hidden">
          <div className="h-full flex">
            <div 
              className="bg-protein-light dark:bg-protein-dark" 
              style={{ width: `${proteinPercent}%` }}
              title={`Protein: ${protein}g`}
            />
            <div 
              className="bg-carbs-light dark:bg-carbs-dark" 
              style={{ width: `${carbsPercent}%` }}
              title={`Carbs: ${carbs}g`}
            />
            <div 
              className="bg-fat-light dark:bg-fat-dark" 
              style={{ width: `${fatPercent}%` }}
              title={`Fat: ${fat}g`}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 text-center gap-2">
          <div className="space-y-1">
            <div className="font-semibold bg-protein-light dark:bg-protein-dark">{protein}g</div>
            <div className="text-sm text-muted-foreground">Protein</div>
          </div>
          <div className="space-y-1">
            <div className="font-semibold bg-carbs-light dark:bg-carbs-dark">{carbs}g</div>
            <div className="text-sm text-muted-foreground">Carbs</div>
          </div>
          <div className="space-y-1">
            <div className="font-semibold bg-fat-light dark:bg-fat-dark">{fat}g</div>
            <div className="text-sm text-muted-foreground">Fat</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FoodCard;