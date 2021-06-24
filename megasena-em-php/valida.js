function sortear(){
	// Recebe a quantidade de jogos digitados pelo usuário
	var qtd_jogos = parseInt(document.getElementById("txtQtd").value);
	var result = '';
	if (qtd_jogos > 0){
		window.location.href = "sorteio.php?qtd=" + qtd_jogos;
	}
	else{
		alert("Quantidade de Jogos Inválida!");
	}
}