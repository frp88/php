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
$situacao_r = $_POST['situacao'];
$observacao_r = $_POST['observacao'];
$id_r = $_POST['id'];

// Define o comando SQL
$sql = "UPDATE fornecedores SET cnpj = '$cnpj_r', nomefantasia = '$nomefantasia_r', razaosocial = '$razaosocial_r', fixo = '$fixo_r', celular1 = '$celular1_r', celular2 = '$celular2_r', email = '$email_r', endereco = '$endereco_r', datafundacao =  '$datafundacao_r', tipo = '$tipo_r', situacao = '$situacao_r', observacao = '$observacao_r' WHERE idfornecedor = $id_r;";
// Executa o comando SQL 
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);

?>