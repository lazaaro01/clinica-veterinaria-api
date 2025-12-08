import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Calendar, X, Clock, User, Stethoscope, PawPrint, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { consultaService } from '@/services/consultaService'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import ConsultaForm from './ConsultaForm'

const ConsultasPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: consultas = [], isLoading } = useQuery({
    queryKey: ['consultas'],
    queryFn: consultaService.listarConsultas,
  })

  const createMutation = useMutation({
    mutationFn: consultaService.agendarConsulta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultas'] })
      setIsFormOpen(false)
      toast({
        title: 'Consulta agendada',
        description: 'A consulta foi agendada com sucesso!',
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao agendar',
        description: error.response?.data?.message || 'Ocorreu um erro ao agendar a consulta.',
      })
    },
  })

  const cancelMutation = useMutation({
    mutationFn: consultaService.cancelarConsulta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultas'] })
      toast({
        title: 'Consulta cancelada',
        description: 'A consulta foi cancelada com sucesso!',
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao cancelar',
        description: error.response?.data?.message || 'Ocorreu um erro ao cancelar a consulta.',
      })
    },
  })

  const handleSubmit = (data) => {
    createMutation.mutate(data)
  }

  const handleCancel = (id) => {
    if (window.confirm('Tem certeza que deseja cancelar esta consulta?')) {
      cancelMutation.mutate(id)
    }
  }

  const filteredConsultas = consultas.filter((consulta) => {
    const matchesSearch =
      consulta.animal?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.animal?.cliente?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.veterinario?.nome.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedDate) {
      const consultaDate = new Date(consulta.data_hora).toISOString().split('T')[0]
      const filterDate = selectedDate.toISOString().split('T')[0]
      return matchesSearch && consultaDate === filterDate
    }

    return matchesSearch
  }).sort((a, b) => new Date(a.data_hora) - new Date(b.data_hora))

  const isToday = (date) => {
    const today = new Date().toISOString().split('T')[0]
    const consultaDate = new Date(date).toISOString().split('T')[0]
    return today === consultaDate
  }

  const isPast = (date) => {
    return new Date(date) < new Date()
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Consultas</h1>
          <p className="text-slate-500 mt-1">Gerencie os agendamentos da clínica</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nova Consulta
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por animal, proprietário ou veterinário..."
            className="input-premium pl-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="date"
              className="input-premium pl-11 w-48"
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null
                setSelectedDate(date)
              }}
            />
          </div>
          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="spinner" />
        </div>
      ) : filteredConsultas.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredConsultas.map((consulta) => {
            const consultaDate = new Date(consulta.data_hora)
            const today = isToday(consulta.data_hora)
            const past = isPast(consulta.data_hora)

            return (
              <div
                key={consulta.id}
                className={`card-premium p-5 flex items-center gap-6 ${past && !today ? 'opacity-60' : ''}`}
              >
                {/* Time Block */}
                <div className={`flex flex-col items-center justify-center w-20 h-20 rounded-xl text-white ${today ? 'gradient-primary' : past ? 'bg-slate-400' : 'gradient-secondary'}`}>
                  <span className="text-2xl font-bold">
                    {format(consultaDate, "HH:mm")}
                  </span>
                  <span className="text-xs opacity-80">
                    {format(consultaDate, "dd/MM")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Animal */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100">
                      <PawPrint className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Animal</p>
                      <p className="font-semibold text-slate-700">{consulta.animal?.nome}</p>
                    </div>
                  </div>

                  {/* Owner */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Proprietário</p>
                      <p className="font-semibold text-slate-700">{consulta.animal?.cliente?.nome}</p>
                    </div>
                  </div>

                  {/* Vet */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100">
                      <Stethoscope className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Veterinário</p>
                      <p className="font-semibold text-slate-700">Dr(a). {consulta.veterinario?.nome}</p>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-3">
                  {today && (
                    <span className="badge badge-warning flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Hoje
                    </span>
                  )}
                  {!past && (
                    <button
                      onClick={() => handleCancel(consulta.id)}
                      disabled={cancelMutation.isPending}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      <AlertCircle className="h-4 w-4" />
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="empty-state">
          <Calendar className="empty-state-icon" />
          <h3 className="empty-state-title">
            {searchTerm || selectedDate ? 'Nenhuma consulta encontrada' : 'Nenhuma consulta agendada'}
          </h3>
          <p className="empty-state-description">
            {searchTerm || selectedDate
              ? 'Tente ajustar os filtros da sua busca.'
              : 'Comece agendando a primeira consulta.'}
          </p>
          {!searchTerm && !selectedDate && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agendar Consulta
            </button>
          )}
        </div>
      )}

      {isFormOpen && (
        <ConsultaForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
        />
      )}
    </div>
  )
}

export default ConsultasPage