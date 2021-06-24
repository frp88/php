<?php 
	// Endereço do Servidor do BD
	define("SERVIDOR", "localhost");
	// Nome do usuário do BD
	define("USUARIO", "root");
	// Senha do usuário do BD
	define("SENHA", "");
	// Nome do banco do BD
	define("BANCO", "bdsite");
	// Função qu define e retorna a conexão com BD
	function AbreConexao(){
		// Define a conexão com o BD
		$con = new mysqli(SERVIDOR, USUARIO, SENHA, BANCO);
		// Retorna a conexão com o BD
		return $con;
	}

	// Função que retorna todos os registros da tabela tblpessoa
	function RetornaPessoas(){
		// Define o comando SQL (Select)
		$sql = "SELECT * FROM tblpessoa ORDER BY nome ASC";
		// Abre a conexão com o BD
		$conexao = AbreConexao();
		// Armazena o resultado da consulta em uma variável
		$resultado = $conexao->query($sql);
		// Fecha a conexão com o BD
		$conexao->close();
		// Verifica se a consulta SQL retornou registro da tabela
		if (mysqli_num_rows($resultado) > 0){
			// Acessar cada registro e adicionar em um vetor
			while ($row = mysqli_fetch_array($resultado)) {
			 	// Adiciona cada registro retornado no vetor
			 	$pessoas[] = $row;
			 } 
			 // Retorna o vetor
			 return $pessoas;
		}else{
			// Se a consulta não tiver retornado nenhum registro
			return null;
		}
	}

	// Função que retorna uma pessoa pelo ID
	function RetornaPessoaPorId($id){
		$sql = "SELECT * FROM tblpessoa WHERE idpessoa = ". $id;
		$conexao = AbreConexao();
		$resultado = $conexao->query($sql);
		$conexao->close();
		// Recebe a quantidade de registros retornados na consulta SQL
		$qtdeResgistros = mysqli_num_rows($resultado);
		// Se retornou pelo menos um registro
		if ($qtdeResgistros > 0){
			$pessoa = 
			mysqli_fetch_array($resultado); // ERRO AQUI...
			return $pessoa;
		}
		else{
			return null;
		}
	}
	// Função que insere uma pessoa na tabel
	function InserePessoa($nome, $telefone, $email){
		// Define o comando SQL (Insert)
		$sql = "INSERT INTO tblpessoa(nome, telefone, email) VALUES('".$nome."', '".$telefone."', '".$email."')";
		// Abre a conexão com o BD
		$conexao = AbreConexao();
		// Executa o comando SQL
		$conexao->query($sql);
		// Fecha a conexão com o BD
		$conexao->close();
	}

	// Função que atualiza os dados de um registro na tabela 'tblpessoa'
	function AlteraPessoa($nome, $telefone, $email, $id){
		$sql = "UPDATE tblpessoa SET nome = '".$nome."', telefone = '".$telefone."', email = '".$email."' WHERE idpessoa = ".$id;
		$conexao = AbreConexao();
		$conexao->query($sql);
		$conexao->close();
	}

	// Função que exclui um registro da 'tblpessoa'
	function ExcluiPessoa($id){
		$sql = "DELETE FROM tblpessoa WHERE idpessoa = ".$id;
		$conexao = AbreConexao();
		$conexao->query($sql);
		$conexao->close();
	}
 ?>