<?php
// Definição do tipo de informação utilizada
header('Content-type: application/json');
// Autoriza o acesso de qualquer domínio
header('Access-Control-Allow-Origin:*');
// Inclui a conexão com o BD
include('../config/conexao.php');

// Pega os dados enviados via POST
$id_recebido = $_POST['id'];
$nova_senha = $_POST['novaSenha'];

// Define o comando SQL (UPDATE)
$sql = "UPDATE usuarios SET senha='".$nova_senha."' WHERE idusuario='".$id_recebido."';";
// Executa o comando SQL (UPDATE)
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);

?>