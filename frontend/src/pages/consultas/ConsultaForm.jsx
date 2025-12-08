import { useState, useEffect } from 'react'
import { X, Calendar, User, PawPrint, Stethoscope, FileText, Clock } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { clienteService } from '@/services/clienteService'
import { animalService } from '@/services/animalService'
import { veterinarioService } from '@/services/veterinarioService'

const ConsultaForm = ({ onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    data_hora: '',
    motivo: '',
    animal_id: '',
    veterinario_id: '',
    cliente_id: '',
  })
  const [selectedCliente, setSelectedCliente] = useState('')
  const [clienteAnimais, setClienteAnimais] = useState([])

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

  useEffect(() => {
    if (!selectedCliente) {
      setClienteAnimais([]);
      return;
    }

    const filteredAnimais = animais.filter(
      (animal) => String(animal.clienteId) === String(selectedCliente)
    );

    setClienteAnimais(filteredAnimais);
    setFormData((prev) => ({ ...prev, animal_id: '' }));

    const cliente = clientes.find(c => c.id === selectedCliente);
    if (cliente) {
      setFormData((prev) => ({ ...prev, clienteId: cliente.id }));
    }
  }, [selectedCliente, animais, clientes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClienteChange = (e) => {
    setSelectedCliente(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm overflow-y-auto py-8">
      <div className="w-full max-w-lg scale-in mx-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative px-6 py-5 bg-gradient-to-r from-amber-500 to-orange-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Nova Consulta</h2>
                  <p className="text-sm text-white/70">Agende um atendimento</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Date and Time */}
            <div className="space-y-2">
              <label htmlFor="data_hora" className="block text-sm font-semibold text-slate-700">
                Data e Hora
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="data_hora"
                  name="data_hora"
                  type="datetime-local"
                  required
                  min={getCurrentDateTime()}
                  className="input-premium pl-11"
                  value={formData.data_hora}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Cliente */}
            <div className="space-y-2">
              <label htmlFor="cliente" className="block text-sm font-semibold text-slate-700">
                Cliente
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <select
                  id="cliente"
                  name="cliente"
                  required
                  className="input-premium pl-11 appearance-none"
                  value={selectedCliente}
                  onChange={handleClienteChange}
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Animal */}
            <div className="space-y-2">
              <label htmlFor="animal_id" className="block text-sm font-semibold text-slate-700">
                Animal
              </label>
              <div className="relative">
                <PawPrint className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <select
                  id="animal_id"
                  name="animal_id"
                  required
                  disabled={!selectedCliente}
                  className="input-premium pl-11 appearance-none disabled:bg-slate-100 disabled:cursor-not-allowed"
                  value={formData.animal_id}
                  onChange={handleChange}
                >
                  <option value="">Selecione um animal</option>
                  {clienteAnimais.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.nome} ({animal.especie})
                    </option>
                  ))}
                </select>
              </div>
              {!selectedCliente && (
                <p className="text-xs text-amber-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-amber-500 rounded-full" />
                  Selecione um cliente primeiro
                </p>
              )}
            </div>

            {/* Veterinário */}
            <div className="space-y-2">
              <label htmlFor="veterinario_id" className="block text-sm font-semibold text-slate-700">
                Veterinário
              </label>
              <div className="relative">
                <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <select
                  id="veterinario_id"
                  name="veterinario_id"
                  required
                  className="input-premium pl-11 appearance-none"
                  value={formData.veterinario_id}
                  onChange={handleChange}
                >
                  <option value="">Selecione um veterinário</option>
                  {veterinarios.map((veterinario) => (
                    <option key={veterinario.id} value={veterinario.id}>
                      Dr(a). {veterinario.nome} - {veterinario.especialidade}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Motivo */}
            <div className="space-y-2">
              <label htmlFor="motivo" className="block text-sm font-semibold text-slate-700">
                Motivo da Consulta
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                <textarea
                  id="motivo"
                  name="motivo"
                  required
                  rows="3"
                  placeholder="Descreva o motivo da consulta..."
                  className="input-premium pl-11 resize-none"
                  value={formData.motivo}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Agendando...
                  </span>
                ) : (
                  'Agendar Consulta'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConsultaForm
