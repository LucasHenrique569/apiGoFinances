const express = require('express');
const router = express.Router();
const transacoesController = require('../controllers/transacoesController');

router.post('/', transacoesController.criarTransacao);
router.get('/', transacoesController.listarTransacoes);

router.get('/entradas', transacoesController.obterValorTotalDeTransacoesDeEntradaDoMesEAnoAtuais);
router.get('/saidas', transacoesController.obterValorTotalDeTransacoesDeSaidaDoMesEAnoAtuais);
router.get('/entradas/data', transacoesController.obterDataDaTransacaoDeEntradaMaisRecente);
router.get('/saidas/data', transacoesController.obterDataDaTransacaoDeSaidaMaisRecente);

router.get('/resumo', transacoesController.obterTotalDeEntradasPorCategoria);

module.exports = router;
