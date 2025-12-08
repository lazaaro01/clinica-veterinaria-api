const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Animal = require('./Animal');
const Veterinario = require('./Veterinario');

const Consulta = sequelize.define('Consulta', {
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    horario: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

// Associações com aliases em minúsculo para compatibilidade com o frontend
Consulta.belongsTo(Animal, { as: 'animal', foreignKey: 'animalId', onDelete: 'CASCADE' });
Consulta.belongsTo(Veterinario, { as: 'veterinario', foreignKey: 'veterinarioId', onDelete: 'CASCADE' });
Animal.hasMany(Consulta, { foreignKey: 'animalId' });
Veterinario.hasMany(Consulta, { foreignKey: 'veterinarioId' });

module.exports = Consulta;