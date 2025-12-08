import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Users, Mail, Phone, MapPin } from 'lucide-react'
import { clienteService } from '@/services/clienteService'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import ClienteForm from './ClienteForm'

const ClientesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: clientes = [], isLoading } = useQuery({
    queryKey: ['clientes'],
    queryFn: clienteService.listarClientes,
  })

  const createMutation = useMutation({
    mutationFn: clienteService.criarCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
      setIsFormOpen(false)
      toast({
        title: 'Cliente cadastrado',
        description: 'O cliente foi cadastrado com sucesso!',
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao cadastrar',
        description: error.response?.data?.message || 'Ocorreu um erro ao cadastrar o cliente.',
      })
    },
  })

  const handleSubmit = (data) => {
    createMutation.mutate(data)
  }

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm)
  )

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Clientes</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gerencie os clientes da sua clínica</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Cliente
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Buscar clientes por nome, email ou telefone..."
          className="input-premium pl-11"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="spinner" />
        </div>
      ) : filteredClientes.length > 0 ? (
        <div className="card-premium overflow-hidden">
          <table className="table-premium">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Endereço</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente, index) => {
                const colors = [
                  'from-blue-500 to-cyan-500',
                  'from-purple-500 to-pink-500',
                  'from-emerald-500 to-teal-500',
                  'from-orange-500 to-amber-500',
                  'from-rose-500 to-red-500',
                ]
                const initials = cliente.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

                return (
                  <tr key={cliente.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${colors[index % colors.length]} text-white font-semibold text-sm shadow-lg dark:shadow-none`}>
                          {initials}
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-200">{cliente.nome}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Mail className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                        {cliente.email}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Phone className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                        {cliente.telefone}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                        <span className="truncate max-w-[200px]">{cliente.endereco}</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <Users className="empty-state-icon" />
          <h3 className="empty-state-title">
            {searchTerm ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
          </h3>
          <p className="empty-state-description">
            {searchTerm
              ? 'Tente ajustar os termos da sua busca.'
              : 'Comece adicionando seu primeiro cliente à clínica.'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Adicionar Cliente
            </button>
          )}
        </div>
      )}

      {isFormOpen && (
        <ClienteForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
        />
      )}
    </div>
  )
}

export default ClientesPage