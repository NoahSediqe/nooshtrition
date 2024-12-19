import Link from 'next/link'
import { Home, Utensils, User, BarChart2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/food-log', label: 'Food Log', icon: Utensils },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
]

export function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 bg-card text-card-foreground border-r">
      <div className="p-4">
        <h1 className="text-2xl font-bold">NooshTrition AI</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  item.href === '/' && "bg-accent text-accent-foreground"
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
    </div>
  )
}

