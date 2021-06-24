<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Sorteio de Jogos</title>
	<link rel="stylesheet" href="main.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
	<link rel="apple-touch-icon" sizes="57x57" href="img/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="img/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="img/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="img/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="img/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="img/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="img/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="img/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="img/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="img/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="img/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png">
	<link rel="manifest" href="img/manifest.json">
	<meta name="msapplication-TileColor" content="#209869">
	<meta name="msapplication-TileImage" content="img/ms-icon-144x144.png">
	<meta name="theme-color" content="#209869">
</head>
<body>
<div class="header">
	<h1>Sorteio de Jogos para a Mega Sena</h1>
	</div>
	<div class="conteudo">
<?php 
if (isset($_GET["qtd"])){
	$qtd_jogos = $_GET["qtd"]; 
	# Recebe a quantidade de jogos digitados pelo usuário
	echo("<h2 class='my3'>Quantidade de jogos: $qtd_jogos</h2>");
	echo('<a class="btn my3" href="index.php">Sortear novamente</a>');
	echo('<h2 class="my3">Jogos sorteados:</h2>');
	$jogos = array(); # Inicia a lista de jogos
	# Laço para montar a quantidade de jogos desejado
	for ($j=0; $j<$qtd_jogos; $j++){
	    # Inicia a lista dos números sorteados para cada jogo
	    $nros_sorteados = array(); 
	    # Laço para sortear os 6 números
	    $n=1;
        while ($n <= 6){
        	# Sortei a um número
	        $numero_sorteado = rand(1, 60);
	        $nro_ja_sorteado = False;
	        # Laço para percorrer a lista de números já sorteados e já armazenados e verificar se o número sorteado já está na lista
	        for ($i=0; $i<count($nros_sorteados); $i++){
	        	# Se o número sorteado já estiver na lista altera a variável de controle e sai do laço
	 			if ($nros_sorteados[$i] == $numero_sorteado){
	 				$nro_ja_sorteado = True;
	 				 break;
	 			}
	 		}
	 		# Se o número sorteado não estiver na lista, adiciona-o na lista
	 		if ($nro_ja_sorteado == False){
           	    $nros_sorteados[] = $numero_sorteado;
           	    $n++;
    	    }
		}
		# Ordena os números em ordem crescente
		sort($nros_sorteados); 
		# Adiciona a lista de números sorteados na lista de Jogos (lista dentro de lista (array dentro de array))
		$jogos[] = $nros_sorteados;
	}
	
	# Laço que percorre e imprime a lista de jogos e a lista de números sorteados para cada jogo         
	for ($j=0; $j<$qtd_jogos; $j++){
		echo('<h2><i class="fas fa-chevron-right"></i> Jogo '.($j+1).": ");
		for ($n=0; $n<6; $n++){
	 	   echo('<span class="bola">'.$jogos[$j][$n]."</span>");
		}
		echo("</h2>");
	}
}
?>
</div>
</body>
</html>