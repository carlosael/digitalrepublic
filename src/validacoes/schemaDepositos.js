const yup = require('./configuracoes');

const schemaCadastroDeposito = yup.object().shape({
    usuario_id: yup.string().required(),
    valor: yup.number().required().positive().integer().max(2000)
})

module.exports = {
    schemaCadastroDeposito
}