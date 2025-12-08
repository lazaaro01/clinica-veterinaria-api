import { useQuery } from '@tanstack/react-query'
import { clienteService } from '@/services/clienteService'
import { animalService } from '@/services/animalService'
import { veterinarioService } from '@/services/veterinarioService'
import { consultaService } from '@/services/consultaService'
import { Users, PawPrint, Stethoscope, Calendar, TrendingUp, Clock, Activity, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const StatCard = ({ title, value, icon, gradient, iconBg, trend }) => {
  return (
    <div className={`stat-card ${gradient}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-bold text-slate-800 tracking-tight">{value}</h3>
            {trend && (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                <TrendingUp className="h-3 w-3" />
                {trend}
              </span>
            )}
          </div>
        </div>
        <div className={`icon-container ${iconBg}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

const ConsultaCard = ({ consulta }) => {
  const time = format(new Date(consulta.data_hora), "HH:mm", { locale: ptBR })

  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 font-semibold text-sm group-hover:bg-blue-500 group-hover:text-white transition-colors">
        {time}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-700 truncate">
          {consulta.animal?.nome}
        </p>
        <p className="text-sm text-slate-500 truncate">
          {consulta.animal?.cliente?.nome}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-slate-600">
          Dr. {consulta.veterinario?.nome?.split(' ')[0]}
        </p>
        <p className="text-xs text-slate-400">Veterinário</p>
      </div>
      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
    </div>
  )
}

const ClienteCard = ({ cliente, index }) => {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-amber-500',
    'from-rose-500 to-red-500',
  ]
  const initials = cliente.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-300 cursor-pointer">
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index % colors.length]} text-white font-semibold text-sm shadow-lg shadow-slate-200`}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-700 truncate group-hover:text-slate-900 transition-colors">
          {cliente.nome}
        </p>
        <p className="text-sm text-slate-500 truncate">
          {cliente.email}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
          {cliente.telefone}
        </p>
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
  }).sort((a, b) => new Date(a.data_hora) - new Date(b.data_hora))

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1">Bem-vindo ao seu painel de controle</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
          <Clock className="h-4 w-4" />
          <span>{format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Clientes"
          value={clientes.length}
          icon={<Users className="h-6 w-6 text-white" />}
          gradient="primary"
          iconBg="gradient-primary"
          trend="+12%"
        />
        <StatCard
          title="Total de Animais"
          value={animais.length}
          icon={<PawPrint className="h-6 w-6 text-white" />}
          gradient="secondary"
          iconBg="gradient-secondary"
          trend="+8%"
        />
        <StatCard
          title="Veterinários"
          value={veterinarios.length}
          icon={<Stethoscope className="h-6 w-6 text-white" />}
          gradient="accent"
          iconBg="gradient-accent"
        />
        <StatCard
          title="Consultas Hoje"
          value={consultasHoje.length}
          icon={<Calendar className="h-6 w-6 text-white" />}
          gradient="warm"
          iconBg="gradient-warm"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Today's Appointments */}
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Consultas de Hoje</h2>
                <p className="text-sm text-slate-500">{consultasHoje.length} agendamentos</p>
              </div>
            </div>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Ver todas
            </button>
          </div>

          {consultasHoje.length > 0 ? (
            <div className="space-y-3">
              {consultasHoje.slice(0, 4).map((consulta) => (
                <ConsultaCard key={consulta.id} consulta={consulta} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-slate-600 font-medium">Nenhuma consulta hoje</p>
              <p className="text-sm text-slate-400 mt-1">Aproveite para organizar sua agenda</p>
            </div>
          )}
        </div>

        {/* Recent Clients */}
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Clientes Recentes</h2>
                <p className="text-sm text-slate-500">{clientes.length} cadastrados</p>
              </div>
            </div>
            <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
              Ver todos
            </button>
          </div>

          {clientes.length > 0 ? (
            <div className="space-y-2">
              {clientes.slice(0, 5).map((cliente, index) => (
                <ClienteCard key={cliente.id} cliente={cliente} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <Users className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-slate-600 font-medium">Nenhum cliente cadastrado</p>
              <p className="text-sm text-slate-400 mt-1">Comece adicionando seu primeiro cliente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard