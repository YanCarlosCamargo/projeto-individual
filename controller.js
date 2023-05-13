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

async function listarPosts(req, res) {
    let result = await bd.listarPosts();
    res.json(result);
}


module.exports = { listar, executarSelect, executarInsert, inserirUsuario, login, listarPosts };