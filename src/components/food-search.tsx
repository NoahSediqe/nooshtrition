"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FoodCard } from "@/components/food-card"

const mockFoods = [
  { name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: "Brown Rice", calories: 216, protein: 5, carbs: 45, fat: 1.6 },
]

export function FoodSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState(mockFoods)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would fetch results from an API here
    setSearchResults(mockFoods.filter(food => 
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((food, index) => (
            <FoodCard key={index} {...food} />
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

