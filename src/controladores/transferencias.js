const knex = require('../conexao');
const { schemaCadastroTransferencia } = require('../validacoes/schemaTranferencias');

const cadastrarTransferencia = async (req, res) => {
    const { usuario_id_remetente, usuario_id_destinatario, valor } = req.body;

    try {
        await schemaCadastroTransferencia.validate(req.body);

        const contaRemetenteEncontrada = await knex('usuarios').where('id', usuario_id_remetente).debug();

        if (contaRemetenteEncontrada.length === 0) {
            return res.status(400).json("Conta do remetente não encontrada.");
        }

        const contaDestinatarioEncontrada = await knex('usuarios').where('id', usuario_id_destinatario).debug();

        if (contaDestinatarioEncontrada.length === 0) {
            return res.status(400).json("Conta do destinatário não encontrada.");
        }

        const saldoRemetente = await knex('usuarios').select('saldo').where('id', usuario_id_remetente);

        if (saldoRemetente[0].saldo < valor) {
            return res.status(400).json("Saldo insuficiente para realizar esta transferência.");
        }

        const novoSaldoRemetente = saldoRemetente[0].saldo - valor;

        const saldoRemetenteAtualizado = await knex('usuarios').update({saldo: novoSaldoRemetente}).where('id', usuario_id_remetente);

        if (saldoRemetenteAtualizado === 0) {
            return res.status(400).json("O saldo do usuário remetente não foi atualizado.");
        }

        const saldoDestinatario = await knex('usuarios').select('saldo').where('id', usuario_id_destinatario);

        const novoSaldoDestinatario = saldoDestinatario[0].saldo + valor;

        const saldoDestinarioAtualizado = await knex('usuarios').update({saldo: novoSaldoDestinatario}).where('id', usuario_id_destinatario);

        if (saldoDestinarioAtualizado === 0) {
            return res.status(400).json("O saldo do usuário remetente não foi atualizado.");
        }

        const transferenciaCadastrada = await knex('transferencias').insert({usuario_id_remetente, usuario_id_destinatario, valor}).returning('*');

        if (transferenciaCadastrada.length === 0) {
            return res.status(400).json("A transferência não foi cadastrada.");
        }

        return res.status(200).json("A transferência foi cadastrada com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarTransferencia
}