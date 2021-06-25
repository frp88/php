<?php 
// Definição do tipo de informação utilizada
header('Content-type: application/json');
// Autoriza o acesso de qualquer domínio
header('Access-Control-Allow-Origin:*');
// Inclui a conexão com o BD
include('../config/conexao.php');

 // Pega os dados enviados via POST
$evento_r = $_POST['evento'];  

// Define o comando SQL (Select)
$sql = "SELECT t.descricao AS descricaotiposervico, f.nomefantasia, s.* FROM servicoseventos s INNER JOIN tiposservicos t ON t.idtiposervico = s.tiposervico INNER JOIN fornecedores f ON f.idfornecedor = s.fornecedor WHERE evento = ".$evento_r." ORDER BY s.evento DESC";

// Armazena o resultado da consulta em uma variável
$resultado = $conexao->query($sql);
// Verifica se a consulta SQL retornou registro da tabela
if ($resultado->rowCount() == 0){
    $lista = null;
}else{
    $lista = $resultado->fetchAll(PDO::FETCH_ASSOC); 
}
    
echo(json_encode($lista));
	
?>