import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

const meals = [
  { name: 'Breakfast', calories: 400, protein: 20, carbs: 50, fat: 15 },
  { name: 'Lunch', calories: 600, protein: 30, carbs: 70, fat: 20 },
  { name: 'Dinner', calories: 500, protein: 25, carbs: 60, fat: 18 },
]

export function MealLogCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Meal Log</CardTitle>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Meal
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <div>
                <h4 className="font-semibold">{meal.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {meal.calories} cal | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                </p>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

