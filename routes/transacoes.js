const express = require('express');
const router = express.Router();
const transacoesController = require('../controllers/transacoesController');

router.post('/', transacoesController.criarTransacao);
router.get('/', transacoesController.listarTransacoes);

module.exports = router;
