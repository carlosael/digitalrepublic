CREATE DATABASE banco;

CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
  	nome TEXT NOT NULL,
  	cpf TEXT NOT NULL UNIQUE,
  	saldo INTEGER DEFAULT 0 
);

CREATE TABLE transferencias (
	id SERIAL PRIMARY KEY,
  	usuario_id_remetente INTEGER NOT NULL,
  	usuario_id_destinatario INTEGER NOT NULL,
  	valor INTEGER NOT NULL,
	data_da_operacao TIMESTAMP DEFAULT NOW(),
  	FOREIGN KEY (usuario_id_remetente) REFERENCES usuarios (id),
  	FOREIGN KEY (usuario_id_destinatario) REFERENCES usuarios (id)
);

CREATE TABLE depositos (
	id SERIAL PRIMARY KEY,
  	usuario_id INTEGER NOT NULL,
  	valor INTEGER NOT NULL,
	data_da_operacao TIMESTAMP DEFAULT NOW(),
  	FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);