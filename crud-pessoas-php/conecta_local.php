<?php

	// error_reporting(E_ALL);
	// ini_set('display_errors', TRUE);
	// ini_set('display_startup_errors', TRUE);

 //   $dbname="aa"; // Indique o nome do banco de dados que ser&aacute; aberto
 //   $usuario="root"; // Indique o nome do usu&aacute;rio que tem acesso
 //   $password="l1f3g03s0n"; // Indique a senha do usu&aacute;rio

 //   //1&ordm; passo - Conecta ao servidor MySQL
 //   if(!($id = mysqli_connect("127.0.0.1",$usuario,$password))) {
 //      //echo "N&atilde;o foi poss&iacute;vel estabelecer uma conex&atilde;o com o gerenciador MySQL. Favor Contactar o Administrador.";
	//   echo "<script>document.body.innerHTML = \"";
	//   echo "<h1 align='center'>Falha ao conectar no banco de dados!";
	//   echo "<p align='center'>Desculpe o transtorno...</p>";
	//   echo "<p align='center'>Voltaremos o mais breve possível!</p></h1>";
	//   echo "\";</script>";
 //      exit;
 //   }

 //   //2&ordm; passo - Seleciona o Banco de Dados
 //   if(!($con=mysqli_select_db($id, $dbname))) {
 //      echo "N&atilde;o foi poss&iacute;vel estabelecer uma conex&atilde;o com o gerenciador MySQL. Favor Contactar o Administrador.";
 //      exit;
 //   }




# PHP 7
// $conexao = mysqli_connect('localhost','root','l1f3g03s0n');
// echo "string";
// $banco = mysqli_select_db($conexao,'aa');
// mysqli_set_charset($conexao,'utf8');
 
// $sql = mysqli_query($conexao,"insert into usuarios(login,senha) values('teste','abc');") or die("Erro");
// while($dados=mysqli_fetch_assoc($sql))
//     {
//         echo $dados['senha'].'<br>';
//     }
        




?>



<?php 
/*
	// Endereço do Servidor do BD
	define("SERVIDOR", "localhost");
	// Nome do usuário do BD
	define("USUARIO", "root");
	// Senha do usuário do BD
	define("SENHA", "l1f3g03s0n");
	// Nome do banco do BD
	define("BANCO", "bdexemplo");
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
		echo "string";
		// Armazena o resultado da consulta em uma variável
		$resultado = $conexao->query($sql);
		// Fecha a conexão com o BD
		$conexao->close();
		// Verifica se a consulta SQL retornou registro da tabela
		echo mysqli_num_rows($resultado);/*
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

	RetornaPessoas();

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

	// Função que atualiza a Foto de uma pessoa
	function AlteraFoto($foto, $id){
		// Define o comando SQL que atualiza a foto
		$sql = "UPDATE tblpessoa SET foto = '".$foto."' WHERE idpessoa = ".$id;
		// Abre a conexão com o BD
		$conexao = AbreConexao();
		// Executa com comando SQL
		$conexao->query($sql);
		// Fecha a conexão com o BD
		$conexao->close();
	}


	InserePessoa('tiago', '34554', 'akmkm@kk');
echo 'aa';*/

 ?>