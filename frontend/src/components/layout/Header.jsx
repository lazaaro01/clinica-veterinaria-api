import { useState } from 'react'
import { Bell, Search, Sun, Moon, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'

const Header = ({ onToggleSidebar }) => {
  const [notifications] = useState([])
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-10 h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700/50 transition-colors duration-300">
      <div className="flex items-center justify-between h-full px-4 md:px-8">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </Button>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Pesquisar clientes, animais, consultas..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-700 transition-all duration-300"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={toggleTheme}
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            {notifications.length > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 pulse-dot" />
            )}
          </Button>

          {/* Divider */}
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />

          {/* User Profile */}
          <button className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-blue-500/25">
                AV
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                Admin
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Administrador</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
