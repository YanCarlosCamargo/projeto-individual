DROP DATABASE IF EXISTS projetoIndividual;
CREATE DATABASE IF NOT EXISTS projetoIndividual;

USE projetoIndividual;

DROP TABLE IF EXISTS tbUsuario;
DROP TABLE IF EXISTS tbPosts;
DROP TABLE IF EXISTS assLikes;


CREATE TABLE tbUsuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
apelido VARCHAR(45),
nome VARCHAR(50),
dtNasc DATE,
email VARCHAR(45),
senha int,
telefone VARCHAR(12),
dtCadastro DATE,
bio VARCHAR(200),
imgPerfil VARCHAR(300));

CREATE TABLE tbPosts (
idPost INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
titulo VARCHAR(30),
descPost VARCHAR(1000),
dtPost DATE,
fkAutor INT NOT NULL,
imgPost VARCHAR(300));

CREATE TABLE assLikes (
idLikes INT AUTO_INCREMENT,
fkPost INT NOT NULL,
fkUsuario INT NOT NULL,
qtdLikes INT NOT NULL,
CONSTRAINT assLikes_idLikes_tbPosts_idPost_tbUsuario_idUsuario PRIMARY KEY (idLikes, fkPost, fkUsuario)) AUTO_INCREMENT = 10;

ALTER TABLE tbPosts ADD CONSTRAINT tbPosts_fkAutor_tbUsuario_idUsuario FOREIGN KEY (fkAutor) REFERENCES tbUsuario(idUsuario);
ALTER TABLE assLikes ADD CONSTRAINT assLikes_fkPost_tbPosts_idPost FOREIGN KEY (fkPost) REFERENCES tbPosts(idPost);
ALTER TABLE assLikes ADD CONSTRAINT assLikes_fkUsuario_tbUsuario_idUsuario FOREIGN KEY (fkUsuario) REFERENCES tbUsuario(idUsuario);