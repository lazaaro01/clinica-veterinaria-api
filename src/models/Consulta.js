const { DataTypes} = require('sequelize');
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

Consulta.belongsTo(Animal, { foreignKey: 'animalId', onDelete: 'CASCADE' });
Consulta.belongsTo(Veterinario, { foreignKey: 'veterinarioId', onDelete: 'CASCADE' });
Animal.hasMany(Consulta, { foreignKey: 'animalId' });
Veterinario.hasMany(Consulta, { foreignKey: 'veterinarioId' });

module.exports = Consulta;