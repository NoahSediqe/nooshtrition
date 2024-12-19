import { MacroTrackingDashboard } from "@/components/macro-tracking-dashboard"
import { MealLogCard } from "@/components/meal-log-card"
import { WorkoutCard } from "@/components/workout-card"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <MacroTrackingDashboard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Today's Meals</h2>
          <MealLogCard
            mealName="Breakfast"
            calories={450}
            protein={20}
            carbs={60}
            fats={15}
          />
          <MealLogCard
            mealName="Lunch"
            calories={650}
            protein={35}
            carbs={75}
            fats={20}
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Recent Workouts</h2>
          <WorkoutCard
            workoutName="Morning Run"
            duration="30 minutes"
            caloriesBurned={300}
          />
          <WorkoutCard
            workoutName="Weight Training"
            duration="45 minutes"
            caloriesBurned={200}
          />
        </div>
      </div>
    </div>
  )
}

