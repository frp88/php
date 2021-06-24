<?php 
	include("conecta.php");
	// Pega o ID da pessoa
	$idpessoa = $_GET["id"];
	// Chama a função que exlui a pessoa da tabela
	ExcluiPessoa($idpessoa);
	// Redireciona para a página lista pessoas
	header("location:listapessoas.php");
 ?>