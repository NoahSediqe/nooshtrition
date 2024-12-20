"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { getUserMeals, type Meal } from "@/lib/db/meals"
import { useUser } from "@supabase/auth-helpers-react"

export function MealLogCard() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const user = useUser()

  useEffect(() => {
    async function fetchMeals() {
      if (!user?.id) return
      
      try {
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0]
        const userMeals = await getUserMeals(user.id, today)
        setMeals(userMeals)
      } catch (error) {
        console.error('Error fetching meals:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMeals()
  }, [user?.id])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Meal Log</CardTitle>
        </CardHeader>
        <CardContent>
          Loading meals...
        </CardContent>
      </Card>
    )
  }

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
          {meals.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No meals logged today
            </div>
          ) : (
            meals.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <div>
                  <h4 className="font-semibold">{meal.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {meal.total_calories} cal | P: {meal.total_protein}g | C: {meal.total_carbs}g | F: {meal.total_fat}g
                  </p>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

