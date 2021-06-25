--
-- Criando o banco de dados: bdevento
--
CREATE DATABASE IF NOT EXISTS bdevento;
USE bdevento;

--
-- Criando a tabela: usuarios
--

CREATE TABLE IF NOT EXISTS usuarios(
	idusuario INT NOT NULL AUTO_INCREMENT, 
	nome VARCHAR(100) NOT NULL, 
	login VARCHAR(50) NOT NULL,
	senha VARCHAR(50) NULL, 
	email VARCHAR(100) NULL,
	datacadastro DATE NULL,
	situacao VARCHAR(5) NULL, 
	tipopermissao VARCHAR(2) NULL,
	observacao VARCHAR(200) NULL, 
	PRIMARY KEY (idusuario));

--
-- Criando a tabela: clientes
--

CREATE TABLE IF NOT EXISTS clientes(
	idcliente INT NOT NULL AUTO_INCREMENT, 
	cpf VARCHAR(20) NULL, 
	rg VARCHAR(20) NULL,
	nome VARCHAR(100) NOT NULL, 
	fixo VARCHAR(20) NULL,
	celular1 VARCHAR(20) NULL, 
	celular2 VARCHAR(20) NULL,
	email VARCHAR(100) NULL, 
	endereco VARCHAR(200) NULL,
	datanascimento DATE NULL,
	datacadastro DATE NULL,
	tipo VARCHAR(5) NULL, 
	situacao VARCHAR(5) NULL, 
	observacao VARCHAR(200) NULL, 
	PRIMARY KEY (idcliente));

-- INSERT INTO clientes(idcliente, nome) VALUES(1, 'Nenhum cliente');

--
-- Criando a tabela: fornecedores
--
CREATE TABLE IF NOT EXISTS fornecedores(
	idfornecedor INT NOT NULL AUTO_INCREMENT, 
	cnpj VARCHAR(20) NULL, 
	nomefantasia VARCHAR(100) NOT NULL, 
	razaosocial VARCHAR(100) NULL, 
	fixo VARCHAR(20) NULL,
	celular1 VARCHAR(20) NULL, 
	celular2 VARCHAR(20) NULL,
	email VARCHAR(100) NULL, 
	endereco VARCHAR(200) NULL,
	datafundacao DATE NULL,
	datacadastro DATE NULL,
	tipo VARCHAR(5) NULL, 
	situacao VARCHAR(5) NULL, 
	observacao VARCHAR(200) NULL, 
	PRIMARY KEY (idfornecedor));

-- INSERT INTO fornecedores(idfornecedor, nomefantasia, razaosocial) VALUES(1, 'Nenhum fornecedor', 'Nenhum fornecedor');

--
-- Criando a tabela: tiposeventos
--
CREATE TABLE IF NOT EXISTS tiposeventos(
	idtipoevento INT NOT NULL AUTO_INCREMENT, 
	descricao VARCHAR(100) NULL, 
	observacao VARCHAR(200) NULL, 
	PRIMARY KEY (idtipoevento));

-- INSERT INTO tiposeventos(idtipoevento, descricao) VALUES(1, 'Nenhum tipo de evento');

--
-- Criando a tabela: eventos
--
CREATE TABLE IF NOT EXISTS eventos(
	idevento INT NOT NULL AUTO_INCREMENT, 
	titulo VARCHAR(50) NOT NULL, 
	descricao VARCHAR(200) NULL, 
	tipoevento INT NOT NULL,
	cliente INT NOT NULL,
	datahorainicio DATETIME NULL,
	datahorafim DATETIME NULL,
	datahoracadastro DATETIME NULL,
	localcerimonia VARCHAR(200) NULL,
	localrecepcao VARCHAR(200) NULL,
	qtdconvidados INT NULL,
	horariosdisponiveis VARCHAR(200) NULL, 
	alergias VARCHAR(200) NULL,
	observacao VARCHAR(200) NULL, 
	situacao VARCHAR(5) NULL, 
	formapgto VARCHAR(5) NULL, 
	valor FLOAT NULL,
	qtdparcelas INT NULL, 
	diaparcela INT NULL, 	
	PRIMARY KEY (idevento), 
	CONSTRAINT fk_clientes_eventos FOREIGN KEY(cliente) 
		REFERENCES clientes(idcliente), 
	CONSTRAINT fk_tiposeventos_eventos FOREIGN KEY(tipoevento) 
		REFERENCES tiposeventos(idtipoevento));

-- INSERT INTO eventos(idevento, titulo, descricao, cliente, tipoevento) VALUES (1, 'Nenhum evento', 'Evento cadastrado para controle interno', 1, 1);

--
-- Criando a tabela: tiposservicos
--
CREATE TABLE IF NOT EXISTS tiposservicos(
	idtiposervico INT NOT NULL AUTO_INCREMENT, 
	descricao VARCHAR(100) NULL, 
	observacao VARCHAR(200) NULL, 
	PRIMARY KEY (idtiposervico));

-- INSERT INTO tiposservicos(idtiposervico, descricao, observacao) VALUES(1, 'Nenhum', 'Nenhum tipo de serviço');

--
-- Criando a tabela: servicoseventos
--
CREATE TABLE IF NOT EXISTS servicoseventos(
	idservicoevento INT NOT NULL AUTO_INCREMENT, 
	evento INT NOT NULL,
	tiposervico INT NOT NULL,
	fornecedor INT NOT NULL,
	dataprevista DATETIME NULL,
	datarealizada DATETIME NULL,
	datacadastro DATETIME NULL,
	valortotal FLOAT NULL,
	valorpago FLOAT NULL,
	situacao VARCHAR(5) NULL, 
	observacao VARCHAR(200) NULL, 
	PRIMARY KEY (idservicoevento), 
	CONSTRAINT fk_servicoseventos_eventos FOREIGN KEY(evento) 
		REFERENCES eventos(idevento), 
	CONSTRAINT fk_servicoseventos_tiposservicos FOREIGN KEY(tiposervico) 
		REFERENCES tiposservicos(idtiposervico), 
	CONSTRAINT fk_servicoseventos_fornecedores FOREIGN KEY(fornecedor) 
		REFERENCES fornecedores(idfornecedor));


--
-- Criando a tabela: tarefas
--
CREATE TABLE IF NOT EXISTS tarefas(
	idtarefa INT NOT NULL AUTO_INCREMENT, 
	titulo VARCHAR(50) NOT NULL, 
	descricao VARCHAR(200) NULL, 
	evento INT NULL,	
	datahorainicio DATETIME NULL,
	datahorafim DATETIME NULL,
	datahoracadastro DATETIME NULL,
	situacao VARCHAR(5) NULL, 
	observacao VARCHAR(200) NULL, 
	PRIMARY KEY (idtarefa), 
	CONSTRAINT fk_tarefas_eventos FOREIGN KEY(evento) 
		REFERENCES eventos(idevento));

