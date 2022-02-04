const express = require('express');
const usuarios = require('./controladores/usuarios');
const transferencias = require('./controladores/transferencias');
const depositos = require('./controladores/depositos');


const rotas = express();

// cadastro de usuario
rotas.post('/usuarios', usuarios.cadastrarUsuario);

// transferencias
rotas.post('/transferencias', transferencias.cadastrarTransferencia);

// depositos
rotas.post('/depositos', depositos.cadastrarDeposito);



module.exports = rotas;