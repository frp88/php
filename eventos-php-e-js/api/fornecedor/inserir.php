<?php
// Definição do tipo de informação utilizada
header('Content-type: application/json');
// Autoriza o acesso de qualquer domínio
header('Access-Control-Allow-Origin:*');
// Inclui a conexão com o BD
include('../config/conexao.php');

// Pega os dados enviados via POST
$cnpj_r = $_POST['cnpj'];
$nomefantasia_r = $_POST['nomefantasia'];
$razaosocial_r = $_POST['razaosocial'];
$fixo_r = $_POST['fixo'];
$celular1_r = $_POST['celular1'];
$celular2_r = $_POST['celular2'];
$email_r = $_POST['email'];
$endereco_r = $_POST['endereco'];
$datafundacao_r = $_POST['datafundacao'];
$tipo_r = $_POST['tipo'];
$observacao_r = $_POST['observacao'];

// Define o comando SQL (INSERT)
$sql = "INSERT INTO fornecedores(cnpj, nomefantasia, razaosocial, fixo, celular1, celular2, email, endereco, datafundacao, datacadastro, tipo, situacao, observacao) 
VALUES('$cnpj_r', '$nomefantasia_r', '$razaosocial_r', '$fixo_r', '$celular1_r', '$celular2_r', '$email_r', '$endereco_r', '$datafundacao_r', CURDATE(), '$tipo_r', 'Ok', '$observacao_r');";
// Executa o comando SQL (INSERT)
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);

?>