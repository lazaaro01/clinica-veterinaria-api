import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Stethoscope, Phone, Award, Briefcase } from 'lucide-react'
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

  const specialtyColors = {
    'Clínico Geral': 'from-blue-500 to-cyan-500',
    'Cirurgião': 'from-red-500 to-rose-500',
    'Dermatologista': 'from-amber-500 to-orange-500',
    'Cardiologista': 'from-pink-500 to-rose-500',
    'Ortopedista': 'from-emerald-500 to-teal-500',
    'default': 'from-purple-500 to-indigo-500'
  }

  const getSpecialtyColor = (specialty) => {
    return specialtyColors[specialty] || specialtyColors['default']
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Veterinários</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gerencie a equipe de profissionais</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Veterinário
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Buscar veterinários por nome, CRMV ou especialidade..."
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
      ) : filteredVeterinarios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVeterinarios.map((veterinario, index) => {
            const initials = veterinario.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

            return (
              <div key={veterinario.id} className="card-premium p-6 group">
                <div className="flex items-start gap-4">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${getSpecialtyColor(veterinario.especialidade)} text-white font-bold text-lg shadow-lg dark:shadow-none group-hover:scale-110 transition-transform`}>
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 dark:text-white truncate">
                      Dr(a). {veterinario.nome}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="badge badge-success">
                        {veterinario.especialidade}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/50">
                      <Award className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <span>CRMV: <span className="font-medium">{veterinario.crmv}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/50">
                      <Phone className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <span>{veterinario.telefone}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="empty-state">
          <Stethoscope className="empty-state-icon" />
          <h3 className="empty-state-title">
            {searchTerm ? 'Nenhum veterinário encontrado' : 'Nenhum veterinário cadastrado'}
          </h3>
          <p className="empty-state-description">
            {searchTerm
              ? 'Tente ajustar os termos da sua busca.'
              : 'Comece adicionando o primeiro profissional à equipe.'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Adicionar Veterinário
            </button>
          )}
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