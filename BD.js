const express = require('express');
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'projetoIndividual',
    password: '25169970',
});

const promissePool = pool.promise();

async function executarSelect(field, table, where) {
    if (where == undefined) {
        return [row] = await promissePool.query(`SELECT * FROM ${table}`)
    } else { return [row] = await promissePool.query(`SELECT * FROM ${table} WHERE ${where}`) }

}

//Essa função lista todos ops registros de uma tabela especifica, se não for Informado o nome da tabela, a função lista todos os registros da tabela tbUsuario 
async function listar(table) {
    if (table == undefined) {
        return [row] = await promissePool.query(`SELECT * FROM tbUsuario`)
    } else {
        // return [row, err] = await promissePool.query(`SELECT * FROM ${table}`)
        return row = await promissePool.query(`SELECT * FROM ${table}`)
            .then(([row]) => { return row }).catch((err) => { return "Essa tabela não existe" });
    }

}

module.exports = { executarSelect, listar }; 