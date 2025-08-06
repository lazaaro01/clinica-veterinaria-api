import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md">
        <h1 className="mb-2 text-9xl font-bold text-vet-primary">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Página não encontrada</h2>
        <p className="mb-8 text-gray-600">
          A página que você está procurando não existe ou foi movida para outro endereço.
        </p>
        <Link to="/">
          <Button>
            <Home className="mr-2 h-4 w-4" /> Voltar para o início
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound