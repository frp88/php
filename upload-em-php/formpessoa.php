<?php 
	if (!isset($_GET["id"])){
		$idpessoa = 0;
	}
	else{
		$idpessoa = $_GET["id"];
	}
	if ($idpessoa == 0){ // Novo Registro na tabela
		$nome = "";
		$telefone = "";
		$email = "";
	}
	else{ // Alterar um Registro Existente da Tabela
		// Busca os dados do BD
		include("conecta.php");
		// Retorna o registro de uma pessoa da tabela
		$pessoa = RetornaPessoaPorId($idpessoa);
		// Verifica se retornou um registro
		if ($pessoa != null){
			$nome = $pessoa["nome"];
			$telefone = $pessoa["telefone"];
			$email = $pessoa["email"];
		}
	}
	include("topo.php");
 ?>
 <div class="container">
 	<div class="text-center">
 		<h3>Exemplo de Conexão com o BD - Salvar Pessoa</h3>
 	</div>
 	<div class="painel">
 		<form action="salvar.php" method="POST">
 			<input type="hidden" name="id" value="<?php echo $idpessoa; ?>">
 			<div class="form-group row">
 				<label class="col-sm-2 col-form-label text-right" for="cNome">Nome</label>
 				<div class="col-sm-8">
 					<input class="form-control"  type="text" name="txtNome" id="cNome" placeholder="Nome" value="<?php echo $nome; ?>">
 				</div>
 			</div>
 			<div class="form-group row">
 				<label class="col-sm-2 col-form-label text-right" for="cTelefone">Telefone</label>
 				<div class="col-sm-8">
 					<input class="form-control" type="text" name="txtTelefone" id="cTelefone" placeholder="Telefone" value="<?php echo $telefone; ?>">
 				</div>
 			</div>
 			<div class="form-group row">
 				<label class="col-sm-2 col-form-label text-right" for="cEmail">E-mail</label>
 				<div class="col-sm-8">
 					<input class="form-control" type="text" name="txtEmail" id="cEmail" placeholder="E-mail" value="<?php echo $email; ?>">
 				</div>
 			</div>
 			<div class="text-center">
 				<input type="submit" class="btn btn-primary" value="Salvar" onclick="alert('Dados salvos com sucesso!');">
 				<a href="listapessoas.php" class="btn btn-warning">Cancelar</a>
 			</div>
 		</form>
 	</div>
 </div>	
 <?php include("rodape.php"); ?> 


