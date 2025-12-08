import { NavLink } from 'react-router-dom'
import { Home, Users, PawPrint, Stethoscope, Calendar, Heart, Settings, HelpCircle } from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: <Home className="h-5 w-5" />, label: 'Dashboard' },
    { to: '/clientes', icon: <Users className="h-5 w-5" />, label: 'Clientes' },
    { to: '/animais', icon: <PawPrint className="h-5 w-5" />, label: 'Animais' },
    { to: '/veterinarios', icon: <Stethoscope className="h-5 w-5" />, label: 'Veterinários' },
    { to: '/consultas', icon: <Calendar className="h-5 w-5" />, label: 'Consultas' },
  ]

  return (
    <aside className="w-72 min-h-screen gradient-sidebar flex flex-col">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-6 h-20 border-b border-white/10">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary">
          <Heart className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Portal Vet</h2>
          <p className="text-xs text-slate-400">Sistema de Gestão</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Menu Principal
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="flex items-center justify-center w-8 h-8">
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
            AV
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin Vet</p>
            <p className="text-xs text-slate-400 truncate">admin@portalvet.com</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar