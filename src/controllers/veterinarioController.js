const Veterinario = require('../models/Veterinario');

module.exports = {
    async listarVeterinarios(req, res) {
        const veterinarios = await Veterinario.findAll();
        res.json(veterinarios);
    },

    async criarVeterinario(req, res) {
        try {
            const { nome, crmv, especialidade, telefone } = req.body;
            const novoVeterinario = await Veterinario.create({ nome, crmv, especialidade, telefone });
            res.status(201).json(novoVeterinario);
        } catch (error) {
            res.status(400).json({ erro: 'Erro ao cadastrar veterinário', detalhes: error.message });
        }
    }
};