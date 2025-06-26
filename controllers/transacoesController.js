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
