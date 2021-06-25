<?php
// Definição do tipo de informação utilizada
header('Content-type: application/json');
// Autoriza o acesso de qualquer domínio
header('Access-Control-Allow-Origin:*');
// Inclui a conexão com o BD
include('../config/conexao.php');

// Pega os dados enviados via POST
$evento_r = $_POST['evento'];
$tiposervico_r = $_POST['tiposervico'];
$fornecedor_r = $_POST['fornecedor'];
$dataprevista_r = $_POST['dataprevista'];
$datarealizada_r = $_POST['datarealizada'];
$valortotal_r = $_POST['valortotal'];
$valorpago_r = $_POST['valorpago'];
$situacao_r = $_POST['situacao'];
$observacao_r = $_POST['observacao'];

// Define o comando SQL (INSERT)
$sql = "INSERT INTO servicoseventos(evento, tiposervico, fornecedor, dataprevista, datarealizada, valortotal, valorpago, situacao, observacao) VALUES(".$evento_r.", ".$tiposervico_r.", ".$fornecedor_r.", '".$dataprevista_r."', '".$datarealizada_r."', ".$valortotal_r.", ".$valorpago_r.", '".$situacao_r."', '".$observacao_r."');";

// Executa o comando SQL (INSERT)
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);

?>