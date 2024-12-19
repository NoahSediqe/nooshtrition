"use client"

import { Bell, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 border-b">
      <div className="flex items-center">
        <Button variant="outline" size="icon" className="mr-2 md:hidden">
          <Search className="h-4 w-4" />
        </Button>
        <Input
          type="search"
          placeholder="Search foods..."
          className="w-64 hidden md:block"
        />
      </div>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}

