USE projetoIndividual;

-- SELECT * FROM tbUsuario;
  SELECT * FROM tbPosts;

-- DESC tbUsuario;
-- DESC tbPosts;
-- SHOW tables;
-- DESC asslikes;

-- SELECT *, apelido as apelido from tbPosts join tbUsuario on fkAutor = tbUsuario.idUsuario;

SELECT * FROM asslikes;
SELECT qtdLikes FROM asslikes JOIN tbPosts on fkPost = tbPosts.idPost;