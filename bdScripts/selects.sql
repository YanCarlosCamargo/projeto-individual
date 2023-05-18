USE projetoIndividual;

-- SELECT * FROM tbUsuario;

-- DESC tbUsuario;
 DESC tbPosts;
-- SHOW tables;
-- DESC asslikes;

SELECT * from tbPosts;

SELECT * FROM asslikes;
SELECT qtdLikes FROM asslikes JOIN tbPosts on fkPost = tbPosts.idPost;