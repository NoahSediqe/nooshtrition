import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MealLogCardProps {
  mealName: string
  calories: number
  protein: number
  carbs: number
  fats: number
}

export function MealLogCard({ mealName, calories, protein, carbs, fats }: MealLogCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {mealName}
        </CardTitle>
        <Button variant="ghost">Edit</Button>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{calories} kcal</div>
        <div className="text-xs text-muted-foreground">
          Protein: {protein}g | Carbs: {carbs}g | Fats: {fats}g
        </div>
      </CardContent>
    </Card>
  )
}

