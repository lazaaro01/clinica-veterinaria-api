import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const VeterinarioForm = ({ onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    nome: '',
    crmv: '',
    especialidade: '',
    telefone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Novo Veterinário</h2>
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
            <label htmlFor="crmv" className="mb-1 block text-sm font-medium">
              CRMV
            </label>
            <input
              id="crmv"
              name="crmv"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
              value={formData.crmv}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="especialidade" className="mb-1 block text-sm font-medium">
              Especialidade
            </label>
            <input
              id="especialidade"
              name="especialidade"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
              value={formData.especialidade}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="telefone" className="mb-1 block text-sm font-medium">
              Telefone
            </label>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-vet-primary focus:outline-none focus:ring-1 focus:ring-vet-primary"
              value={formData.telefone}
              onChange={handleChange}
            />
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

export default VeterinarioForm