<?php 
	include("conecta.php");
	// Recebe os dados da página 'formpessoa.php'
	$idpessoa = $_POST["id"];
	$nome = $_POST["txtNome"];
	$telefone = $_POST["txtTelefone"];
	$email = $_POST["txtEmail"];
	// Verificar se é um novo registro ou atualização
	if ($idpessoa == 0){ // Novo Cadastro
		InserePessoa($nome, $telefone, $email);
	}
	else{ // Atualiza dados de um registro existente
		AlteraPessoa($nome, $telefone, $email, $idpessoa);
	}
	// Redireciona para a página 'listapessoas.php'
	header("location:listapessoas.php");
 ?>