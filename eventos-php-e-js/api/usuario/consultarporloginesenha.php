<?php 
    // Definição do tipo de informação utilizada
    header('Content-type: application/json');
    // Autoriza o acesso de qualquer domínio
    header('Access-Control-Allow-Origin:*');
    // Inclui a conexão com o BD
    include('../config/conexao.php');

    // Pega os dados enviados via POST
    $login_recebido = $_POST['login'];  
    $senha_recebida = $_POST['senha']; 
    
    // Define o comando SQL (SELECT)
    $sql = "SELECT * FROM usuarios WHERE login='$login_recebido' AND senha='$senha_recebida'";
    // Executa o comando SQL
    $resultado = $conexao->query($sql);
    // Verificar se a consulta retornou algum registro
    if ($resultado->rowCount() == 0){
        $resposta = array('resp' => '0');
    }else{
        // Pega os dados do usuário
        // Função que retorna um array associativo contendo todas as colunas do registro da tabela
        $dados = $resultado->fetch(PDO::FETCH_ASSOC); 
        // Monta a matriz que será enviada de volta para o aplicativo
        $resposta = array('resp' => '1', 
            'id' =>  $dados['idusuario'], 
            'nome' =>  $dados['nome'], 
            'login' =>  $dados['login'], 
            'email' =>  $dados['email'] );
    }

    // Envia os dados para o aplicativo
    echo json_encode($resposta);

?>