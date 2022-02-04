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

module.exports = {
    cadastrarUsuario
}