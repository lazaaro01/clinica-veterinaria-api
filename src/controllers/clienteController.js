const Cliente = require('../models/Cliente');

module.exports = {
  async listarClientes(req, res) {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  },

  async criarCliente(req, res) {
    try {
      const { nome, telefone, email, endereco } = req.body;
      const novoCliente = await Cliente.create({ nome, telefone, email, endereco });
      res.status(201).json(novoCliente);
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao cadastrar cliente', detalhes: error.message });
    }
  }
};
