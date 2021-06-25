<?php
// Definição do tipo de informação utilizada
header('Content-type: application/json');
// Autoriza o acesso de qualquer domínio
header('Access-Control-Allow-Origin:*');
// Inclui a conexão com o BD
include('../config/conexao.php');

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
$observacao_r = $_POST['observacao'];

// Define o comando SQL (INSERT)
$sql = "INSERT INTO clientes(cpf, rg, nome, fixo, celular1, celular2, email, endereco, datanascimento, datacadastro, tipo, situacao, observacao) 
VALUES('$cpf_r', '$rg_r', '$nome_r', '$fixo_r', '$celular1_r', '$celular2_r', '$email_r', '$endereco_r', '$datanascimento_r', CURDATE(), '$tipo_r', 'Ok', '$observacao_r');";
// Executa o comando SQL (INSERT)
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);

?>