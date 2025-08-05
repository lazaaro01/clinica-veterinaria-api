const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Clínica Veterinária',
        version: '1.0.0',
        description: 'Documentação da API de uma clínica veterinária usando Node.js, Express e Sequelize',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor de local'
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js', './src/models/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;