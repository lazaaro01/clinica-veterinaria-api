import { NavLink } from 'react-router-dom'
import { Home, Users, PawPrint, Stethoscope, Calendar } from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: <Home className="h-5 w-5" />, label: 'Dashboard' },
    { to: '/clientes', icon: <Users className="h-5 w-5" />, label: 'Clientes' },
    { to: '/animais', icon: <PawPrint className="h-5 w-5" />, label: 'Animais' },
    { to: '/veterinarios', icon: <Stethoscope className="h-5 w-5" />, label: 'Veterinários' },
    { to: '/consultas', icon: <Calendar className="h-5 w-5" />, label: 'Consultas' },
  ]

  return (
    <aside className="w-64 bg-white border-r">
      <div className="flex h-16 items-center justify-center border-b">
        <h2 className="text-xl font-bold text-vet-primary">Portal Vet</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-vet-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar