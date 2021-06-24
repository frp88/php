<?php 
	include("conecta.php");
	// Pega os valores passados via POST
	$idpessoa = $_POST["id"];
	$nome = $_POST["txtNome"];
	$telefone = $_POST["txtTelefone"];
	$email = $_POST["txtEmail"];
	// Verifica se é um novo cadastro ou se é uma atualização
	if ($idpessoa == 0){
		// Novo Cadastro - chama a função de inserir da página conecta.php
		InserePessoa($nome, $telefone, $email);
	}
	else{
		// Atualização - chama a função que atualiza os dados de uma pessoa
		AlteraPessoa($nome, $telefone, $email, $idpessoa);
	}
	// Redireciona para a página 'lista pessoas'
	header("location:listapessoas.php");


 ?>