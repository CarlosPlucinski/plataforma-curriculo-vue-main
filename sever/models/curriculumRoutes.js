const express = require('express');
const router = express.Router();

// Importa as funções do nosso controller
const { 
  getCurriculum,
  createOrUpdateCurriculum,
  deleteCurriculum
} = require('../controller/curriculumController');

// Importa o middleware de autenticação
const { auth } = require('../controller/authController'); // Adapte o caminho se necessário

// --- DEFINIÇÃO DAS ROTAS ---

// GET /api/curriculum -> Busca o currículo do usuário logado.

router.get('/', auth, getCurriculum);

// POST /api/curriculum -> Cria (ou atualiza) o currículo.
router.post('/', auth, createOrUpdateCurriculum);

// DELETE /api/curriculum -> Deleta o currículo.
router.delete('/', auth, deleteCurriculum);

module.exports = router;