import { supabase } from '../supabase'

export type FoodItem = {
  id?: number
  name: string
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  serving: {
    amount: number
    unit: string
  }
  food_type: 'protein' | 'carb' | 'veggie' | 'other'
}

export async function createFoodItem(food: Omit<FoodItem, 'id'>) {
  const { data, error } = await supabase
    .from('food_items')
    .insert([{
      name: food.name,
      ...food.nutrition,
      serving_amount: food.serving.amount,
      serving_unit: food.serving.unit,
      food_type: food.food_type
    }])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function searchFoodItems(query: string) {
  const { data, error } = await supabase
    .from('food_items')
    .select('*')
    .ilike('name', `%${query}%`)
    .limit(10)
  
  if (error) throw error
  return data
}

export async function getFoodItem(id: number) {
  const { data, error } = await supabase
    .from('food_items')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
} 