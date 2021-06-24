<?php 
	// Verifica se foi passado um ID via GET
	if (!isset($_GET["id"])){
		$idpessoa = 0;
	}
	else{
		$idpessoa = $_GET["id"];
	}
	// Verifica se é um novo cadastro ou edição
	if ($idpessoa == 0){ // Novo Cadastro
		$nome = "";
		$telefone = "";
		$email = "";
	}
	else{ // Edição / atualização
		// Inporporar o arquivo de conexão com o BD nesta página PHP
		include("conecta.php");
		// Recebe um registro do BD
		$pessoa = RetornaPessoaPorId($idpessoa);
		// Verifica se retornou um registro
		if ($pessoa != null){
			$nome = $pessoa["nome"];
			$telefone = $pessoa["telefone"];
			$email = $pessoa["email"];
		}
	}
	// Inclui o topo na página
	include("topo.php");
 ?>
 <div class="container">
 	<div class="text-center">
 		<h3>Exemplo de Conexão com o BD - Cadastro / Edição de Pessoa</h3>
 	</div>
 	<div class="painel">
 		<form action="salvar.php" method="POST">
 			<input type="hidden" name="id" value="<?php echo $idpessoa; ?>" >
 			<div class="form-group row">
				<label class="col-sm-2 col-form-label text-right" for="cNome">Nome</label>
				<div class="col-sm-8">
					<input type="text" name="txtNome" class="form-control" id="cNome" value="<?php echo $nome;?>">
				</div>
 			</div>

 			<div class="form-group row">
				<label class="col-sm-2 col-form-label text-right" for="cTelefone">Telefone</label>
				<div class="col-sm-8">
					<input type="text" name="txtTelefone" class="form-control" id="cTelefone" value="<?php echo $telefone;?>">
				</div>
 			</div>

 			<div class="form-group row">
				<label class="col-sm-2 col-form-label text-right" for="cEmail">E-mail</label>
				<div class="col-sm-8">
					<input type="text" name="txtEmail" class="form-control" id="cEmail" value="<?php echo $email;?>">
				</div>
 			</div>
 			<div class="text-center">
 				<input type="submit" value="Salvar" onclick="alert('Dados salvos com sucesso!');" class="btn btn-primary">
 				<a href="listapessoas.php" class="btn btn-warning">Cancelar</a>
 			</div>
 		</form>
 	</div>
 </div>
 <?php include("rodape.php"); ?>