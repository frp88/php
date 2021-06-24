<?php include ("topo.php"); ?>
<div class="container">
	<div class="text-center">
		<h3>Exemplo Upload com BD - Alterar Imagem</h3>
	</div>
	<div class="painel">
		<form action="salvarfoto.php" method="POST" enctype="multipart/form-data">
			<?php 
				// Atribui o id da pessoa recebido via GET
				$idpessoa = $_GET["id"];
				include ("conecta.php");
				// Retorna os dados de uma determina pessoa
				$pessoa = RetornaPessoaPorId($idpessoa);
				// Verifica se retornou dados
				if ($pessoa != null){
					$nome = $pessoa["nome"];
					$telefone = $pessoa["telefone"];
					$email = $pessoa["email"];
					$fotoAtual = $pessoa["foto"];
				}
			?>

			<input type="hidden" name="id" value="<?php echo $idpessoa; ?>">
			<input type="hidden" name="fotoatual" value="<?php echo $fotoAtual; ?>">

			<div class="form-group row">
				<label class="col-sm-4 col-form-label text-right">Nome:</label>
				<label class="col-form-label"><?php echo $nome; ?></label>
			</div>

			<div class="form-group row">
				<label class="col-sm-4 col-form-label text-right">Telefone:</label>
				<label class="col-form-label"><?php echo $telefone; ?></label>
			</div>
			<div class="form-group row">
				<label class="col-sm-4 col-form-label text-right">E-mail:</label>
				<label class="col-form-label"><?php echo $email; ?></label>
			</div>
			<div class="form-group row">
				<label class="col-sm-4 col-form-label text-right">Foto Atual:</label>				
				<img src="fotos/<?php echo $fotoAtual; ?>">		

			</div>
			<div class="form-group row">
				<label class="col-sm-4 col-form-label text-right">Nova Foto:</label>
				<div class="col-sm-6">
					<!-- TAG para UPLOAD de Arquivos -->
					<input type="file" name="foto" class="form-control">
				</div>
			</div>
			<br>
			<div class="text-center">
				<input type="submit" class="btn btn-primary" value="Salvar" onclick="alert('Foto alterada com sucesso!');">
				<a href="listapessoas.php" class="btn btn-warning">Cancelar</a>
			</div>
		</form>
	</div>
</div>
<?php include("rodape.php"); ?>