const yup = require('./configuracoes');

const schemaCadastroTransferencia = yup.object().shape({
    usuario_id_remetente: yup.number().required(),
    usuario_id_destinatario: yup.number().required(),
    valor: yup.number().required().positive().integer()
})

module.exports = {
    schemaCadastroTransferencia
}