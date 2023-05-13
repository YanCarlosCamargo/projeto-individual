const bd = require('./bd');

bd.executarQuery(`INSERT INTO tbUsuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`)