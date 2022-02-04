const knex = require('../conexao');
const { schemaCadastroDeposito } = require('../validacoes/schemaDepositos');

const cadastrarDeposito = async (req, res) => {
    const { usuario_id, valor } = req.body;

    try {
        await schemaCadastroDeposito.validate(req.body);

        const usuarioEncontrado = await knex('usuarios').where('id', usuario_id).debug();

        if (usuarioEncontrado.length === 0) {
            return res.status(400).json("O usuário não foi encontrado.");
        }

        const saldo = await knex('usuarios').select('saldo').where('id', usuario_id);

        const novoSaldo = saldo[0].saldo + valor;

        const saldoAtualizado = await knex('usuarios').update({saldo: novoSaldo}).where('id', usuario_id);

        if (saldoAtualizado.length === 0) {
            return res.status(400).json("O saldo não foi atualizado.");
        }

        const depositoCadastrado = await knex('depositos').insert({usuario_id, valor}).returning('*');

        if (depositoCadastrado.length === 0) {
            return res.status(400).json("O depósito não foi cadastrado.");
        }

        return res.status(200).json("O depósito foi cadastrado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarDeposito
}