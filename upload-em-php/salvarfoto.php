<?php 
	include("conecta.php");
	$idpessoa = $_POST["id"];
	$fotoAtual = $_POST["fotoatual"];
	// Atribui a variável o arquivo (imagem) selecionada pelo usuário
	$novaFoto = $_FILES["foto"]["name"];
	// Verifica se foi selecionado um arquivo 
	if ($novaFoto != null){
		// Verfica se existe a foto atual na  pasta imagens do projeto
		if (file_exists("fotos/".$fotoAtual)){
			// Exclui a foto atual na pasta imagens do projeto
			unlink('"fotos/"'.$fotoAtual);
		}
		// Copia a nova foto para a pasta imagens do projeto
		move_uploaded_file($_FILES["foto"]["tmp_name"], "fotos/".$novaFoto);
		// Atualiza o nome do arquivo (imagem) na tabela do BD
		AlteraFoto($novaFoto, $idpessoa);
	}
	
	// Retorna para a página lista pessoas
	header("location:listapessoas.php");
	
 ?>