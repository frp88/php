<?php
// Definição do tipo de informação utilizada
header('Content-type: application/json');
// Autoriza o acesso de qualquer domínio
header('Access-Control-Allow-Origin:*');
// Inclui a conexão com o BD
include('../config/conexao.php');

// Pega os dados enviados via POST
$titulo_r = $_POST['titulo'];
$descricao_r = $_POST['descricao'];
$evento_r = $_POST['evento'];
$datahorainicio_r = $_POST['datahorainicio'];
$datahorafim_r = $_POST['datahorafim'];
$situacao_r = $_POST['situacao'];
$observacao_r = $_POST['observacao'];
$id_r = $_POST['id'];


if (is_numeric($_POST['evento']) == true){
    // Define o comando SQL
    $sql = "UPDATE tarefas SET titulo = '$titulo_r',  descricao = '$descricao_r', evento = $evento_r, datahorainicio = '$datahorainicio_r', datahorafim = '$datahorafim_r', situacao = '$situacao_r', observacao = '$observacao_r' WHERE idtarefa = $id_r;";
}
else{
    $sql = "UPDATE tarefas SET titulo = '$titulo_r',  descricao = '$descricao_r', datahorainicio = '$datahorainicio_r', datahorafim = '$datahorafim_r', situacao = '$situacao_r', observacao = '$observacao_r' WHERE idtarefa = $id_r;";
}
// Executa o comando SQL 
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);

?>