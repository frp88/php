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
$id_r = $_POST['id'];

// Define o comando SQL
$sql = "UPDATE produtos SET nome = '$nome_r', quantidade = $quantidade_r,  medida = '$medida_r', valor = $valor_r WHERE idproduto = $id_r;";
// Executa o comando SQL 
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);

?>