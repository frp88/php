<?php 
	include("conecta.php");
	// Recebe o 'id' da pessoa via GET
	$idpessoa = $_GET["id"];
	// Recebe o nome da foto que será excluída da pasta
	$foto = $_GET["foto"];

	// Verifica se esta foto existe na pasta
	//if (file_exists('"fotos/"'.$foto)){
	if (file_exists("fotos/".$foto)){
		// Remove a foto da pasta
		unlink("fotos/".$foto);
	}

	// Chama a função da página 'conecta.php' que exclui a pessoa da tabela
	ExcluiPessoa($idpessoa);
	// Redireciona para a página de lista de pessoas
	header("location:listapessoas.php");
 ?>