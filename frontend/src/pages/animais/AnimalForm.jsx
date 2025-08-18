import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AnimalForm = ({ onClose, onSubmit, isLoading, clientes }) => {
  const [formData, setFormData] = useState({
    nome: '',
    especie: '',
    raca: '',
    idade: '',
    clienteId: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      idade: Number(formData.idade),
      cliente_id: Number(formData.clienteId), // <-- altere aqui!
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Novo Animal</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="mb-1 block text-sm font-medium">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="especie" className="mb-1 block text-sm font-medium">
              Espécie
            </label>
            <input
              id="especie"
              name="especie"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
              value={formData.especie}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="raca" className="mb-1 block text-sm font-medium">
              Raça
            </label>
            <input
              id="raca"
              name="raca"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
              value={formData.raca}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="idade" className="mb-1 block text-sm font-medium">
              Idade (anos)
            </label>
            <input
              id="idade"
              name="idade"
              type="number"
              min="0"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
              value={formData.idade}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="clienteId" className="mb-1 block text-sm font-medium">
              Proprietário
            </label>
            <select
              id="clienteId"
              name="clienteId"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
              value={formData.clienteId}
              onChange={handleChange}
            >
              <option value="">Selecione um proprietário</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AnimalForm