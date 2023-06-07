const bd = require('./BD.js');

async function listar(req, res) {
    let table = req.body.table;
    console.log("A requisição no controller listar é a seguinte ", req.body, table);
    let result = await bd.listar(table);
    res.send(result);

}

async function executarSelect(req, res) {
    let field = req.body.field;
    let table = req.body.table;
    let where = req.body.where;
    let result = await bd.executarSelect(field, table, where);
    res.json(result[0]);
}

async function executarInsert(req, res) {
    // console.log(req.body, "OI testando")
    let table = req.body.table;
    let values = req.body.values;
    bd.executarInsert(table, values).then((result) => {
        res.json(result[0]);
    }).catch((err) => {
        console.log("Deu errado no controller");
        res.json({ message: "Deu errado no controller" })
    });

    //return result
}

async function inserirUsuario(req, res) {
    console.log("A requisição do CADASTRAR é a seguinte ", req.body);
    let email = req.body.email;
    let senha = req.body.senha;
    let nome = req.body.nome;
    let telefone = req.body.telefone;
    let bio = req.body.bio;
    let apelido = req.body.apelido;
    let foto = req.body.foto;
    let dtNasc = req.body.data;


    let result = await bd.inserirUsuario(email, senha, nome, telefone, bio, apelido, foto, dtNasc);
    res.json(result[0]);
}

async function login(req, res) {
    let email = req.body.email;
    let senha = req.body.senha;
    console.log("A requisição no controller login é a seguinte " + " email: " + email + " senha: " + senha)
    let result = await bd.login(email, senha);
    res.json(result[0]);
}

async function atualizarPerfil(req, res) {
    let idUsuario = req.params.idUsuario;
    let nome = req.body.nome;
    let email = req.body.email;
    let telefone = req.body.telefone;
    let apelido = req.body.apelido;

    let result = await bd.atualizarPerfil(idUsuario, nome, email, telefone, apelido);
    console.log("Perfil atualizado com sucesso! ", result);
    res.json(result);

}

async function buscarUsuario(req, res) {
    let idUsuario = req.params.idUsuario;
    let result = await bd.buscarUsuario(idUsuario);
    res.status(200).json(result[0]);
}

async function listarPosts(req, res) {
    let result = await bd.listarPosts();
    res.json(result);
}

async function inserirPost(req, res) {
    let idUsuario = req.body.idUsuario;
    let titulo = req.body.titulo;
    let desc = req.body.descricao;
    let imgLink = req.body.img;
    let result = await bd.inserirPost(idUsuario, titulo, desc, imgLink);
    console.log("Post inserido com sucesso! ", result);
    res.json(result);
}

async function removerPost(req, res) {
    let idPost = req.body.idPost;
    let result = await bd.removerPost(idPost);
    console.log("Post removido com sucesso! ", result);
    res.status(200).json(result);
}

async function inserirLike(req, res) {
    let idUsuario = req.body.idUsuario;
    let idPost = req.body.idPost;
    let result = await bd.inserirLike(idUsuario, idPost);
    console.log("Like inserido com sucesso! ", result);
    res.json(result);
}

async function removerLike(req, res) {
    let idUsuario = req.body.idUsuario;
    let idPost = req.body.idPost;
    let result = await bd.removerLike(idUsuario, idPost);
    console.log("Like removido com sucesso! ", result);
    res.json(result);
}

async function buscarLikes(req, res) {
    console.log("A requisição no controller buscarLikes é a seguinte ", req.params);
    let idUsuario = req.params.idUsuario;
    let result = await bd.buscarLikes(idUsuario);
    res.status(200).json(result);
}

async function buscarRankLikes(req, res) {
    let result = await bd.buscarRankLikes();
    res.status(200).json(result);
}

module.exports = {
    listar,
    executarSelect,
    executarInsert,
    inserirUsuario,
    login,
    listarPosts,
    inserirPost,
    removerPost,
    inserirLike,
    removerLike,
    buscarLikes,
    buscarRankLikes,
    buscarUsuario,
    atualizarPerfil
};