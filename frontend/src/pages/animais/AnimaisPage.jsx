import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search } from 'lucide-react'
import { animalService } from '@/services/animalService'
import { clienteService } from '@/services/clienteService'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import AnimalForm from './AnimalForm'

const AnimaisPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: animais = [], isLoading } = useQuery({
    queryKey: ['animais'],
    queryFn: animalService.listarAnimais,
  })

  const { data: clientes = [] } = useQuery({
    queryKey: ['clientes'],
    queryFn: clienteService.listarClientes,
  })

  const createMutation = useMutation({
    mutationFn: animalService.criarAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animais'] })
      setIsFormOpen(false)
      toast({
        title: 'Animal cadastrado',
        description: 'O animal foi cadastrado com sucesso!',
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao cadastrar',
        description: error.response?.data?.message || 'Ocorreu um erro ao cadastrar o animal.',
      })
    },
  })

  const handleSubmit = (data) => {
    createMutation.mutate(data)
  }

  const filteredAnimais = animais.filter((animal) =>
    animal.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.especie.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.raca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.cliente?.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Animais</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Novo Animal
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar animais..."
          className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <p>Carregando...</p>
        </div>
      ) : filteredAnimais.length > 0 ? (
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nome</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Espécie</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Raça</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Idade</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Proprietário</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredAnimais.map((animal) => (
                <tr key={animal.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{animal.nome}</td>
                  <td className="px-4 py-3 text-sm">{animal.especie}</td>
                  <td className="px-4 py-3 text-sm">{animal.raca}</td>
                  <td className="px-4 py-3 text-sm">{animal.idade} anos</td>
                  <td className="px-4 py-3 text-sm">{animal.cliente?.nome}</td>
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
                ? 'Nenhum animal encontrado com os termos da busca.'
                : 'Nenhum animal cadastrado ainda.'}
            </p>
            {!searchTerm && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsFormOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Adicionar Animal
              </Button>
            )}
          </div>
        </div>
      )}

      {isFormOpen && (
        <AnimalForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          clientes={clientes}
        />
      )}
    </div>
  )
}

export default AnimaisPage