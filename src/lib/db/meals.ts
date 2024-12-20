import { supabase } from '../supabase'

export type Meal = {
  id?: number
  user_id: string
  name: string
  meal_time: string
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fat: number
}

export type MealFoodItem = {
  meal_id: number
  food_item_id: number
  quantity: number
}

export async function createMeal(meal: Omit<Meal, 'id'>, foodItems: { foodId: number, quantity: number }[]) {
  // Start a transaction
  const { data: mealData, error: mealError } = await supabase
    .from('meals')
    .insert([meal])
    .select()
    .single()

  if (mealError) throw mealError

  // Add food items to the meal
  const mealFoodItems = foodItems.map(item => ({
    meal_id: mealData.id,
    food_item_id: item.foodId,
    quantity: item.quantity
  }))

  const { error: relationError } = await supabase
    .from('meal_food_items')
    .insert(mealFoodItems)

  if (relationError) throw relationError

  return mealData
}

export async function getUserMeals(userId: string, date?: string) {
  let query = supabase
    .from('meals')
    .select(`
      *,
      meal_food_items (
        quantity,
        food_items (*)
      )
    `)
    .eq('user_id', userId)
    .order('meal_time', { ascending: true })

  if (date) {
    // Add date filter if provided
    query = query.gte('meal_time', `${date}T00:00:00`)
      .lt('meal_time', `${date}T23:59:59`)
  }

  const { data, error } = await query

  if (error) throw error
  return data
} 