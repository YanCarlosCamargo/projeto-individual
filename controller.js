const bd = require('./BD.js');

async function listar(req, res) {
    let table = req.params.table;
    let result = await bd.listar(table);
    res.send(result);

}

async function executarSelect(req, res) {
    let field = req.params.field;
    let table = req.params.table;
    let where = req.params.where;
    let result = await bd.executarSelect(field, table, where);
    res.json(result[0]);
}

async function executarInsert(req, res) {
    let table = req.params.table;
    let values = req.params.values;
    let result = await bd.executarInsert(table, values);
    res.json(result[0]);
}

module.exports = { listar, executarSelect, executarInsert };