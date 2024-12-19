"use client"

import { Menu, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/store/use-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"

export function Header() {
  const { toggle } = useSidebar()

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background">
      <Button variant="ghost" className="md:hidden" onClick={toggle}>
        <Menu className="h-6 w-6" />
      </Button>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </header>
  )
}

