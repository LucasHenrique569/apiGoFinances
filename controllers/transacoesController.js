const db = require('../db');

exports.criarTransacao = async (req, res) => {
    const { titulo, valor, tipo_da_transacao, categoria} = req.body;

    try {
        const resultado = await db.query(
            'INSERT INTO transacao (titulo, valor, tipo_da_transacao, categoria) VALUES($1, $2, $3, $4) RETURNING *',
            [titulo, valor, tipo_da_transacao, categoria]
        );
        res.status(201).json(resultado.rows[0]);    
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao criar transação' });
    }
};

exports.listarTransacoes = async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM transacao ORDER BY id');
        res.json(resultado.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json( { erro: 'Erro ao listar transações'} )
    }
}

exports.obterValorTotalDeTransacoesDeEntradaDoMesEAnoAtuais = async (req, res) => {
    try {
        const tipoDaTransacao = 'Entrada';
        const resultado = await db.query(`
            SELECT 
                SUM(valor) AS valor_total_de_entradas
            FROM transacao
            WHERE tipo_da_transacao = $1
                AND data_da_transacao >= DATE_TRUNC('month', CURRENT_DATE)
                AND data_da_transacao < (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month')`,
            [tipoDaTransacao]
        );

        res.json({
            valor_total_de_entradas: resultado.rows[0].valor_total_de_entradas
        });
    } catch (err) {
        console.error(err);
        res.status(500).json( { erro: 'Erro ao obter valor total de transações de entrada do mês e ano atuais'} )
    }
}

exports.obterValorTotalDeTransacoesDeSaidaDoMesEAnoAtuais = async (req, res) => {
    try {
        const tipoDaTransacao = 'Saída';
        const resultado = await db.query(`
            SELECT 
                SUM(valor) AS valor_total_de_saidas
            FROM transacao
            WHERE tipo_da_transacao = $1
                AND data_da_transacao >= DATE_TRUNC('month', CURRENT_DATE)
                AND data_da_transacao < (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month')`,
            [tipoDaTransacao]
        );

        res.json({
            valor_total_de_saidas: resultado.rows[0].valor_total_de_saidas
        });
    } catch (err) {
        console.error(err);
        res.status(500).json( { erro: 'Erro ao obter valor total de transações de saída do mês e ano atuais' } )
    }
}

exports.obterDataDaTransacaoDeEntradaMaisRecente = async (req, res) => {
    try {
        const tipoDaTransacao = 'Entrada'
        const resultado = await db.query(`
            SELECT MAX(data_da_transacao) AS data_mais_recente
            FROM transacao
            WHERE tipo_da_transacao = $1
                AND data_da_transacao >= DATE_TRUNC('month', CURRENT_DATE)
                AND data_da_transacao < (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month')`,
            [tipoDaTransacao]
        )

        res.json( { data_mais_recente: resultado.rows[0].data_mais_recente } )
    } catch (err) {
        console.error(err)
        res.status(500).json( { erro: 'Erro ao obter data da transação de entrada mais recente' } )
    }
}

exports.obterDataDaTransacaoDeSaidaMaisRecente = async (req, res) => {
    try {
        const tipoDaTransacao = 'Saída'
        const resultado = await db.query(`
            SELECT MAX(data_da_transacao) AS data_mais_recente
            FROM transacao
            WHERE tipo_da_transacao = $1
                AND data_da_transacao >= DATE_TRUNC('month', CURRENT_DATE)
                AND data_da_transacao < (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month')`,
            [tipoDaTransacao]
        )

        res.json( { data_mais_recente: resultado.rows[0].data_mais_recente } )
    } catch (err) {
        console.error(err)
        res.status(500).json( { erro: 'Erro ao obter data da transação de saída mais recente' } )
    }
}

exports.obterTotalDeEntradasPorCategoria = async (req, res) => {
    try {
        const { mes, ano } = req.query;

        const tipoDaTransacao = 'Entrada'
        const resultado = await db.query(`
            SELECT categoria, SUM(valor) as total
            FROM transacao
            WHERE tipo_da_transacao = $1
                AND EXTRACT(MONTH from data_da_transacao) = $2
                AND EXTRACT(YEAR from data_da_transacao) = $3
            GROUP BY categoria`,
            [tipoDaTransacao, mes, ano]
        )

        res.json(resultado.rows)
    } catch (err) {
        console.error(err)
        res.status(500).json( { erro: 'Erro ao tentar obter resumo por categoria' } )
    }
}
