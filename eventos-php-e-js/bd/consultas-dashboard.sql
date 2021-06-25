-- 1) Lista de tarefas do dia
-- SELECT * FROM tarefas;
SELECT * FROM tarefas WHERE situacao != 'CA' AND 
((DATE(datahorainicio) = CURDATE() OR DATE(datahorafim) = CURDATE()) OR 
(DATE(datahorainicio) <= CURDATE() AND DATE(datahorafim) >= CURDATE())) ORDER BY datahorainicio;

-- 2) Lista de tarefas atrasadas
SELECT * FROM tarefas WHERE (situacao = 'AF' OR situacao = 'EA') AND (DATE(datahorafim) < CURDATE() );

-- 3) Lista de tarefas (ou calendário) dos próximos 7 dias
SELECT * FROM tarefas WHERE (situacao != 'CA')  AND 
(DATE(datahorainicio) BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)) 
ORDER BY datahorainicio;

-- 4) Lista de eventos (ou calendário) dos próximos 30 dias
-- SELECT * FROM eventos;
SELECT * FROM eventos WHERE (situacao != 'CA')  AND 
(DATE(datahorainicio) BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)) 
ORDER BY datahorainicio;

-- 5) Gráfico de barras com a quantidade de eventos futuros por ano / mês
SELECT DATE_FORMAT(datahorainicio, '%Y/%m') AS `Ano/Mês`, COUNT(*) AS Quantidade FROM eventos 
WHERE idevento != 1 AND datahorainicio >= CURDATE()
GROUP BY `Ano/Mês` ORDER BY `Ano/Mês`;

-- 6) Gráfico de pizza contendo uma porcentagem da quantidade de tarefas pendentes, atrasadas, em andamento e concluídas dos últimos trinta dias.
SELECT situacao, (CASE WHEN situacao = 'AF' THEN 'A fazer' 
	WHEN situacao = 'CA' THEN 'Cancelada' WHEN situacao = 'CO' THEN 'Concluída' 
    ELSE 'Em andamento' END) AS `Situação`, COUNT(*) AS Quantidade FROM tarefas WHERE 
(DATE(datahorainicio) BETWEEN DATE_ADD(CURDATE(), INTERVAL -30 DAY) AND CURDATE() ) 
GROUP BY situacao ORDER BY situacao;

-- SELECT situacao, COUNT(*) AS Total FROM tarefas WHERE 
-- (DATE(datahorainicio) BETWEEN DATE_ADD(CURDATE(), INTERVAL -30 DAY) AND CURDATE() ) 
-- GROUP BY situacao ORDER BY situacao;

-- SELECT * FROM tarefas WHERE (DATE(datahorainicio) BETWEEN DATE_ADD(CURDATE(), INTERVAL -30 DAY) AND CURDATE() ) 
-- ORDER BY situacao, datahorainicio;




