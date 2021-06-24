<?php include("topo.php"); ?>
<div class="container">
	<div class="text-center">
		<h3>Exemplo de PHP com BD - Lista Pessoas</h3>
		<div class="btn-group" role="group">
			<a href="formpessoa.php?id=0" class="btn btn-primary">Cadastrar Nova Pessoa</a>
		</div>
	</div>
	<table class="table">
	<?php 
		// Inclui neste documento a classe de conexão com o BD
		include("conecta.php"); 
		// armazena em um vetor todos os registros da 'tblpessoa'
		$vetpessoas = RetornaPessoas();
		// Verifica se retornou algum registro
		if ($vetpessoas != null){
			// Percorre o vetor e insere o registro na tabela
			foreach ($vetpessoas as $pessoa) {
				$nome = $pessoa["nome"];
				$telefone = $pessoa["telefone"];
				$email = $pessoa['email'];
				$idpessoa = $pessoa['idpessoa'];
echo '<tr> <td>'.$nome.'</td>
			<td>'.$telefone.'</td>
			<td>'.$email.'</td>
			<td>
	<a href="formpessoa.php?id='.$idpessoa.'"
	class="btn btn-primary">Alterar</a>
	<a href="excluir.php?id='.$idpessoa.'"
	class="btn btn-danger" 
onclick="return confirm(\'Deseja Excluir?\');"> Excluir</a>
			</td>
</tr>';
			}
		}
		else{
			echo "<tr>
			<td>Nenhum Registro Encontrado</td>
				</tr>";
		}
	?>
	</table>
</div>
<?php include("rodape.php"); ?>