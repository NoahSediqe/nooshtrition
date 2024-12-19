import { FoodSearch } from "@/components/food-search"
import { MealLogCard } from "@/components/meal-log-card"

export default function FoodLogPage() {
  return (
    <div className="space-y-6">
      <FoodSearch />
      <MealLogCard />
    </div>
  )
}

