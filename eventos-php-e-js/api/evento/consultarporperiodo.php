<?php 
    // Definição do tipo de informação utilizada
    header('Content-type: application/json');
    // Autoriza o acesso de qualquer domínio
    header('Access-Control-Allow-Origin:*');
    // Inclui a conexão com o BD
    include('../config/conexao.php');

    // Pega os dados enviados via POST
    $datahorainicio_r = $_POST['datahorainicio'];  
    $datahorafim_r = $_POST['datahorafim'];  
    
    // Define o comando SQL (SELECT)
    $sql = "SELECT * FROM eventos WHERE WHERE idevento != 1 AND (datahorainicio >= '".$datahorainicio_r."' AND datahorafim <= '".$datahorafim_r."');";
    // Armazena o resultado da consulta em uma variável
    $resultado = $conexao->query($sql);
    // Verifica se a consulta SQL retornou registro da tabela
    if ($resultado->rowCount() == 0){
        $lista = null;
    }else{
        $lista = $resultado->fetchAll(PDO::FETCH_ASSOC); 
    }
        
    echo(json_encode($lista));
?>