"use client"

import { Menu, User, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/store/use-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export function Header() {
  const { toggle } = useSidebar()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check initial auth state
    checkAuth()

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session)
      if (event === 'SIGNED_OUT') {
        router.push('/login')
      }
    })

    // Cleanup subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setIsAuthenticated(!!session)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="md:hidden" onClick={toggle}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Sign out</span>
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  )
}

