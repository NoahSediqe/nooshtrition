import { MacroProgressCard } from "@/components/macro-progress-card"
import { MealLogCard } from "@/components/meal-log-card"
import { DailyIntakeChart } from "@/components/daily-intake-chart"

export default function Dashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <MacroProgressCard />
      <MealLogCard />
      <DailyIntakeChart />
    </div>
  )
}

