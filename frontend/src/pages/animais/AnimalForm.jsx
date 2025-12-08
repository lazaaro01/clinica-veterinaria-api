import { useState } from 'react'
import { X, PawPrint, Dog, Hash, Calendar, User, Sparkles } from 'lucide-react'
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
      clienteId: Number(formData.clienteId),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-lg scale-in">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative px-6 py-5 bg-gradient-to-r from-emerald-500 to-teal-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur">
                  <PawPrint className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Novo Animal</h2>
                  <p className="text-sm text-white/70">Cadastre um novo paciente</p>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="nome" className="block text-sm font-semibold text-slate-700">
                  Nome do animal
                </label>
                <div className="relative">
                  <Dog className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    placeholder="Ex: Rex"
                    className="input-premium pl-11"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="especie" className="block text-sm font-semibold text-slate-700">
                  Espécie
                </label>
                <select
                  id="especie"
                  name="especie"
                  required
                  className="input-premium"
                  value={formData.especie}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                  <option value="Pássaro">Pássaro</option>
                  <option value="Coelho">Coelho</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="raca" className="block text-sm font-semibold text-slate-700">
                  Raça
                </label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="raca"
                    name="raca"
                    type="text"
                    required
                    placeholder="Ex: Labrador"
                    className="input-premium pl-11"
                    value={formData.raca}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="idade" className="block text-sm font-semibold text-slate-700">
                  Idade (anos)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="idade"
                    name="idade"
                    type="number"
                    min="0"
                    required
                    placeholder="Ex: 3"
                    className="input-premium pl-11"
                    value={formData.idade}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="clienteId" className="block text-sm font-semibold text-slate-700">
                Proprietário
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <select
                  id="clienteId"
                  name="clienteId"
                  required
                  className="input-premium pl-11 appearance-none"
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
                    Salvando...
                  </span>
                ) : (
                  'Salvar Animal'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AnimalForm