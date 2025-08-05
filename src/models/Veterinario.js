const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Veterinario = sequelize.define('Veterinario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    crmv: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    especialidade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Veterinario;