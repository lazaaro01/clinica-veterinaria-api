const { DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');

const Animal = sequelize.define('Animal', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    especie: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    raca: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

Animal.belongsTo(Cliente, {foreignKey: 'clienteId', onDelete: 'CASCADE'});
Cliente.hasMany(Animal, {foreignKey: 'clienteId'});

module.exports = Animal;