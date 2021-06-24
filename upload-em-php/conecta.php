<?php 
	// Define a configuração do BD
	define("SERVIDOR", "localhost"); // Endereço do Servidor do BD
	define("USUARIO", "root"); // Nome do Usuário no BD
	define("SENHA", ""); // Senha do Usuário
	define("BANCO", "bdexemplo"); // Nome do BD

	// Função que define e abre a conexão com o BD
	function AbreConexao(){
		$con = new mysqli(SERVIDOR, USUARIO, SENHA, BANCO); // Cria a conexão com o BD
		return $con; // Retorna a conexão
	}

	// Função que Retorna os registros da tabela
	function RetornaPessoas(){
		$sql = "SELECT * FROM tblpessoa ORDER BY nome"; // Define o comando SQL (select)
		$conexao = AbreConexao(); // Abre conexão com o BD
		$resultado = $conexao->query($sql); // Executa com comando SQL
		$conexao->close(); // Fecha a conexão com o BD

		// Verifica se a consulta retornou pelo menos um registro
		if (mysqli_num_rows($resultado) > 0){
			while($row = mysqli_fetch_array($resultado)){
				// Atribui cada registro da consulta para o vetor $pessoas[]
				$pessoas[] = $row;
			}
			// Retorna o vetor contendo todos os registros da consulta
			return $pessoas;

		}else{ // Se não retornou registro(s)
			return null;
		}
	}

	
	// Função que Retorna um unico registro pelo ID
	function RetornaPessoaPorId($id){
		$sql = "SELECT * FROM tblpessoa WHERE idpessoa = ".$id; // Define o comando SQL (select)
		$conexao = AbreConexao(); // Abre conexão com o BD
		$resultado = $conexao->query($sql); // Executa com comando SQL
		$conexao->close(); // Fecha a conexão com o BD

		// Verifica se a consulta retornou pelo menos um registro
		if (mysqli_num_rows($resultado) > 0){
			// Atribui o registro da consulta para a variável $pessoa
			$pessoa = mysqli_fetch_array($resultado);
			// Retorna a variável contendo o registro da consulta
			return $pessoa;
		}else{ // Se não retornou registro
			return null;
		}
	}
	
	// Função insere pessoa na tabela
	function InserePessoa($nome, $telefone, $email){
		// Define o comando SQL (Insert)
		$sql = "INSERT INTO tblpessoa(nome, telefone, email) VALUES('$nome' ,    '$telefone', '$email')";
		// Abre a conexão com o BD
		$conexao = AbreConexao(); 
		// Executa com comando SQL
		$conexao->query($sql);
		// Fecha a conexão com o BD
		$conexao->close();		
	}

	// Função atualiza dados da pessoa na tabela
	function AlteraPessoa($nome, $telefone, $email, $id){
		// Define o comando SQL (update)
		$sql  = "UPDATE tblpessoa SET nome = '$nome', telefone = '$telefone', email = '$email' WHERE idpessoa = ".$id;
		$conexao = AbreConexao(); // Abre conexão
		// Executa o comando SQL
		$conexao->query($sql);
		$conexao->close(); // Fecha a Conexão
	}

	// Função exclui registro da tabela
	function ExcluiPessoa($id){
		// Define o comando SQL (delete)
		$sql = "DELETE FROM tblpessoa 
				WHERE idpessoa = ".$id;
		$conexao = AbreConexao(); // Abre conexão com o BD
		// Executa o comando SQL 
		$conexao->query($sql);
		$conexao->close(); // Fecha a conexão com o BD
	}

	// Função que altera a foto de um registro
	function AlteraFoto($foto, $id){
		// Define o comando SQL (update)
		$sql = "UPDATE tblpessoa SET 
				foto = '".$foto."' WHERE idpessoa = ". $id;
		$conexao = AbreConexao();  // Abre conexão com o BD
		$conexao->query($sql); // Executa o comando SQL
		$conexao->close(); // Fecha a conexão com o BD
	}
?>