<?php 
    // Definição do tipo de informação utilizada
    header('Content-type: application/json');
    // Autoriza o acesso de qualquer domínio
    header('Access-Control-Allow-Origin:*');
    // Inclui a conexão com o BD
    include('../config/conexao.php');

    // Pega os dados enviados via POST
    $id_recebido = $_POST['id'];  
    
    // Define o comando SQL (SELECT)
    $sql = "SELECT * FROM tarefas WHERE idtarefa=$id_recebido;";
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
            'id' => $dados['idtarefa'], 
            'titulo' => $dados['titulo'], 
            'descricao' => $dados['descricao'], 
            'evento' => $dados['evento'], 
            'datahorainicio' => $dados['datahorainicio'], 
            'datahorafim' => $dados['datahorafim'], 
            'situacao' => $dados['situacao'], 
            'observacao' => $dados['observacao'] );
    }

    // Envia os dados para o aplicativo
    echo json_encode($resposta);

?>