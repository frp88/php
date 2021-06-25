<?php 
    // Definição do tipo de informação utilizada
    header('Content-type: application/json');
    // Autoriza o acesso de qualquer domínio
    header('Access-Control-Allow-Origin:*');
    // Inclui a conexão com o BD
    include('../config/conexao.php');
    
    // Define o comando SQL (SELECT)
    $sql = "SELECT situacao, COUNT(*) AS quantidade FROM tarefas WHERE (DATE(datahorainicio) BETWEEN DATE_ADD(CURDATE(), INTERVAL -30 DAY) AND CURDATE() ) GROUP BY situacao ORDER BY situacao;";
    //$sql = "SELECT situacao, (CASE WHEN situacao = 'AF' THEN 'A fazer' WHEN situacao = 'CA' THEN 'Cancelada' WHEN situacao = 'CO' THEN 'Concluída' ELSE 'Em andamento' END) AS `Situação`, COUNT(*) AS Quantidade FROM tarefas WHERE (DATE(datahorainicio) BETWEEN DATE_ADD(CURDATE(), INTERVAL -30 DAY) AND CURDATE()) GROUP BY situacao ORDER BY situacao;";
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