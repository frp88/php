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
    $sql = "SELECT * FROM servicoseventos WHERE idservicoevento = $id_recebido;";
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
            'id' => $dados['idservicoevento'], 
            'evento' => $dados['evento'], 
            'tiposervico' => $dados['tiposervico'], 
            'fornecedor' => $dados['fornecedor'],             
            'dataprevista' => $dados['dataprevista'], 
            'datarealizada' => $dados['datarealizada'], 
            'valortotal' => $dados['valortotal'], 
            'valorpago' => $dados['valorpago'], 
            'situacao' => $dados['situacao'], 
            'observacao' => $dados['observacao'] );
    }

    // Envia os dados para o aplicativo
    echo json_encode($resposta);

?>