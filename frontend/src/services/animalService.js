import api from '@/lib/axios'

export const animalService = {
  listarAnimais: async () => {
    const response = await api.get('/animais')
    return response.data
  },
  
  criarAnimal: async (animal) => {
    const response = await api.post('/animais', animal)
    return response.data
  },
}