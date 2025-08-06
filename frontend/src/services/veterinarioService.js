import api from '@/lib/axios'

export const veterinarioService = {
  listarVeterinarios: async () => {
    const response = await api.get('/veterinarios')
    return response.data
  },
  
  criarVeterinario: async (veterinario) => {
    const response = await api.post('/veterinarios', veterinario)
    return response.data
  },
}