<?php 
// Definição do tipo de informação utilizada
header('Content-type: application/json');
// Autoriza o acesso de qualquer domínio
header('Access-Control-Allow-Origin:*');
// Inclui a conexão com o BD
include('../config/conexao.php');

// Pega os dados enviados via POST
$recebe_email = $_POST['email'];

// Define o comando SQL (SELECT)
$sql = "SELECT email FROM usuarios WHERE email='".$recebe_email."'";
// Executa o comando SQL
$resultado = $conexao->query($sql);
// Verifica se a consulta não retornou nenhum registro
if ($resultado->rowCount() == 0) {    
    // E-mail estiver disponível...
    $resposta = array('resp'=> '0');
}
else {  
    // E-mail já cadastrado...
    $resposta = array('resp' => '1');
}

//ob_clean();
echo json_encode($resposta);

?>