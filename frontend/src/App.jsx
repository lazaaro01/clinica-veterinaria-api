import { Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'

// Layouts
import MainLayout from '@/components/layout/MainLayout'

// Pages
import Dashboard from '@/pages/Dashboard'
import ClientesPage from '@/pages/clientes/ClientesPage'
import AnimaisPage from '@/pages/animais/AnimaisPage'
import VeterinariosPage from '@/pages/veterinarios/VeterinariosPage'
import ConsultasPage from '@/pages/consultas/ConsultasPage'
import NotFound from '@/pages/NotFound'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="animais" element={<AnimaisPage />} />
          <Route path="veterinarios" element={<VeterinariosPage />} />
          <Route path="consultas" element={<ConsultasPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App