const express = require('express');
var router = express.Router();
const path = require('path');
const controller = require('./controller.js');

router.get('/', (req, res, next) => {
    res.sendFile('index.html', { root: __dirname })
})

router.post('/listar', (req, res, next) => {
    controller.listar(req, res);
});

router.post('/bd/cadastrar', (req, res, next) => {
    controller.executarInsert(req, res);
});

module.exports = router;