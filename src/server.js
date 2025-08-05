require('dotenv').config();
const express = require('express');
const app = express(); 
const sequelize = require('./config/database');

app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swaggerConfig');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const clienteRoutes = require('./routes/clienteRoutes');
const veterinarioRoutes = require('./routes/veterinarioRoutes');
const animalRoutes = require('./routes/animalRoutes');
const consultaRoutes = require('./routes/consultaRoutes');

app.use('/clientes', clienteRoutes);
app.use('/veterinarios', veterinarioRoutes);
app.use('/animais', animalRoutes);
app.use('/consultas', consultaRoutes);

sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao banco PostgreSQL com sucesso!'))
  .catch((err) => console.error('❌ Erro ao conectar no banco:', err));

// Sincronizar modelos (opcional: usar { force: true } para recriar tabelas)
sequelize.sync().then(() => {
  console.log('📦 Modelos sincronizados com o banco de dados');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
