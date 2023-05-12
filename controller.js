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

module.exports = { listar, executarSelect, executarInsert };