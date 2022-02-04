const yup = require('./configuracoes');

const schemaCadastroUsuario = yup.object().shape({
    nome: yup.string().required(),
    cpf: yup.string().required().max(11)
})

module.exports = {
    schemaCadastroUsuario
}