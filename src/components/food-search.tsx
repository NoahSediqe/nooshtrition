"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { FoodCard } from "@/components/food-card"
import { searchUSDAFoods, type FoodDetails } from "@/lib/usda-food-api"
import { useDebounce } from "@/lib/hooks/use-debounce"
import { useUnitTranslation } from "@/lib/hooks/use-unit-translation"

export function FoodSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<FoodDetails[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  const { convertWeight, getGramsFromServing, formatMeasurement } = useUnitTranslation('metric')

  const debouncedSearch = useDebounce(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    
    setIsLoading(true)
    try {
      const results = await searchUSDAFoods(query)
      setSearchResults(results.slice(0, 6)) // Show top 6 results
    } catch (error) {
      console.error('Error searching foods:', error)
    } finally {
      setIsLoading(false)
    }
  }, 300)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    debouncedSearch(searchTerm)
  }

  const processServing = (amount: number, unit: string) => {
    const grams = getGramsFromServing(amount, unit)
    return {
      original: formatMeasurement(amount, unit),
      grams: formatMeasurement(grams, 'g')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Food Search</CardTitle>
        <CardDescription>Search for foods to add to your meal log</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex space-x-2">
          <Input
            type="search"
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              debouncedSearch(e.target.value)
            }}
          />
          <Button type="submit" disabled={isLoading}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 pb-4">
            {isLoading ? (
              <div>Loading...</div>
            ) : searchResults.map((food) => (
              <FoodCard 
                key={food.id}
                name={food.name}
                serving={food.serving ? `${food.serving.amount} ${food.serving.unit}` : '100g'}
                calories={food.nutrition.calories}
                protein={food.nutrition.protein}
                carbs={food.nutrition.carbs}
                fat={food.nutrition.fat}
                onClick={() => {
                  // Handle food selection
                }}
              />
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

