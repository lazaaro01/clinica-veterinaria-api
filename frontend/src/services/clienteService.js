import api from '@/lib/axios'

export const clienteService = {
  listarClientes: async () => {
    const response = await api.get('/clientes')
    return response.data
  },
  
  criarCliente: async (cliente) => {
    const response = await api.post('/clientes', cliente)
    return response.data
  },
}