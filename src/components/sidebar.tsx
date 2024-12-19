"use client"

import Link from 'next/link'
import { Home, Utensils, User, BarChart2, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/store/use-sidebar"
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/food-log', label: 'Food Log', icon: Utensils },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggle } = useSidebar()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-card text-card-foreground border-r">
        <div className="p-4">
          <h1 className="text-2xl font-bold">NooshTrition AI</h1>
        </div>
        <SidebarContent pathname={pathname} />
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 md:hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}>
        {/* Backdrop */}
        <div 
          className={cn(
            "fixed inset-0 bg-background/80 backdrop-blur-sm",
            isOpen ? "opacity-100" : "opacity-0"
          )} 
          onClick={toggle} 
        />
        
        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold">NooshTrition AI</h1>
            <Button variant="ghost" size="icon" onClick={toggle}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <SidebarContent pathname={pathname} />
        </div>
      </div>
    </>
  )
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <nav className="flex-1 p-4">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Button
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === item.href && "bg-accent text-accent-foreground"
              )}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

