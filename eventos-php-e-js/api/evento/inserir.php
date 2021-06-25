<?php
// Definição do tipo de informação utilizada
header('Content-type: application/json');
// Autoriza o acesso de qualquer domínio
header('Access-Control-Allow-Origin:*');
// Inclui a conexão com o BD
include('../config/conexao.php');

//(empty($_POST['descricao']) == true ? null : $_POST['descricao']);

// Pega os dados enviados via POST
$titulo_r =  $_POST['titulo'];
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

// Define o comando SQL (INSERT)
$sql = "INSERT INTO eventos(titulo, descricao, tipoevento, cliente, datahoracadastro, datahorainicio, datahorafim, localcerimonia, localrecepcao, qtdconvidados, alergias, situacao, observacao, valor, formapgto, qtdparcelas, diaparcela, horariosdisponiveis) VALUES('$titulo_r', '$descricao_r', $tipoevento_r, $cliente_r, NOW(), '$datahorainicio_r', '$datahorafim_r', '$localcerimonia_r', '$localrecepcao_r', $qtdconvidados_r, '$alergias_r', '$situacao_r', '$observacao_r', $valor_r, '$formapgto_r', $qtdparcelas_r, $diaparcela_r, '$horariosdisponiveis_r');";

// Executa o comando SQL (INSERT)
$resultado = $conexao->query($sql);

// Define a resposta que será retornada para o aplicativo
$resposta = array('OK' => 'OK');
// Retorna a resposta para o aplicativo 
echo json_encode($resposta);
//echo 'Cliente: '.$cliente_r.' - Situacao: '. $situacao_r. ' - Inicio: '. $datahorainicio_r. ' -  Qtde Parcelas: '. $qtdparcelas_r;

?>