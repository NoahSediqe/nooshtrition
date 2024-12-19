import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WorkoutCardProps {
  workoutName: string
  duration: string
  caloriesBurned: number
}

export function WorkoutCard({ workoutName, duration, caloriesBurned }: WorkoutCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {workoutName}
        </CardTitle>
        <Button variant="ghost">Details</Button>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{caloriesBurned} kcal</div>
        <div className="text-xs text-muted-foreground">
          Duration: {duration}
        </div>
      </CardContent>
    </Card>
  )
}

