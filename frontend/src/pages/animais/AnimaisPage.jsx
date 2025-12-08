import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, PawPrint, Dog, Cat, User } from 'lucide-react'
import { animalService } from '@/services/animalService'
import { clienteService } from '@/services/clienteService'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import AnimalForm from './AnimalForm'

const getAnimalIcon = (especie) => {
  const esp = especie?.toLowerCase() || ''
  if (esp.includes('cachorro') || esp.includes('cão') || esp.includes('dog')) {
    return <Dog className="h-5 w-5" />
  }
  if (esp.includes('gato') || esp.includes('cat')) {
    return <Cat className="h-5 w-5" />
  }
  return <PawPrint className="h-5 w-5" />
}

const getAnimalColor = (especie) => {
  const esp = especie?.toLowerCase() || ''
  if (esp.includes('cachorro') || esp.includes('cão') || esp.includes('dog')) {
    return 'from-amber-500 to-orange-500'
  }
  if (esp.includes('gato') || esp.includes('cat')) {
    return 'from-purple-500 to-pink-500'
  }
  return 'from-emerald-500 to-teal-500'
}

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
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Animais</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gerencie os pacientes da sua clínica</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Animal
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Buscar animais por nome, espécie ou proprietário..."
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
      ) : filteredAnimais.length > 0 ? (
        <div className="card-premium overflow-hidden">
          <table className="table-premium">
            <thead>
              <tr>
                <th>Animal</th>
                <th>Espécie</th>
                <th>Raça</th>
                <th>Idade</th>
                <th>Proprietário</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnimais.map((animal) => (
                <tr key={animal.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${getAnimalColor(animal.especie)} text-white shadow-lg dark:shadow-none`}>
                        {getAnimalIcon(animal.especie)}
                      </div>
                      <span className="font-medium text-slate-700 dark:text-slate-200">{animal.nome}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary">
                      {animal.especie}
                    </span>
                  </td>
                  <td>
                    <span className="text-slate-600 dark:text-slate-300">{animal.raca}</span>
                  </td>
                  <td>
                    <span className="text-slate-600 dark:text-slate-300">
                      {animal.idade} {animal.idade === 1 ? 'ano' : 'anos'}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <User className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                      {animal.cliente?.nome}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <PawPrint className="empty-state-icon" />
          <h3 className="empty-state-title">
            {searchTerm ? 'Nenhum animal encontrado' : 'Nenhum animal cadastrado'}
          </h3>
          <p className="empty-state-description">
            {searchTerm
              ? 'Tente ajustar os termos da sua busca.'
              : 'Comece adicionando o primeiro paciente à clínica.'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Adicionar Animal
            </button>
          )}
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