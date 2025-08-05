const Consulta = require('../models/Consulta');
const Animal = require('../models/Animal');
const Veterinario = require('../models/Veterinario');

module.exports = {
  async listarConsultas(req, res) {
    const consultas = await Consulta.findAll({
      include: [
        {
          model: Animal,
          attributes: ['id', 'nome']
        },
        {
          model: Veterinario,
          attributes: ['id', 'nome']
        }
      ],
      order: [['data', 'ASC'], ['horario', 'ASC']]
    });
    res.json(consultas);
  },

  async agendarConsulta(req, res) {
    try {
      const { data, horario, observacoes, animalId, veterinarioId } = req.body;

      const conflito = await Consulta.findOne({
        where: { data, horario, veterinarioId }
      });

      if (conflito) {
        return res.status(400).json({ erro: 'Veterinário já possui consulta nesse horário.' });
      }

      const novaConsulta = await Consulta.create({
        data,
        horario,
        observacoes,
        animalId,
        veterinarioId
      });

      res.status(201).json(novaConsulta);
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao agendar consulta', detalhes: error.message });
    }
  },

  async cancelarConsulta(req, res) {
    try {
      const { id } = req.params;
      const consulta = await Consulta.findByPk(id);

      if (!consulta) {
        return res.status(404).json({ erro: 'Consulta não encontrada' });
      }

      await consulta.destroy();
      res.status(200).json({ mensagem: 'Consulta cancelada com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao cancelar consulta' });
    }
  }
};