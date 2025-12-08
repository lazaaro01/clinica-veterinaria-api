const Animal = require('../models/Animal');
const Cliente = require('../models/Cliente');

module.exports = {
  async listarAnimais(req, res) {
    const animais = await Animal.findAll({
      include: {
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nome', 'telefone', 'endereco']
      }
    });
    res.json(animais);
  },

  async criarAnimal(req, res) {
    try {
      const { nome, especie, raca, idade, clienteId } = req.body;

      const cliente = await Cliente.findByPk(clienteId);
      if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' });
      }

      const novoAnimal = await Animal.create({
        nome,
        especie,
        raca,
        idade,
        clienteId
      });

      res.status(201).json(novoAnimal);
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao cadastrar animal', detalhes: error.message });
    }
  }
};