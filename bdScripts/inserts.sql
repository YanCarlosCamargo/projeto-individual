USE projetoIndividual;

-- Inserir um usuário na tabela tbUsuario
INSERT INTO tbUsuario (apelido, nome, dtNasc, email, telefone, dtCadastro, bio,imgPerfil)
VALUES ('user1', 'João Silva', '1990-01-01', 'joao@email.com', '1234567890', '2021-01-01', 'Descrição do usuário', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80');

-- Inserir um post na tabela tbPosts relacionado ao usuário acima
INSERT INTO tbPosts (titulo, descPost, dtPost, fkAutor)
VALUES ('Meu primeiro post', 'Conteúdo do post', '2021-02-15', 1);

-- Inserir um like na tabela assLikes para o post acima, feito pelo usuário acima
INSERT INTO assLikes (fkPost, fkUsuario, qtdLikes)
VALUES (1, 1, 1);

-- Inserir mais um usuário na tabela tbUsuario
INSERT INTO tbUsuario (apelido, nome, dtNasc, email, telefone, dtCadastro, bio, imgPerfil)
VALUES ('user2', 'Maria Souza', '1995-05-10', 'maria@email.com', '9876543210', '2021-02-10', 'Descrição da Maria',' https://www.masslive.com/resizer/kNl3qvErgJ3B0Cu-WSBWFYc1B8Q=/arc-anglerfish-arc2-prod-advancelocal/public/W5HI6Y4DINDTNP76R6CLA5IWRU.jpeg');

-- Inserir mais um post na tabela tbPosts relacionado ao usuário acima
INSERT INTO tbPosts (titulo, descPost, dtPost, fkAutor)
VALUES ('Novo post', 'Conteúdo do novo post', '2021-03-20', 2);

-- Inserir um like na tabela assLikes para o segundo post, feito pelo primeiro usuário
INSERT INTO assLikes (fkPost, fkUsuario, qtdLikes)
VALUES (2, 1, 1);

-- Inserir mais um like na tabela assLikes para o segundo post, feito pelo segundo usuário
INSERT INTO assLikes (fkPost, fkUsuario, qtdLikes)
VALUES (2, 2, 1);
