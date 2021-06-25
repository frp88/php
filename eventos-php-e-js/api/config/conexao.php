<?php
	// Endereço do Servidor do BD
	$servidor = 'localhost';
	// Nome do banco do BD
	$banco = 'bdevento';
	// Nome do usuário do BD
	$usuario = 'root';
	// Senha do usuário do BD
	$senha = '';

	try{
	    //$conexao = new mysqli($servidor, $usuario, $senha, $banco);
		$conexao = new PDO("mysql:host=".$servidor.";dbname=".$banco.
	        ";charset=utf8", $usuario, $senha);
	    
	    //echo "Conexão realizada com sucesso!";
	}catch(PDOException $e) {
	    echo "Erro: ". $e->getMessage();
	}
?>