import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search } from 'lucide-react'
import { veterinarioService } from '@/services/veterinarioService'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import VeterinarioForm from './VeterinarioForm'

const VeterinariosPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: veterinarios = [], isLoading } = useQuery({
    queryKey: ['veterinarios'],
    queryFn: veterinarioService.listarVeterinarios,
  })

  const createMutation = useMutation({
    mutationFn: veterinarioService.criarVeterinario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['veterinarios'] })
      setIsFormOpen(false)
      toast({
        title: 'Veterinário cadastrado',
        description: 'O veterinário foi cadastrado com sucesso!',
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao cadastrar',
        description: error.response?.data?.message || 'Ocorreu um erro ao cadastrar o veterinário.',
      })
    },
  })

  const handleSubmit = (data) => {
    createMutation.mutate(data)
  }

  const filteredVeterinarios = veterinarios.filter((veterinario) =>
    veterinario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veterinario.especialidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veterinario.crmv.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Veterinários</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Novo Veterinário
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar veterinários..."
          className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <p>Carregando...</p>
        </div>
      ) : filteredVeterinarios.length > 0 ? (
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nome</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">CRMV</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Especialidade</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Telefone</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredVeterinarios.map((veterinario) => (
                <tr key={veterinario.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{veterinario.nome}</td>
                  <td className="px-4 py-3 text-sm">{veterinario.crmv}</td>
                  <td className="px-4 py-3 text-sm">{veterinario.especialidade}</td>
                  <td className="px-4 py-3 text-sm">{veterinario.telefone}</td>
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
                ? 'Nenhum veterinário encontrado com os termos da busca.'
                : 'Nenhum veterinário cadastrado ainda.'}
            </p>
            {!searchTerm && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsFormOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Adicionar Veterinário
              </Button>
            )}
          </div>
        </div>
      )}

      {isFormOpen && (
        <VeterinarioForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
        />
      )}
    </div>
  )
}

export default VeterinariosPage