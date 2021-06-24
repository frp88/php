create database bdsite;

use bdsite;

create table tblpessoa(
	idpessoa int primary key auto_increment,
    nome varchar(50),
    telefone varchar(20),
	email varchar(50)    
);
desc tblpessoa;
select * from tblpessoa;
insert into tblpessoa(nome, telefone, email)
 values('Maria', '9988-7766', 'maria@email.com');