<?php include("topo.php"); ?>
<div class="container">
	<div class="text-center">
		<h3>Exemplo de Conexão com o BD - Lista Pessoas</h3>
		<div class="btn-group" role="group">
			<a href="formpessoa.php?id=0" class="btn btn-primary">Cadastrar Nova Pessoa</a>
		</div>
	</div>
	<table class="table">
		<?php include("conecta.php"); 
			// Atribui os registros da tabela no vetor
			$vetpessoas = RetornaPessoas();
			// Verifica se existe registros na tabela retornada
			if ($vetpessoas != null){
				// Existe pelo menos um registro (pessoa na tabela do BD)
				foreach ($vetpessoas as $pessoa) {
echo '<tr>
	<td>'.$pessoa['nome'].'</td>
	<td>'.$pessoa['telefone'].'</td>
	<td>'.$pessoa['email'].'</td>

	<td><img class="tamanhofoto" 
	src="fotos/'.$pessoa['foto'].'"/></td> 
		<td><a href="foto.php?id='.$pessoa['idpessoa'].'" class="btn btn-success">Foto</a>

	<td> <a href="formpessoa.php?id='.$pessoa['idpessoa'].'" class="btn btn-primary">Alterar</a>

	<a href="excluir.php?id='.$pessoa['idpessoa'].'&foto='.$pessoa['foto'].'" class="btn btn-danger" 
	onclick="return confirm(\'Deseja excluir?\');">Excluir</a>
	</td>
	</tr>';
}
			}
			else{
				echo "<tr><td>
					Nenhuma pessoa encontrada!
					  </td></tr>";
			}
		?>
	</table>
</div>
<?php include("rodape.php"); ?>