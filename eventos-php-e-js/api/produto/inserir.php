<?php
// Definição do tipo de informação utilizada
header('Content-type: application/json');
// Autoriza o acesso de qualquer domínio
header('Access-Control-Allow-Origin:*');
// Inclui a conexão com o BD
include('../config/conexao.php');

// Pega os dados enviados via POST
$nome_r = $_POST['nome'];
$quantidade_r = $_POST['quantidade'];
$medida_r = $_POST['medida'];
$valor_r = $_POST['valor'];

// Define o comando SQL (INSERT)
$sql = "INSERT INTO produtos(nome, quantidade, medida, valor) 
VALUES('$nome_r', $quantidade_r, '$medida_r', $valor_r);";
// Executa o comando SQL (INSERT)
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);

?>