<?php
// Definição do tipo de informação utilizada
header('Content-type: application/json');
// Autoriza o acesso de qualquer domínio
header('Access-Control-Allow-Origin:*');
// Inclui a conexão com o BD
include('../config/conexao.php');

// Pega os dados enviados via POST
// Pega os dados enviados via POST
$nome_r = $_POST['nome'];
$cpf_r = $_POST['cpf'];
$rg_r = $_POST['rg'];
$fixo_r = $_POST['fixo'];
$celular1_r = $_POST['celular1'];
$celular2_r = $_POST['celular2'];
$email_r = $_POST['email'];
$endereco_r = $_POST['endereco'];
$datanascimento_r = $_POST['datanascimento'];
$tipo_r = $_POST['tipo'];
$situacao_r = $_POST['situacao'];
$observacao_r = $_POST['observacao'];
$id_r = $_POST['id'];

// Define o comando SQL
$sql = "UPDATE clientes SET cpf = '$cpf_r', rg = '$rg_r',  nome = '$nome_r', fixo = '$fixo_r', celular1 = '$celular1_r', celular2 = '$celular2_r', email = '$email_r', endereco = '$endereco_r', datanascimento =  '$datanascimento_r', tipo = '$tipo_r', situacao = '$situacao_r', observacao = '$observacao_r' WHERE idcliente = $id_r;";
// Executa o comando SQL 
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);

?>