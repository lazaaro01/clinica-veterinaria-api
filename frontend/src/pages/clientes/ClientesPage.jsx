import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search } from 'lucide-react'
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Novo Cliente
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar clientes..."
          className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <p>Carregando...</p>
        </div>
      ) : filteredClientes.length > 0 ? (
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nome</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Telefone</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Endereço</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{cliente.nome}</td>
                  <td className="px-4 py-3 text-sm">{cliente.email}</td>
                  <td className="px-4 py-3 text-sm">{cliente.telefone}</td>
                  <td className="px-4 py-3 text-sm">{cliente.endereco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center rounded-md border border-dashed p-8">
          <div className="text-center">
            <p className="text-gray-500">
              {searchTerm
                ? 'Nenhum cliente encontrado com os termos da busca.'
                : 'Nenhum cliente cadastrado ainda.'}
            </p>
            {!searchTerm && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsFormOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Adicionar Cliente
              </Button>
            )}
          </div>
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