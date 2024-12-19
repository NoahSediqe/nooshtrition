import Link from 'next/link'
import { Home, Utensils, User, BarChart2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Utensils, label: 'Food Log', href: '/food-log' },
  { icon: BarChart2, label: 'Progress', href: '/progress' },
  { icon: User, label: 'Profile', href: '/profile' },
]

export function Sidebar() {
  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center justify-center h-16 bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">NooshTrition AI</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                "hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  )
}

