import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center scale-in">
        {/* Large 404 */}
        <div className="relative mb-8">
          <h1 className="text-[180px] font-black text-slate-100 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-blue-500/25">
              <Search className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Página não encontrada</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Oops! Parece que a página que você está procurando não existe ou foi movida para outro endereço.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-300 hover:-translate-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <Link
            to="/"
            className="btn-primary flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Ir para Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound