const Consulta = require('../models/Consulta');
const Animal = require('../models/Animal');
const Veterinario = require('../models/Veterinario');
const Cliente = require('../models/Cliente');

module.exports = {
  async listarConsultas(req, res) {
    try {
      const consultas = await Consulta.findAll({
        include: [
          {
            model: Animal,
            as: 'animal',
            attributes: ['id', 'nome', 'especie'],
            include: [
              {
                model: Cliente,
                as: 'cliente',
                attributes: ['id', 'nome']
              }
            ]
          },
          {
            model: Veterinario,
            as: 'veterinario',
            attributes: ['id', 'nome', 'especialidade']
          }
        ],
        order: [['data', 'ASC'], ['horario', 'ASC']]
      });

      // Formatar os dados para o frontend
      const consultasFormatadas = consultas.map(consulta => {
        const consultaJson = consulta.toJSON();
        // Combinar data e horario em data_hora para o frontend
        if (consultaJson.data && consultaJson.horario) {
          consultaJson.data_hora = `${consultaJson.data}T${consultaJson.horario}:00`;
        }
        // Renomear observacoes para motivo para compatibilidade
        consultaJson.motivo = consultaJson.observacoes;
        return consultaJson;
      });

      res.json(consultasFormatadas);
    } catch (error) {
      console.error('Erro ao listar consultas:', error);
      res.status(500).json({ erro: 'Erro ao listar consultas', detalhes: error.message });
    }
  },

  async agendarConsulta(req, res) {
    try {
      // Aceitar campos do frontend (data_hora, animal_id, veterinario_id, motivo)
      // e convertê-los para o formato do modelo
      const {
        data_hora,
        animal_id,
        veterinario_id,
        motivo,
        // Também aceitar campos no formato antigo para compatibilidade
        data: dataLegacy,
        horario: horarioLegacy,
        animalId: animalIdLegacy,
        veterinarioId: veterinarioIdLegacy,
        observacoes: observacoesLegacy
      } = req.body;

      // Determinar os valores finais (dar prioridade ao formato do frontend)
      let data, horario, animalId, veterinarioId, observacoes;

      if (data_hora) {
        // Converter datetime-local para data e horário separados
        // Usar split direto na string para evitar problemas de timezone
        // O formato do datetime-local é: "YYYY-MM-DDTHH:mm"
        const parts = data_hora.split('T');
        data = parts[0]; // YYYY-MM-DD
        horario = parts[1] ? parts[1].slice(0, 5) : '00:00'; // HH:mm
      } else {
        data = dataLegacy;
        horario = horarioLegacy;
      }

      animalId = animal_id || animalIdLegacy;
      veterinarioId = veterinario_id || veterinarioIdLegacy;
      observacoes = motivo || observacoesLegacy || '';

      // Validar campos obrigatórios
      if (!data || !horario || !animalId || !veterinarioId) {
        return res.status(400).json({
          erro: 'Campos obrigatórios faltando',
          detalhes: 'data_hora, animal_id e veterinario_id são obrigatórios'
        });
      }

      // Verificar conflito de horário
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
      console.error('Erro ao agendar consulta:', error);
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