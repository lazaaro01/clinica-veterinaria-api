import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
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
    if(selectedCliente) {
      const filteredAnimais = animais.filter(
        (animal) => String(animal.clienteId) === String(selectedCliente)
      )
      setClienteAnimais(filteredAnimais)
      setFormData((prev) => ({...prev, animal_id: ''}))
    } else {
      setClienteAnimais([])
    }
  }, [selectedCliente, animais])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleClienteChange = (e) => {
    setSelectedCliente(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const getCurrentDateTime = () => {
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    return now.toISOString().slice(0, 16)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Nova Consulta</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="data_hora" className="mb-1 block text-sm font-medium">
              Data e Hora
            </label>
            <input
              id="data_hora"
              name="data_hora"
              type="datetime-local"
              required
              min={getCurrentDateTime()}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
              value={formData.data_hora}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="cliente" className="mb-1 block text-sm font-medium">
              Cliente
            </label>
            <select
              id="cliente"
              name="cliente"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
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

          <div>
            <label htmlFor="animal_id" className="mb-1 block text-sm font-medium">
              Animal
            </label>
            <select
              id="animal_id"
              name="animal_id"
              required
              disabled={!selectedCliente}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary disabled:bg-gray-100 disabled:opacity-70"
              value={formData.animal_id}
              onChange={handleChange}
            >
              <option value="">Selecione um animal</option>
              {clienteAnimais.map((animal) => (
                <option key={animal.id} value={animal.id}>
                  {animal.nome} ({animal.especie}) - {animal.Cliente ? animal.Cliente.nome : 'Proprietário não encontrado'}
                </option>
              ))}
            </select>
            {!selectedCliente && (
              <p className="mt-1 text-xs text-gray-500">Selecione um cliente primeiro</p>
            )}
          </div>

          <div>
            <label htmlFor="veterinario_id" className="mb-1 block text-sm font-medium">
              Veterinário
            </label>
            <select
              id="veterinario_id"
              name="veterinario_id"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
              value={formData.veterinario_id}
              onChange={handleChange}
            >
              <option value="">Selecione um veterinário</option>
              {veterinarios.map((veterinario) => (
                <option key={veterinario.id} value={veterinario.id}>
                  {veterinario.nome} - {veterinario.especialidade}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="motivo" className="mb-1 block text-sm font-medium">
              Motivo da Consulta
            </label>
            <textarea
              id="motivo"
              name="motivo"
              required
              rows="3"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
              value={formData.motivo}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Agendando...' : 'Agendar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConsultaForm