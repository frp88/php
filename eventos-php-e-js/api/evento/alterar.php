<?php
// Definição do tipo de informação utilizada
header('Content-type: application/json');
// Autoriza o acesso de qualquer domínio
header('Access-Control-Allow-Origin:*');
// Inclui a conexão com o BD
include('../config/conexao.php');

// Pega os dados enviados via POST
// Pega os dados enviados via POST
$titulo_r = $_POST['titulo'];
$descricao_r = $_POST['descricao'];
$tipoevento_r = $_POST['tipoevento'];
$cliente_r = $_POST['cliente'];
$datahorainicio_r = $_POST['datahorainicio'];
$datahorafim_r = $_POST['datahorafim'];
$localcerimonia_r = $_POST['localcerimonia'];
$localrecepcao_r = $_POST['localrecepcao'];
$qtdconvidados_r = $_POST['qtdconvidados'];
$horariosdisponiveis_r = $_POST['horariosdisponiveis'];
$alergias_r = $_POST['alergias'];
$observacao_r = $_POST['observacao'];
$situacao_r = $_POST['situacao'];
$formapgto_r = $_POST['formapgto'];
$valor_r = $_POST['valor'];
$qtdparcelas_r = $_POST['qtdparcelas'];
$diaparcela_r = $_POST['diaparcela'];
$id_r = $_POST['id'];

// Define o comando SQL
$sql = "UPDATE eventos SET titulo = '$titulo_r',  descricao = '$descricao_r', tipoevento = $tipoevento_r, cliente = $cliente_r, datahorainicio = '$datahorainicio_r', datahorafim = '$datahorafim_r', localcerimonia = '$localcerimonia_r', localrecepcao = '$localrecepcao_r', qtdconvidados = $qtdconvidados_r, alergias = '$alergias_r', situacao = '$situacao_r', observacao = '$observacao_r', valor = $valor_r, formapgto = '$formapgto_r', qtdparcelas = $qtdparcelas_r, diaparcela = $diaparcela_r, horariosdisponiveis = '$horariosdisponiveis_r' WHERE idevento = $id_r;";
// Executa o comando SQL 
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);

?>