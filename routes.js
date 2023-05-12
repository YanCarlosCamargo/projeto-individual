const express = require('express');
var router = express.Router();
const path = require('path');
const controller = require('./controller.js');

router.get('/', (req, res, next) => {
    res.sendFile('index.html', { root: __dirname })
})

router.post('/listar', function (req, res, next) {
    // console.log("A requisição no routes listar é a seguinte ", req.body)
    controller.listar(req, res);
});

router.post('/cadastrar', (req, res, next) => {
    console.log("A requisição do CADASTRAR é a seguinte ", req.body)
    controller.executarInsert(req, res);
    // res.status(200).send({ messageBody: req.body, messageParams: req.params, messageQuery: req.query });
});


module.exports = router;