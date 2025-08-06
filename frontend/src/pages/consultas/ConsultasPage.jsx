import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Calendar, X } from 'lucide-react'
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
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Consultas</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Nova Consulta
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar consultas..."
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null
                setSelectedDate(date)
              }}
            />
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
          {selectedDate && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedDate(null)}
              className="h-10 w-10"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <p>Carregando...</p>
        </div>
      ) : filteredConsultas.length > 0 ? (
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Data e Hora</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Animal</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Proprietário</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Veterinário</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredConsultas.map((consulta) => (
                <tr key={consulta.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    {format(new Date(consulta.data_hora), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm">{consulta.animal?.nome}</td>
                  <td className="px-4 py-3 text-sm">{consulta.animal?.cliente?.nome}</td>
                  <td className="px-4 py-3 text-sm">{consulta.veterinario?.nome}</td>
                  <td className="px-4 py-3 text-sm">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancel(consulta.id)}
                      disabled={cancelMutation.isPending}
                    >
                      Cancelar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center rounded-md border border-dashed p-8">
          <div className="text-center">
            <p className="text-gray-500">
              {searchTerm || selectedDate
                ? 'Nenhuma consulta encontrada com os filtros aplicados.'
                : 'Nenhuma consulta agendada ainda.'}
            </p>
            {!searchTerm && !selectedDate && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsFormOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Agendar Consulta
              </Button>
            )}
          </div>
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