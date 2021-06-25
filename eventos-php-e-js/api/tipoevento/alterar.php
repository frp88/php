<?php
// Definição do tipo de informação utilizada
header('Content-type: application/json');
// Autoriza o acesso de qualquer domínio
header('Access-Control-Allow-Origin:*');
// Inclui a conexão com o BD
include('../config/conexao.php');

// Pega os dados enviados via POST
$descricao_recebida = $_POST['descricao'];
$observacao_recebida = $_POST['observacao'];
$id_recebido = $_POST['id'];

// Define o comando SQL
$sql = "UPDATE tiposeventos SET descricao='".$descricao_recebida."', observacao='"
.$observacao_recebida."' WHERE idtipoevento=".$id_recebido;
// Executa o comando SQL 
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);

?>