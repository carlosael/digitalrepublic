const knex = require('../conexao');
const { schemaCadastroUsuario } = require('../validacoes/schemaUsuarios')

const cadastrarUsuario = async (req, res) => {
    const { nome, cpf } = req.body;

    try {
        await schemaCadastroUsuario.validate(req.body);

        const cpfEncontrado = await knex('usuarios').where('cpf', cpf).debug();

        if (cpfEncontrado.length > 0) {
            return res.status(400).json("O CPF informado já possui cadastro.");
        }

        const usuarioCadastrado = await knex('usuarios').insert({nome, cpf}).returning('*');

        if (usuarioCadastrado.length === 0) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(200).json("O usuário foi cadastrado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await knex('usuarios')

        for (const usuario of usuarios) {
            const depositos = await knex('depositos')
            .where({usuario_id: usuario.id}).select('data_da_operacao','valor')

            usuario.depositos = depositos;

            const transferenciasRealizadas = await knex('transferencias')
            .leftJoin('usuarios', 'usuarios.id','transferencias.usuario_id_destinatario')
            .where({usuario_id_remetente: usuario.id}).select('data_da_operacao','nome','valor')

            usuario.transferencias_realizadas = transferenciasRealizadas;

            const transferenciasRecebidas = await knex('transferencias')
            .leftJoin('usuarios', 'usuarios.id','transferencias.usuario_id_remetente')
            .where({usuario_id_destinatario: usuario.id}).select('data_da_operacao','nome','valor')

            usuario.transferencias_recebidas = transferenciasRecebidas;
        }

        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario,
    listarUsuarios
}