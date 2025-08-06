import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { clienteService } from '@/services/clienteService'
import { animalService } from '@/services/animalService'
import { veterinarioService } from '@/services/veterinarioService'
import { consultaService } from '@/services/consultaService'
import { Users, PawPrint, Stethoscope, Calendar } from 'lucide-react'

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-1 text-3xl font-semibold">{value}</h3>
        </div>
        <div className={`rounded-full p-3 ${color}`}>{icon}</div>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const { data: clientes = [] } = useQuery({
    queryKey: ['clientes'],
    queryFn: clienteService.listarClientes,
  })

  const { data: animais = [] } = useQuery({
    queryKey: ['animais'],
    queryFn: animalService.listarAnimais,
  })

  const { data: veterinarios = [] } = useQuery({
    queryKey: ['veterinarios'],
    queryFn: veterinarioService.listarVeterinarios,
  })

  const { data: consultas = [] } = useQuery({
    queryKey: ['consultas'],
    queryFn: consultaService.listarConsultas,
  })

  // Filtrar consultas para hoje
  const hoje = new Date().toISOString().split('T')[0]
  const consultasHoje = consultas.filter(consulta => {
    return consulta.data_hora.split('T')[0] === hoje
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Clientes"
          value={clientes.length}
          icon={<Users className="h-6 w-6 text-white" />}
          color="bg-vet-primary"
        />
        <StatCard
          title="Total de Animais"
          value={animais.length}
          icon={<PawPrint className="h-6 w-6 text-white" />}
          color="bg-vet-secondary"
        />
        <StatCard
          title="Veterinários"
          value={veterinarios.length}
          icon={<Stethoscope className="h-6 w-6 text-white" />}
          color="bg-vet-accent"
        />
        <StatCard
          title="Consultas Hoje"
          value={consultasHoje.length}
          icon={<Calendar className="h-6 w-6 text-white" />}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Consultas de Hoje</h2>
          {consultasHoje.length > 0 ? (
            <div className="space-y-4">
              {consultasHoje.map((consulta) => (
                <div key={consulta.id} className="rounded-md border p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">
                        {consulta.animal?.nome} ({consulta.animal?.cliente?.nome})
                      </p>
                      <p className="text-sm text-gray-500">
                        Veterinário: {consulta.veterinario?.nome}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      {new Date(consulta.data_hora).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Não há consultas agendadas para hoje.</p>
          )}
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Clientes Recentes</h2>
          {clientes.length > 0 ? (
            <div className="space-y-4">
              {clientes.slice(0, 5).map((cliente) => (
                <div key={cliente.id} className="rounded-md border p-4">
                  <p className="font-medium">{cliente.nome}</p>
                  <p className="text-sm text-gray-500">{cliente.telefone}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum cliente cadastrado.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard