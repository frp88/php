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
$id_r = $_POST['id'];

// Define o comando SQL
$sql = "UPDATE servicoseventos SET evento = $evento_r, tiposervico = $tiposervico_r, fornecedor = $fornecedor_r, dataprevista = '$dataprevista_r', datarealizada = '$datarealizada_r', valortotal = $valortotal_r, valorpago = $valorpago_r, situacao = '$situacao_r', observacao = '$observacao_r' WHERE idservicoevento = $id_r;";
// Executa o comando SQL 
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);

?>