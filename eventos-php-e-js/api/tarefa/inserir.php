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

if (is_numeric($_POST['evento']) == true){
    // Define o comando SQL (INSERT)
    $sql = "INSERT INTO tarefas(titulo, descricao, evento, datahorainicio, datahorafim, situacao, observacao) 
    VALUES('$titulo_r', '$descricao_r', '$evento_r', '$datahorainicio_r', '$datahorafim_r', '$situacao_r', '$observacao_r');";
}
else{
    $sql = "INSERT INTO tarefas(titulo, descricao, datahorainicio, datahorafim, situacao, observacao) 
    VALUES('$titulo_r', '$descricao_r', '$datahorainicio_r', '$datahorafim_r', '$situacao_r', '$observacao_r');";
}
// Executa o comando SQL (INSERT)
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);

?>