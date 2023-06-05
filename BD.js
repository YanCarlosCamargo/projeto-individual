const express = require('express');
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'projetoIndividual',
    password: '25169970',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
});

const promissePool = pool.promise();


// Create the connection pool. The pool-specific settings are the defaults

async function executarSelect(table, where) {

    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'projetoIndividual',
        password: '25169970',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0
    });

    const promissePool = pool.promise();


    if (where == undefined) {
        return [row] = await promissePool.query(`SELECT * FROM ${table}`)
    } else { return [row] = await promissePool.query(`SELECT * FROM ${table} WHERE ${where}`) }
}

//Essa função lista todos ops registros de uma tabela especifica, se não for Informado o nome da tabela, a função lista todos os registros da tabela tbUsuario 
async function listar(table) {

    //  console.log("Chegou a requisição no listar: ", table);


    if (table == undefined) {
        return [row] = await promissePool.query(`SELECT * FROM tbUsuario`)
    } else {
        return [row, err] = await promissePool.query(`SELECT * FROM ${table}`)
        //await promissePool.query(`SELECT * FROM ${table}`)
        //   .then(([row]) => { return row }).catch((err) => { return "Essa tabela não existe" });
    }

}

async function executarInsert(table, values) {
    //console.log("Chegou a requisição no insert");
    if (table == undefined) {
        console.log("Informe o nome da tabela"); //     return ['message']
    } else {
        return [row] = await promissePool.query(`INSERT INTO ${table} (nome, email, senha) VALUES (${values})`)
    }
}

async function executarQuery(query) {
    if (query != undefined) {
        return [row] = await promissePool.query(query)
    } else {
        console.log("Informe a query");
        return ['Informe a query']
    }
}

async function inserirUsuario(email, senha, nome, telefone, bio, apelido, foto, dtNasc) {
    return [row] = await promissePool.query(`INSERT INTO tbUsuario (apelido, nome, dtNasc, email, senha, telefone, dtCadastro, bio, imgPerfil) VALUES ('${apelido}', '${nome}', '${dtNasc}', '${email}', '${senha}', '${telefone}', NOW(), '${bio}', '${foto}')`)
}

async function login(email, senha) {
    return [row] = await promissePool.query(`SELECT * FROM tbUsuario WHERE email = '${email}' AND senha = '${senha}'`)
}

async function buscarUsuario(idUsuario) {
    return [row] = await promissePool.query(`SELECT * FROM tbUsuario WHERE idUsuario = '${idUsuario}'`)
}

async function listarPosts() {
    var resultado = {
        likes: [],
        posts: []
    }
    resultado.likes = await promissePool.query(`SELECT * from asslikes`);
    resultado.posts = await promissePool.query(`SELECT *, nome as Autor from tbPosts join tbUsuario on fkAutor = tbUsuario.idUsuario;`);
    return resultado
}

async function inserirPost(idUsuario, titulo, desc, imgLink) {
    return [row] = await promissePool.query(`INSERT INTO tbPosts (fkAutor, titulo, descPost, dtPost, imgPost) VALUES ('${idUsuario}', '${titulo}', '${desc}', now(), '${imgLink}')`)
}

async function removerPost(idPost) {
    promissePool.query(`DELETE FROM asslikes WHERE fkPost = '${idPost}'`).then(() => { promissePool.query(`DELETE FROM tbPosts WHERE idPost = '${idPost}'`).then(() => { return true }) })

}

async function inserirLike(idUsuario, idPost) {
    return [row] = await promissePool.query(`INSERT INTO asslikes (fkUsuario, fkPost, qtdLikes) VALUES ('${idUsuario}', '${idPost}', 1)`)
}

async function removerLike(idUsuario, idPost) {
    return [row] = await promissePool.query(`DELETE FROM asslikes WHERE fkUsuario = '${idUsuario}' AND fkPost = '${idPost}'`)
}

async function buscarLikes(idUsuario) {
    return [row] = await promissePool.query(`SELECT usuario.apelido, fkAutor, count(fkAutor) as total_likes FROM assLikes a JOIN tbPosts p ON a.fkPost = p.idPost JOIN tbUsuario u ON a.fkUsuario = u.idUsuario JOIN (SELECT idUsuario, apelido from tbusuario) usuario on usuario.idUsuario = fkAutor where fkAutor = ${idUsuario}`)
}

async function buscarRankLikes() {
    return [row] = await promissePool.query(`SELECT usuario.apelido, fkAutor, count(fkAutor) as total_likes FROM assLikes a JOIN tbPosts p ON a.fkPost = p.idPost JOIN tbUsuario u ON a.fkUsuario = u.idUsuario JOIN (SELECT idUsuario, apelido from tbusuario) usuario on usuario.idUsuario = fkAutor group by fkAutor ORDER BY count(fkAutor) desc limit 5`)
}

module.exports = {
    executarSelect,
    listar,
    executarInsert,
    executarQuery,
    inserirUsuario,
    login,
    listarPosts,
    inserirPost,
    inserirLike,
    removerLike,
    removerPost,
    buscarLikes,
    buscarRankLikes,
    buscarUsuario
}; 