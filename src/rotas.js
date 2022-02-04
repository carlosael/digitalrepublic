const express = require('express');
const usuarios = require('./controladores/usuarios');
const transferencias = require('./controladores/transferencias');
const depositos = require('./controladores/depositos');

const rotas = express();

// usuarios
rotas.post('/usuarios', usuarios.cadastrarUsuario);
rotas.get('/usuarios', usuarios.listarUsuarios);
rotas.get('/usuarios/:id', usuarios.obterUsuario);

// transferencias
rotas.post('/transferencias', transferencias.cadastrarTransferencia);

// depositos
rotas.post('/depositos', depositos.cadastrarDeposito);



module.exports = rotas;