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

async function executarSelect(field, table, where) {

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

module.exports = { executarSelect, listar, executarInsert }; 