import api from '@/lib/axios'

export const consultaService = {
  listarConsultas: async () => {
    const response = await api.get('/consultas')
    return response.data
  },
  
  agendarConsulta: async (consulta) => {
    // Log para verificar os dados antes de enviar para a API
    console.log('Agendando consulta com os seguintes dados:', consulta);

    const response = await api.post('/consultas', consulta)
    
    // Log para verificar a resposta da API
    console.log('Resposta da API após agendar consulta:', response.data);
    
    return response.data
  },
  
  cancelarConsulta: async (id) => {
    const response = await api.delete(`/consultas/${id}`)
    return response.data
  },
}
