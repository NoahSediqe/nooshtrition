const API_KEY = process.env.NEXT_PUBLIC_USDA_API_KEY
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1'

export type Nutrition = {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export type FoodDetails = {
  id: number
  name: string
  nutrition: Nutrition
  serving?: {
    amount: number
    unit: string
  }
  food_type: 'protein' | 'carb' | 'veggie' | 'other'
}

export async function searchUSDAFoods(query: string): Promise<FoodDetails[]> {
  const response = await fetch(
    `${BASE_URL}/foods/search?api_key=${API_KEY}&query=${encodeURIComponent(query)}&dataType=SR%20Legacy,Survey%20(FNDDS)`
  )
  const data = await response.json()
  
  return data.foods
    .filter((food: any) => !food.brandOwner)
    .map((food: any) => {
      const nutrition: Nutrition = {
        calories: food.foodNutrients.find((n: any) => n.nutrientName === 'Energy')?.value || 0,
        protein: food.foodNutrients.find((n: any) => n.nutrientName === 'Protein')?.value || 0,
        carbs: food.foodNutrients.find((n: any) => n.nutrientName === 'Carbohydrate, by difference')?.value || 0,
        fat: food.foodNutrients.find((n: any) => n.nutrientName === 'Total lipid (fat)')?.value || 0,
      }

      const serving = {
        amount: food.servingSize || 100,
        unit: food.servingSizeUnit || 'g'
      }

      return {
        id: food.fdcId,
        name: food.description,
        nutrition,
        serving,
        food_type: determineType(food.description)
      }
    })
}

// Helper function to determine food type based on description
function determineType(description: string): FoodDetails['food_type'] {
  const desc = description.toLowerCase()
  if (desc.includes('chicken') || desc.includes('beef') || desc.includes('fish') || desc.includes('pork')) {
    return 'protein'
  }
  if (desc.includes('rice') || desc.includes('bread') || desc.includes('pasta')) {
    return 'carb'
  }
  if (desc.includes('lettuce') || desc.includes('spinach') || desc.includes('broccoli')) {
    return 'veggie'
  }
  return 'other'
}