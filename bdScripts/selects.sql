USE projetoIndividual;

-- SELECT * FROM tbUsuario;
-- SELECT * FROM tbPosts;

-- DESC tbUsuario;
-- DESC tbPosts;
-- SHOW tables;
-- DESC asslikes;

-- SELECT *, apelido as apelido from tbPosts join tbUsuario on fkAutor = tbUsuario.idUsuario;

-- SELECT * FROM asslikes;
-- SELECT qtdLikes FROM asslikes JOIN tbPosts on fkPost = tbPosts.idPost;

SELECT u.idUsuario, u.apelido, SUM(a.qtdLikes) AS total_likes
FROM tbUsuario u
JOIN assLikes a ON u.idUsuario = a.fkUsuario
GROUP BY u.idUsuario, u.apelido
ORDER BY total_likes DESC;
