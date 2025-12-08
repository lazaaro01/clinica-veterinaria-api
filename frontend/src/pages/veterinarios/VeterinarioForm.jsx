import { useState } from 'react'
import { X, Stethoscope, Award, Briefcase, Phone } from 'lucide-react'
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

  const especialidades = [
    'Clínico Geral',
    'Cirurgião',
    'Dermatologista',
    'Cardiologista',
    'Ortopedista',
    'Oftalmologista',
    'Neurologista',
    'Oncologista',
    'Endocrinologista',
    'Nutricionista',
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-lg scale-in">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative px-6 py-5 bg-gradient-to-r from-purple-500 to-indigo-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur">
                  <Stethoscope className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Novo Veterinário</h2>
                  <p className="text-sm text-white/70">Adicione um profissional à equipe</p>
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
            <div className="space-y-2">
              <label htmlFor="nome" className="block text-sm font-semibold text-slate-700">
                Nome completo
              </label>
              <div className="relative">
                <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  placeholder="Dr(a). Nome Sobrenome"
                  className="input-premium pl-11"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="crmv" className="block text-sm font-semibold text-slate-700">
                  CRMV
                </label>
                <div className="relative">
                  <Award className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="crmv"
                    name="crmv"
                    type="text"
                    required
                    placeholder="CRMV-XX 00000"
                    className="input-premium pl-11"
                    value={formData.crmv}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="telefone" className="block text-sm font-semibold text-slate-700">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    required
                    placeholder="(00) 00000-0000"
                    className="input-premium pl-11"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="especialidade" className="block text-sm font-semibold text-slate-700">
                Especialidade
              </label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <select
                  id="especialidade"
                  name="especialidade"
                  required
                  className="input-premium pl-11 appearance-none"
                  value={formData.especialidade}
                  onChange={handleChange}
                >
                  <option value="">Selecione a especialidade</option>
                  {especialidades.map((esp) => (
                    <option key={esp} value={esp}>
                      {esp}
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
                  'Salvar Veterinário'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default VeterinarioForm