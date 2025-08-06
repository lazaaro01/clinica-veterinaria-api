import api from '@/lib/axios'

export const consultaService = {
  listarConsultas: async () => {
    const response = await api.get('/consultas')
    return response.data
  },
  
  agendarConsulta: async (consulta) => {
    const response = await api.post('/consultas', consulta)
    return response.data
  },
  
  cancelarConsulta: async (id) => {
    const response = await api.delete(`/consultas/${id}`)
    return response.data
  },
}