import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/30">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-8">
          <div className="fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout