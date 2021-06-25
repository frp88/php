<?php 
// Definição do tipo de informação utilizada
header('Content-type: application/json');
// Autoriza o acesso de qualquer domínio
header('Access-Control-Allow-Origin:*');
// Inclui a conexão com o BD
include('../config/conexao.php');

// Define o comando SQL (Select)
$sql = "SELECT * FROM usuarios ORDER BY nome ASC";
// Armazena o resultado da consulta em uma variável
$resultado = $conexao->query($sql);
// Verifica se a consulta SQL retornou registro da tabela
if ($resultado->rowCount() == 0){
    $listausuarios = null;
}else{
    $listausuarios = $resultado->fetchAll(PDO::FETCH_ASSOC); 
}
    
echo(json_encode($listausuarios));
	
?>