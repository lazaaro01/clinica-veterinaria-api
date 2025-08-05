const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

router.get('/', consultaController.listarConsultas);
router.post('/', consultaController.agendarConsulta);
router.delete('/:id', consultaController.cancelarConsulta);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gerenciamento de clientes
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */

