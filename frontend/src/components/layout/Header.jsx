import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Header = () => {
  const [notifications, setNotifications] = useState([])

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h1 className="text-xl font-semibold text-vet-primary">Clínica Veterinária</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-vet-primary text-white flex items-center justify-center">
            <span className="text-sm font-medium">AV</span>
          </div>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  )
}

export default Header