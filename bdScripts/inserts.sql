USE projetoIndividual;

-- Inserir um usuário na tabela tbUsuario
INSERT INTO tbUsuario (apelido, nome, dtNasc, email, telefone, dtCadastro, bio)
VALUES ('user1', 'João Silva', '1990-01-01', 'joao@email.com', '1234567890', '2021-01-01', 'Descrição do usuário');

-- Inserir um post na tabela tbPosts relacionado ao usuário acima
INSERT INTO tbPosts (titulo, descPost, dtPost, fkAutor)
VALUES ('Meu primeiro post', 'Conteúdo do post', '2021-02-15', 1);

-- Inserir um like na tabela assLikes para o post acima, feito pelo usuário acima
INSERT INTO assLikes (fkPost, fkUsuario, qtdLikes)
VALUES (1, 1, 1);

-- Inserir mais um usuário na tabela tbUsuario
INSERT INTO tbUsuario (apelido, nome, dtNasc, email, telefone, dtCadastro, bio)
VALUES ('user2', 'Maria Souza', '1995-05-10', 'maria@email.com', '9876543210', '2021-02-10', 'Descrição da Maria');

-- Inserir mais um post na tabela tbPosts relacionado ao usuário acima
INSERT INTO tbPosts (titulo, descPost, dtPost, fkAutor)
VALUES ('Novo post', 'Conteúdo do novo post', '2021-03-20', 2);

-- Inserir um like na tabela assLikes para o segundo post, feito pelo primeiro usuário
INSERT INTO assLikes (fkPost, fkUsuario, qtdLikes)
VALUES (2, 1, 1);

-- Inserir mais um like na tabela assLikes para o segundo post, feito pelo segundo usuário
INSERT INTO assLikes (fkPost, fkUsuario, qtdLikes)
VALUES (2, 2, 1);
