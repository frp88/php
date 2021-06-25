<?php 
    // Definição do tipo de informação utilizada
    header('Content-type: application/json');
    // Autoriza o acesso de qualquer domínio
    header('Access-Control-Allow-Origin:*');
    // Inclui a conexão com o BD
    include('../config/conexao.php');
    
    // Define o comando SQL (SELECT)
    $sql = "SELECT DATE_FORMAT(datahorainicio, '%Y/%m') AS `am`, COUNT(*) AS quantidade FROM eventos WHERE idevento != 1 AND datahorainicio >= CURDATE()
    GROUP BY `am` ORDER BY `am`;";
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